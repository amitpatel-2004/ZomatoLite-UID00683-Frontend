import type { CustomerState } from './customerStore.types';

export const initialState: CustomerState = {
  cartRestaurantId: null,
  cartRestaurantName: null,
  cartItems: [],
  myOrders: [],
  isMyOrdersLoading: false,
  error: null,
};

export const CUSTOMER_ACTIONS = {
  CART_ITEM_ADDED: 'customer/cartItemAdded',
  CART_ITEM_INCREMENTED: 'customer/cartItemIncremented',
  CART_ITEM_DECREMENTED: 'customer/cartItemDecremented',
  CART_CLEARED: 'customer/cartCleared',
  MY_ORDERS_SUBSCRIBED: 'customer/myOrdersSubscribed',
  MY_ORDERS_RECEIVED: 'customer/myOrdersReceived',
  MY_ORDERS_FAILED: 'customer/myOrdersFailed',
  MY_ORDERS_CLEARED: 'customer/myOrdersCleared',
} as const;
