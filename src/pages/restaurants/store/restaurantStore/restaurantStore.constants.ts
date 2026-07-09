import type { RestaurantState } from './restaurantStore.types';

export const initialState: RestaurantState = {
  items: [],
  current: null,
  hasMore: false,
  nextCursor: null,
  isLoading: false,
  isFetching: false,
  error: null,
};

export const RESTAURANT_ACTIONS = {
  LIST_REQUESTED: 'restaurants/listRequested',
  LIST_LOADED: 'restaurants/listLoaded',
  LIST_FETCH_STARTED: 'restaurants/listFetchStarted',
  LIST_APPENDED: 'restaurants/listAppended',
  LIST_FAILED: 'restaurants/listFailed',
  FETCHED: 'restaurants/fetched',
  FETCH_FAILED: 'restaurants/fetchFailed',
  DETAIL_REQUESTED: 'restaurants/detailRequested',
  CREATED: 'restaurants/created',
  UPDATED: 'restaurants/updated',
  DELETED: 'restaurants/deleted',
  CLEARED: 'restaurants/cleared',
} as const;
