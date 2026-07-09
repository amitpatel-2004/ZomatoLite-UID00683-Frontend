import type { PaginatedResult } from '@appTypes/common.types';
import type { Order } from '@pages/restaurants/types/order.types';
import type { MenuItem, Restaurant } from '@pages/restaurants/types/restaurant.types';

import { RESTAURANT_ACTIONS } from './restaurantStore.constants';
import type {
  BrowseListAppendedAction,
  BrowseListFailedAction,
  BrowseListFetchStartedAction,
  BrowseListLoadedAction,
  BrowseListRequestedAction,
  MenuItemClearedAction,
  MenuItemCreatedAction,
  MenuItemDeletedAction,
  MenuItemListAppendedAction,
  MenuItemListFailedAction,
  MenuItemListFetchStartedAction,
  MenuItemListLoadedAction,
  MenuItemListRequestedAction,
  MenuItemUpdatedAction,
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
  RestaurantOrdersClearedAction,
  RestaurantOrdersFailedAction,
  RestaurantOrdersReceivedAction,
  RestaurantOrdersSubscribedAction,
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

export const restaurantOrdersSubscribed = (): RestaurantOrdersSubscribedAction => {
  return { type: RESTAURANT_ACTIONS.ORDERS_SUBSCRIBED };
};

export const restaurantOrdersReceived = (payload: Order[]): RestaurantOrdersReceivedAction => {
  return { payload, type: RESTAURANT_ACTIONS.ORDERS_RECEIVED };
};

export const restaurantOrdersFailed = (payload: string): RestaurantOrdersFailedAction => {
  return { payload, type: RESTAURANT_ACTIONS.ORDERS_FAILED };
};

export const restaurantOrdersCleared = (): RestaurantOrdersClearedAction => {
  return { type: RESTAURANT_ACTIONS.ORDERS_CLEARED };
};

export const browseListRequested = (): BrowseListRequestedAction => {
  return { type: RESTAURANT_ACTIONS.BROWSE_LIST_REQUESTED };
};

export const browseListLoaded = (payload: PaginatedResult<Restaurant>): BrowseListLoadedAction => {
  return { payload, type: RESTAURANT_ACTIONS.BROWSE_LIST_LOADED };
};

export const browseListFetchStarted = (): BrowseListFetchStartedAction => {
  return { type: RESTAURANT_ACTIONS.BROWSE_LIST_FETCH_STARTED };
};

export const browseListAppended = (
  payload: PaginatedResult<Restaurant>,
): BrowseListAppendedAction => {
  return { payload, type: RESTAURANT_ACTIONS.BROWSE_LIST_APPENDED };
};

export const browseListFailed = (payload: string): BrowseListFailedAction => {
  return { payload, type: RESTAURANT_ACTIONS.BROWSE_LIST_FAILED };
};

export const menuItemListRequested = (): MenuItemListRequestedAction => {
  return { type: RESTAURANT_ACTIONS.MENU_ITEM_LIST_REQUESTED };
};

export const menuItemListLoaded = (
  payload: PaginatedResult<MenuItem>,
): MenuItemListLoadedAction => {
  return { payload, type: RESTAURANT_ACTIONS.MENU_ITEM_LIST_LOADED };
};

export const menuItemListFetchStarted = (): MenuItemListFetchStartedAction => {
  return { type: RESTAURANT_ACTIONS.MENU_ITEM_LIST_FETCH_STARTED };
};

export const menuItemListAppended = (
  payload: PaginatedResult<MenuItem>,
): MenuItemListAppendedAction => {
  return { payload, type: RESTAURANT_ACTIONS.MENU_ITEM_LIST_APPENDED };
};

export const menuItemListFailed = (payload: string): MenuItemListFailedAction => {
  return { payload, type: RESTAURANT_ACTIONS.MENU_ITEM_LIST_FAILED };
};

export const menuItemCreated = (payload: MenuItem): MenuItemCreatedAction => {
  return { payload, type: RESTAURANT_ACTIONS.MENU_ITEM_CREATED };
};

export const menuItemUpdated = (payload: MenuItem): MenuItemUpdatedAction => {
  return { payload, type: RESTAURANT_ACTIONS.MENU_ITEM_UPDATED };
};

export const menuItemDeleted = (payload: string): MenuItemDeletedAction => {
  return { payload, type: RESTAURANT_ACTIONS.MENU_ITEM_DELETED };
};

export const menuItemsCleared = (): MenuItemClearedAction => {
  return { type: RESTAURANT_ACTIONS.MENU_ITEM_CLEARED };
};
