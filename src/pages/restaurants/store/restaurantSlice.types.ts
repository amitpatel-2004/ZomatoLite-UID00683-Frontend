import type { PaginatedResult } from '@appTypes/common.types';
import type { Restaurant } from '@appTypes/restaurant.types';

export type RestaurantState = {
  items: Restaurant[];
  current: Restaurant | null;
  hasMore: boolean;
  nextCursor: string | null;
  isLoading: boolean;
  isFetching: boolean;
  error: string | null;
};

export const RESTAURANT_ACTIONS = {
  LIST_REQUESTED: 'restaurants/listRequested',
  LIST_LOADED: 'restaurants/listLoaded',
  LIST_FETCH_STARTED: 'restaurants/listFetchStarted',
  LIST_APPENDED: 'restaurants/listAppended',
  LIST_FAILED: 'restaurants/listFailed',
  FETCHED: 'restaurants/fetched',
  FETCH_FAILED: 'restaurants/fetchFailed',
  CREATED: 'restaurants/created',
  UPDATED: 'restaurants/updated',
  DELETED: 'restaurants/deleted',
  CLEARED: 'restaurants/cleared',
} as const;

export type RestaurantListRequestedAction = { type: typeof RESTAURANT_ACTIONS.LIST_REQUESTED };
export type RestaurantListLoadedAction = {
  type: typeof RESTAURANT_ACTIONS.LIST_LOADED;
  payload: PaginatedResult<Restaurant>;
};
export type RestaurantListFetchStartedAction = {
  type: typeof RESTAURANT_ACTIONS.LIST_FETCH_STARTED;
};
export type RestaurantListAppendedAction = {
  type: typeof RESTAURANT_ACTIONS.LIST_APPENDED;
  payload: PaginatedResult<Restaurant>;
};
export type RestaurantListFailedAction = {
  type: typeof RESTAURANT_ACTIONS.LIST_FAILED;
  payload: string;
};
export type RestaurantFetchedAction = {
  type: typeof RESTAURANT_ACTIONS.FETCHED;
  payload: Restaurant;
};
export type RestaurantFetchFailedAction = {
  type: typeof RESTAURANT_ACTIONS.FETCH_FAILED;
  payload: string;
};
export type RestaurantCreatedAction = {
  type: typeof RESTAURANT_ACTIONS.CREATED;
  payload: Restaurant;
};
export type RestaurantUpdatedAction = {
  type: typeof RESTAURANT_ACTIONS.UPDATED;
  payload: Restaurant;
};
export type RestaurantDeletedAction = {
  type: typeof RESTAURANT_ACTIONS.DELETED;
  payload: string;
};
export type RestaurantClearedAction = { type: typeof RESTAURANT_ACTIONS.CLEARED };

export type RestaurantAction =
  | RestaurantListRequestedAction
  | RestaurantListLoadedAction
  | RestaurantListFetchStartedAction
  | RestaurantListAppendedAction
  | RestaurantListFailedAction
  | RestaurantFetchedAction
  | RestaurantFetchFailedAction
  | RestaurantCreatedAction
  | RestaurantUpdatedAction
  | RestaurantDeletedAction
  | RestaurantClearedAction;
