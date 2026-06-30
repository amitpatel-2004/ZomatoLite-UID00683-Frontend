import type { RestaurantState } from './restaurantSlice.types';

export const initialState: RestaurantState = {
  items: [],
  current: null,
  hasMore: false,
  nextCursor: null,
  isLoading: false,
  isFetching: false,
  error: null,
};
