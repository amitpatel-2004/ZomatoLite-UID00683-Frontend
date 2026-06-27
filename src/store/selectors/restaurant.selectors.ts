import type { RootState } from '@store/rootReducer';

export const selectRestaurants = (state: RootState) => state.restaurants.items;
export const selectCurrentRestaurant = (state: RootState) => state.restaurants.current;
export const selectRestaurantsHasMore = (state: RootState) => state.restaurants.hasMore;
export const selectRestaurantsNextCursor = (state: RootState) => state.restaurants.nextCursor;
export const selectIsRestaurantsLoading = (state: RootState) => state.restaurants.isLoading;
export const selectIsRestaurantsFetching = (state: RootState) => state.restaurants.isFetching;
export const selectRestaurantsError = (state: RootState) => state.restaurants.error;
