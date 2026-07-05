import type { Order } from '@pages/restaurants/types/order.types';

import { CUSTOMER_ACTIONS } from './customerStore.constants';
import type {
  CartClearedAction,
  CartItemAddedAction,
  CartItemAddedPayload,
  CartItemDecrementedAction,
  CartItemIncrementedAction,
  MyOrdersClearedAction,
  MyOrdersFailedAction,
  MyOrdersReceivedAction,
  MyOrdersSubscribedAction,
} from './customerStore.types';

export const cartItemAdded = (payload: CartItemAddedPayload): CartItemAddedAction => {
  return { payload, type: CUSTOMER_ACTIONS.CART_ITEM_ADDED };
};

export const cartItemIncremented = (payload: string): CartItemIncrementedAction => {
  return { payload, type: CUSTOMER_ACTIONS.CART_ITEM_INCREMENTED };
};

export const cartItemDecremented = (payload: string): CartItemDecrementedAction => {
  return { payload, type: CUSTOMER_ACTIONS.CART_ITEM_DECREMENTED };
};

export const cartCleared = (): CartClearedAction => {
  return { type: CUSTOMER_ACTIONS.CART_CLEARED };
};

export const myOrdersSubscribed = (): MyOrdersSubscribedAction => {
  return { type: CUSTOMER_ACTIONS.MY_ORDERS_SUBSCRIBED };
};

export const myOrdersReceived = (payload: Order[]): MyOrdersReceivedAction => {
  return { payload, type: CUSTOMER_ACTIONS.MY_ORDERS_RECEIVED };
};

export const myOrdersFailed = (payload: string): MyOrdersFailedAction => {
  return { payload, type: CUSTOMER_ACTIONS.MY_ORDERS_FAILED };
};

export const myOrdersCleared = (): MyOrdersClearedAction => {
  return { type: CUSTOMER_ACTIONS.MY_ORDERS_CLEARED };
};
