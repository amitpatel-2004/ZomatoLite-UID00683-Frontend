import { useEffect } from 'react';

import { useSelector } from 'react-redux';

import { MESSAGES } from '@pages/restaurants/constants/messages.constants';
import type { Order } from '@pages/restaurants/types/order.types';
import { getAuthUser } from '@redux/authStore';
import {
  getCustomerError,
  getIsMyOrdersLoading,
  getMyOrders,
  myOrdersCleared,
  myOrdersFailed,
  myOrdersReceived,
  myOrdersSubscribed,
} from '@redux/customerStore';
import { useAppDispatch } from '@redux/hooks';
import { orderService } from '@services/restaurant/orderService';

export const useMyOrders = () => {
  const dispatch = useAppDispatch();
  const user = useSelector(getAuthUser);
  const orders = useSelector(getMyOrders);
  const isLoading = useSelector(getIsMyOrdersLoading);
  const error = useSelector(getCustomerError);

  useEffect(() => {
    if (!user) return;

    dispatch(myOrdersSubscribed());
    const unsubscribe = orderService.subscribeToCustomerOrders(
      user._id,
      (customerOrders: Order[]) => {
        dispatch(myOrdersReceived(customerOrders));
      },
      (err: Error) => {
        dispatch(myOrdersFailed(err.message || MESSAGES.ERRORS.ORDERS_LOAD_FAILED));
      },
    );

    return () => {
      unsubscribe();
      dispatch(myOrdersCleared());
    };
  }, [dispatch, user]);

  const cancelOrder = async (order: Order): Promise<void> => {
    await orderService.cancel(order.restaurantId, order._id);
  };

  return { cancelOrder, error, isLoading, orders };
};
