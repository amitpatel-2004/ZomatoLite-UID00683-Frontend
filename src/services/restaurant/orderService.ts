import type { DocumentData, QueryDocumentSnapshot, Unsubscribe } from 'firebase/firestore';
import {
  collection,
  collectionGroup,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';

import type { ApiEntityResponse } from '@appTypes/common.types';
import { API_ENDPOINTS } from '@constants/api.constants';
import { FIREBASE_COLLECTIONS } from '@constants/firebase.constants';
import { apiClient } from '@core/api/apiClient';
import { firebaseDb } from '@core/firebase/firebase.config';
import { ORDER_STATUS } from '@pages/restaurants/constants/order.constants';
import type { Order, OrderStatus } from '@pages/restaurants/types/order.types';

import type { CreateOrderPayload, CreateOrderResponse } from './orderService.types';

/** Turns a Firestore order document into Order shape. */
const toOrder = (docSnap: QueryDocumentSnapshot<DocumentData>, restaurantName: string): Order => {
  const data = docSnap.data();
  const restaurantId = docSnap.ref.parent.parent?.id ?? '';

  return {
    _id: docSnap.id,
    restaurantId,
    restaurantName,
    customerId: data.customerId as string,
    status: data.status as OrderStatus,
    currency: data.currency,
    pricingSummary: data.pricingSummary,
    items: data.items.map((item: { name: string; quantity: number; unitPrice: number }) => {
      return { name: item.name, quantity: item.quantity, unitPrice: item.unitPrice };
    }),
    _createdAt: data._createdAt?.toMillis() ?? 0,
    _updatedAt: data._updatedAt?.toMillis() ?? 0,
  };
};

/** Looks up restaurant names for a set of ids to avoid repeated reads. */
const getRestaurantNames = async (restaurantIds: string[]): Promise<Record<string, string>> => {
  const uniqueIds = [...new Set(restaurantIds)];
  const entries = await Promise.all(
    uniqueIds.map(async (id) => {
      const snap = await getDoc(doc(firebaseDb, FIREBASE_COLLECTIONS.RESTAURANTS, id));
      const name = (snap.data()?.name as string) ?? '';
      return [id, name] as const;
    }),
  );
  return Object.fromEntries(entries);
};

export const orderService = {
  create: async (restaurantId: string, payload: CreateOrderPayload): Promise<Order> => {
    const { data } = await apiClient.post<ApiEntityResponse<CreateOrderResponse>>(
      API_ENDPOINTS.RESTAURANTS.orders(restaurantId),
      payload,
    );
    const result = data.data;

    return {
      _id: result.id,
      restaurantId,
      restaurantName: result.restaurant.name,
      customerId: result.customerId,
      status: result.status as OrderStatus,
      currency: result.currency,
      pricingSummary: result.pricingSummary,
      items: result.items,
      _createdAt: Date.now(),
      _updatedAt: Date.now(),
    };
  },

  subscribeToRestaurantOrders: (
    restaurantId: string,
    restaurantName: string,
    onChange: (orders: Order[]) => void,
    onError: (error: Error) => void,
  ): Unsubscribe => {
    const ordersRef = collection(
      firebaseDb,
      FIREBASE_COLLECTIONS.RESTAURANTS,
      restaurantId,
      FIREBASE_COLLECTIONS.ORDERS,
    );
    const ordersQuery = query(ordersRef, orderBy('_createdAt', 'desc'));

    return onSnapshot(
      ordersQuery,
      (snap) => {
        onChange(
          snap.docs.map((docSnap) => {
            return toOrder(docSnap, restaurantName);
          }),
        );
      },
      onError,
    );
  },

  subscribeToCustomerOrders: (
    customerId: string,
    onChange: (orders: Order[]) => void,
    onError: (error: Error) => void,
  ): Unsubscribe => {
    const ordersQuery = query(
      collectionGroup(firebaseDb, FIREBASE_COLLECTIONS.ORDERS),
      where('customerId', '==', customerId),
      orderBy('_createdAt', 'desc'),
    );

    return onSnapshot(
      ordersQuery,
      async (snap) => {
        try {
          const restaurantIds = snap.docs.map((docSnap) => {
            return docSnap.ref.parent.parent?.id ?? '';
          });
          const namesById = await getRestaurantNames(restaurantIds);

          onChange(
            snap.docs.map((docSnap) => {
              const restaurantId = docSnap.ref.parent.parent?.id ?? '';
              return toOrder(docSnap, namesById[restaurantId] ?? '');
            }),
          );
        } catch (error) {
          onError(error instanceof Error ? error : new Error(String(error)));
        }
      },
      onError,
    );
  },

  updateStatus: async (
    restaurantId: string,
    orderId: string,
    status: OrderStatus,
  ): Promise<void> => {
    const orderRef = doc(
      firebaseDb,
      FIREBASE_COLLECTIONS.RESTAURANTS,
      restaurantId,
      FIREBASE_COLLECTIONS.ORDERS,
      orderId,
    );
    await updateDoc(orderRef, { status });
  },

  cancel: async (restaurantId: string, orderId: string): Promise<void> => {
    await orderService.updateStatus(restaurantId, orderId, ORDER_STATUS.CANCELLED);
  },
};
