import type { PaginatedResult } from '@appTypes/common.types';
import type { Restaurant } from '@pages/restaurants/types/restaurant.types';

import { RESTAURANT_ACTIONS } from './restaurantStore.constants';

export type RestaurantState = {
  items: Restaurant[];
  current: Restaurant | null;
  hasMore: boolean;
  nextCursor: string | null;
  isLoading: boolean;
  isFetching: boolean;
  error: string | null;
};

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
export type RestaurantDetailRequestedAction = {
  type: typeof RESTAURANT_ACTIONS.DETAIL_REQUESTED;
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
  | RestaurantDetailRequestedAction
  | RestaurantCreatedAction
  | RestaurantUpdatedAction
  | RestaurantDeletedAction
  | RestaurantClearedAction;
