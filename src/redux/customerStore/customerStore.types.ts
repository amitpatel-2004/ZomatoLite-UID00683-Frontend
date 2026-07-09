import type { Order } from '@pages/restaurants/types/order.types';

import { CUSTOMER_ACTIONS } from './customerStore.constants';

export type CartItem = {
  menuItemId: string;
  name: string;
  unitPrice: number;
  quantity: number;
};

export type CustomerState = {
  cartRestaurantId: string | null;
  cartRestaurantName: string | null;
  cartItems: CartItem[];
  myOrders: Order[];
  isMyOrdersLoading: boolean;
  error: string | null;
};

export type CartItemAddedPayload = {
  restaurantId: string;
  restaurantName: string;
  menuItemId: string;
  name: string;
  unitPrice: number;
};

export type CartItemAddedAction = {
  type: typeof CUSTOMER_ACTIONS.CART_ITEM_ADDED;
  payload: CartItemAddedPayload;
};
export type CartItemIncrementedAction = {
  type: typeof CUSTOMER_ACTIONS.CART_ITEM_INCREMENTED;
  payload: string;
};
export type CartItemDecrementedAction = {
  type: typeof CUSTOMER_ACTIONS.CART_ITEM_DECREMENTED;
  payload: string;
};
export type CartClearedAction = { type: typeof CUSTOMER_ACTIONS.CART_CLEARED };

export type MyOrdersSubscribedAction = { type: typeof CUSTOMER_ACTIONS.MY_ORDERS_SUBSCRIBED };
export type MyOrdersReceivedAction = {
  type: typeof CUSTOMER_ACTIONS.MY_ORDERS_RECEIVED;
  payload: Order[];
};
export type MyOrdersFailedAction = {
  type: typeof CUSTOMER_ACTIONS.MY_ORDERS_FAILED;
  payload: string;
};
export type MyOrdersClearedAction = { type: typeof CUSTOMER_ACTIONS.MY_ORDERS_CLEARED };

export type CustomerAction =
  | CartItemAddedAction
  | CartItemIncrementedAction
  | CartItemDecrementedAction
  | CartClearedAction
  | MyOrdersSubscribedAction
  | MyOrdersReceivedAction
  | MyOrdersFailedAction
  | MyOrdersClearedAction;
