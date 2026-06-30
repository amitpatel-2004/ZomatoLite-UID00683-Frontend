import type { PaginatedResult } from '@appTypes/common.types';
import type { MenuItem } from '@appTypes/restaurant.types';

export type MenuItemState = {
  items: MenuItem[];
  hasMore: boolean;
  nextCursor: string | null;
  isLoading: boolean;
  isFetching: boolean;
  error: string | null;
};

export const MENU_ITEM_ACTIONS = {
  LIST_REQUESTED: 'menuItems/listRequested',
  LIST_LOADED: 'menuItems/listLoaded',
  LIST_FETCH_STARTED: 'menuItems/listFetchStarted',
  LIST_APPENDED: 'menuItems/listAppended',
  LIST_FAILED: 'menuItems/listFailed',
  CREATED: 'menuItems/created',
  UPDATED: 'menuItems/updated',
  DELETED: 'menuItems/deleted',
  CLEARED: 'menuItems/cleared',
} as const;

export type MenuItemListRequestedAction = { type: typeof MENU_ITEM_ACTIONS.LIST_REQUESTED };
export type MenuItemListLoadedAction = {
  type: typeof MENU_ITEM_ACTIONS.LIST_LOADED;
  payload: PaginatedResult<MenuItem>;
};
export type MenuItemListFetchStartedAction = { type: typeof MENU_ITEM_ACTIONS.LIST_FETCH_STARTED };
export type MenuItemListAppendedAction = {
  type: typeof MENU_ITEM_ACTIONS.LIST_APPENDED;
  payload: PaginatedResult<MenuItem>;
};
export type MenuItemListFailedAction = {
  type: typeof MENU_ITEM_ACTIONS.LIST_FAILED;
  payload: string;
};
export type MenuItemCreatedAction = {
  type: typeof MENU_ITEM_ACTIONS.CREATED;
  payload: MenuItem;
};
export type MenuItemUpdatedAction = {
  type: typeof MENU_ITEM_ACTIONS.UPDATED;
  payload: MenuItem;
};
export type MenuItemDeletedAction = {
  type: typeof MENU_ITEM_ACTIONS.DELETED;
  payload: string;
};
export type MenuItemClearedAction = { type: typeof MENU_ITEM_ACTIONS.CLEARED };

export type MenuItemAction =
  | MenuItemListRequestedAction
  | MenuItemListLoadedAction
  | MenuItemListFetchStartedAction
  | MenuItemListAppendedAction
  | MenuItemListFailedAction
  | MenuItemCreatedAction
  | MenuItemUpdatedAction
  | MenuItemDeletedAction
  | MenuItemClearedAction;
