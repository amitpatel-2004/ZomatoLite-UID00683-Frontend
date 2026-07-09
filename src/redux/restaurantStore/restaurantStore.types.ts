import type { PaginatedResult } from '@appTypes/common.types';
import type { Order } from '@pages/restaurants/types/order.types';
import type { MenuItem, Restaurant } from '@pages/restaurants/types/restaurant.types';

import { RESTAURANT_ACTIONS } from './restaurantStore.constants';

export type RestaurantState = {
  items: Restaurant[];
  current: Restaurant | null;
  hasMore: boolean;
  nextCursor: string | null;
  isLoading: boolean;
  isFetching: boolean;
  error: string | null;
  orders: Order[];
  isOrdersLoading: boolean;
  ordersError: string | null;
  browseItems: Restaurant[];
  browseHasMore: boolean;
  browseNextCursor: string | null;
  isBrowseLoading: boolean;
  isBrowseFetching: boolean;
  browseError: string | null;
  menuItems: MenuItem[];
  menuItemsHasMore: boolean;
  menuItemsNextCursor: string | null;
  isMenuItemsLoading: boolean;
  isMenuItemsFetching: boolean;
  menuItemsError: string | null;
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

export type RestaurantOrdersSubscribedAction = {
  type: typeof RESTAURANT_ACTIONS.ORDERS_SUBSCRIBED;
};
export type RestaurantOrdersReceivedAction = {
  type: typeof RESTAURANT_ACTIONS.ORDERS_RECEIVED;
  payload: Order[];
};
export type RestaurantOrdersFailedAction = {
  type: typeof RESTAURANT_ACTIONS.ORDERS_FAILED;
  payload: string;
};
export type RestaurantOrdersClearedAction = {
  type: typeof RESTAURANT_ACTIONS.ORDERS_CLEARED;
};

export type BrowseListRequestedAction = { type: typeof RESTAURANT_ACTIONS.BROWSE_LIST_REQUESTED };
export type BrowseListLoadedAction = {
  type: typeof RESTAURANT_ACTIONS.BROWSE_LIST_LOADED;
  payload: PaginatedResult<Restaurant>;
};
export type BrowseListFetchStartedAction = {
  type: typeof RESTAURANT_ACTIONS.BROWSE_LIST_FETCH_STARTED;
};
export type BrowseListAppendedAction = {
  type: typeof RESTAURANT_ACTIONS.BROWSE_LIST_APPENDED;
  payload: PaginatedResult<Restaurant>;
};
export type BrowseListFailedAction = {
  type: typeof RESTAURANT_ACTIONS.BROWSE_LIST_FAILED;
  payload: string;
};

export type MenuItemListRequestedAction = {
  type: typeof RESTAURANT_ACTIONS.MENU_ITEM_LIST_REQUESTED;
};
export type MenuItemListLoadedAction = {
  type: typeof RESTAURANT_ACTIONS.MENU_ITEM_LIST_LOADED;
  payload: PaginatedResult<MenuItem>;
};
export type MenuItemListFetchStartedAction = {
  type: typeof RESTAURANT_ACTIONS.MENU_ITEM_LIST_FETCH_STARTED;
};
export type MenuItemListAppendedAction = {
  type: typeof RESTAURANT_ACTIONS.MENU_ITEM_LIST_APPENDED;
  payload: PaginatedResult<MenuItem>;
};
export type MenuItemListFailedAction = {
  type: typeof RESTAURANT_ACTIONS.MENU_ITEM_LIST_FAILED;
  payload: string;
};
export type MenuItemCreatedAction = {
  type: typeof RESTAURANT_ACTIONS.MENU_ITEM_CREATED;
  payload: MenuItem;
};
export type MenuItemUpdatedAction = {
  type: typeof RESTAURANT_ACTIONS.MENU_ITEM_UPDATED;
  payload: MenuItem;
};
export type MenuItemDeletedAction = {
  type: typeof RESTAURANT_ACTIONS.MENU_ITEM_DELETED;
  payload: string;
};
export type MenuItemClearedAction = { type: typeof RESTAURANT_ACTIONS.MENU_ITEM_CLEARED };

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
  | RestaurantClearedAction
  | RestaurantOrdersSubscribedAction
  | RestaurantOrdersReceivedAction
  | RestaurantOrdersFailedAction
  | RestaurantOrdersClearedAction
  | BrowseListRequestedAction
  | BrowseListLoadedAction
  | BrowseListFetchStartedAction
  | BrowseListAppendedAction
  | BrowseListFailedAction
  | MenuItemListRequestedAction
  | MenuItemListLoadedAction
  | MenuItemListFetchStartedAction
  | MenuItemListAppendedAction
  | MenuItemListFailedAction
  | MenuItemCreatedAction
  | MenuItemUpdatedAction
  | MenuItemDeletedAction
  | MenuItemClearedAction;
