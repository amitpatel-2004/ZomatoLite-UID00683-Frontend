import type { RootState } from '@redux/index';

export const getCartRestaurantId = (state: RootState) => {
  return state.customer.cartRestaurantId;
};
export const getCartRestaurantName = (state: RootState) => {
  return state.customer.cartRestaurantName;
};
export const getCartItems = (state: RootState) => {
  return state.customer.cartItems;
};
export const getMyOrders = (state: RootState) => {
  return state.customer.myOrders;
};
export const getIsMyOrdersLoading = (state: RootState) => {
  return state.customer.isMyOrdersLoading;
};
export const getCustomerError = (state: RootState) => {
  return state.customer.error;
};
