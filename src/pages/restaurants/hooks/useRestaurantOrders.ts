import { useEffect } from 'react';

import { useSelector } from 'react-redux';

import { MESSAGES } from '@pages/restaurants/constants/messages.constants';
import type { Order, OrderStatus } from '@pages/restaurants/types/order.types';
import { useAppDispatch } from '@redux/hooks';
import {
  getIsRestaurantOrdersLoading,
  getRestaurantOrders,
  getRestaurantOrdersError,
  restaurantOrdersCleared,
  restaurantOrdersFailed,
  restaurantOrdersReceived,
  restaurantOrdersSubscribed,
} from '@redux/restaurantStore';
import { orderService } from '@services/restaurant/orderService';

export const useRestaurantOrders = (restaurantId: string, restaurantName: string) => {
  const dispatch = useAppDispatch();
  const orders = useSelector(getRestaurantOrders);
  const isLoading = useSelector(getIsRestaurantOrdersLoading);
  const error = useSelector(getRestaurantOrdersError);

  useEffect(() => {
    dispatch(restaurantOrdersSubscribed());
    const unsubscribe = orderService.subscribeToRestaurantOrders(
      restaurantId,
      restaurantName,
      (receivedOrders: Order[]) => {
        dispatch(restaurantOrdersReceived(receivedOrders));
      },
      (err: Error) => {
        dispatch(restaurantOrdersFailed(err.message || MESSAGES.ERRORS.ORDERS_LOAD_FAILED));
      },
    );

    return () => {
      unsubscribe();
      dispatch(restaurantOrdersCleared());
    };
  }, [dispatch, restaurantId, restaurantName]);

  const updateStatus = async (orderId: string, status: OrderStatus): Promise<void> => {
    await orderService.updateStatus(restaurantId, orderId, status);
  };

  return { error, isLoading, orders, updateStatus };
};
