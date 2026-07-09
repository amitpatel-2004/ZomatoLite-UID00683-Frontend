import type { PaginatedResult } from '@appTypes/common.types';
import type { Restaurant } from '@pages/restaurants/types/restaurant.types';

import { RESTAURANT_ACTIONS } from './restaurantStore.constants';
import type {
  RestaurantClearedAction,
  RestaurantCreatedAction,
  RestaurantDeletedAction,
  RestaurantDetailRequestedAction,
  RestaurantFetchedAction,
  RestaurantFetchFailedAction,
  RestaurantListAppendedAction,
  RestaurantListFailedAction,
  RestaurantListFetchStartedAction,
  RestaurantListLoadedAction,
  RestaurantListRequestedAction,
  RestaurantUpdatedAction,
} from './restaurantStore.types';

export const restaurantListRequested = (): RestaurantListRequestedAction => {
  return { type: RESTAURANT_ACTIONS.LIST_REQUESTED };
};

export const restaurantListLoaded = (
  payload: PaginatedResult<Restaurant>,
): RestaurantListLoadedAction => {
  return { payload, type: RESTAURANT_ACTIONS.LIST_LOADED };
};

export const restaurantListFetchStarted = (): RestaurantListFetchStartedAction => {
  return { type: RESTAURANT_ACTIONS.LIST_FETCH_STARTED };
};

export const restaurantListAppended = (
  payload: PaginatedResult<Restaurant>,
): RestaurantListAppendedAction => {
  return { payload, type: RESTAURANT_ACTIONS.LIST_APPENDED };
};

export const restaurantListFailed = (payload: string): RestaurantListFailedAction => {
  return { payload, type: RESTAURANT_ACTIONS.LIST_FAILED };
};

export const restaurantFetched = (payload: Restaurant): RestaurantFetchedAction => {
  return { payload, type: RESTAURANT_ACTIONS.FETCHED };
};

export const restaurantFetchFailed = (payload: string): RestaurantFetchFailedAction => {
  return { payload, type: RESTAURANT_ACTIONS.FETCH_FAILED };
};

export const restaurantDetailRequested = (): RestaurantDetailRequestedAction => {
  return {
    type: RESTAURANT_ACTIONS.DETAIL_REQUESTED,
  };
};

export const restaurantCreated = (payload: Restaurant): RestaurantCreatedAction => {
  return { payload, type: RESTAURANT_ACTIONS.CREATED };
};

export const restaurantUpdated = (payload: Restaurant): RestaurantUpdatedAction => {
  return { payload, type: RESTAURANT_ACTIONS.UPDATED };
};

export const restaurantDeleted = (payload: string): RestaurantDeletedAction => {
  return { payload, type: RESTAURANT_ACTIONS.DELETED };
};

export const restaurantsCleared = (): RestaurantClearedAction => {
  return { type: RESTAURANT_ACTIONS.CLEARED };
};
