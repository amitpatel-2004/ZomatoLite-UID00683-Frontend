import type { RootState } from '@redux/index';

export const getRestaurants = (state: RootState) => {
  return state.restaurants.items;
};
export const getCurrentRestaurant = (state: RootState) => {
  return state.restaurants.current;
};
export const getRestaurantsHasMore = (state: RootState) => {
  return state.restaurants.hasMore;
};
export const getRestaurantsNextCursor = (state: RootState) => {
  return state.restaurants.nextCursor;
};
export const getIsRestaurantsLoading = (state: RootState) => {
  return state.restaurants.isLoading;
};
export const getIsRestaurantsFetching = (state: RootState) => {
  return state.restaurants.isFetching;
};
export const getRestaurantsError = (state: RootState) => {
  return state.restaurants.error;
};
export const getRestaurantOrders = (state: RootState) => {
  return state.restaurants.orders;
};
export const getIsRestaurantOrdersLoading = (state: RootState) => {
  return state.restaurants.isOrdersLoading;
};
export const getRestaurantOrdersError = (state: RootState) => {
  return state.restaurants.ordersError;
};
export const getBrowseRestaurants = (state: RootState) => {
  return state.restaurants.browseItems;
};
export const getBrowseHasMore = (state: RootState) => {
  return state.restaurants.browseHasMore;
};
export const getBrowseNextCursor = (state: RootState) => {
  return state.restaurants.browseNextCursor;
};
export const getIsBrowseLoading = (state: RootState) => {
  return state.restaurants.isBrowseLoading;
};
export const getIsBrowseFetching = (state: RootState) => {
  return state.restaurants.isBrowseFetching;
};
export const getBrowseError = (state: RootState) => {
  return state.restaurants.browseError;
};
export const getMenuItems = (state: RootState) => {
  return state.restaurants.menuItems;
};
export const getMenuItemsHasMore = (state: RootState) => {
  return state.restaurants.menuItemsHasMore;
};
export const getMenuItemsNextCursor = (state: RootState) => {
  return state.restaurants.menuItemsNextCursor;
};
export const getIsMenuItemsLoading = (state: RootState) => {
  return state.restaurants.isMenuItemsLoading;
};
export const getIsMenuItemsFetching = (state: RootState) => {
  return state.restaurants.isMenuItemsFetching;
};
export const getMenuItemsError = (state: RootState) => {
  return state.restaurants.menuItemsError;
};
