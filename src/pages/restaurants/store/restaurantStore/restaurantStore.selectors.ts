import type { RootState } from '@store/index';

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
