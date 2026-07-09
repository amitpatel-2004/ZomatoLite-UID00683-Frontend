import type { PaginatedResult } from '@appTypes/common.types';
import type { MenuItem } from '@pages/restaurants/types/restaurant.types';

import { MENU_ITEM_ACTIONS } from './menuItemStore.constants';
import type {
  MenuItemClearedAction,
  MenuItemCreatedAction,
  MenuItemDeletedAction,
  MenuItemListAppendedAction,
  MenuItemListFailedAction,
  MenuItemListFetchStartedAction,
  MenuItemListLoadedAction,
  MenuItemListRequestedAction,
  MenuItemUpdatedAction,
} from './menuItemStore.types';

export const menuItemListRequested = (): MenuItemListRequestedAction => {
  return {
    type: MENU_ITEM_ACTIONS.LIST_REQUESTED,
  };
};

export const menuItemListLoaded = (
  payload: PaginatedResult<MenuItem>,
): MenuItemListLoadedAction => {
  return {
    payload,
    type: MENU_ITEM_ACTIONS.LIST_LOADED,
  };
};

export const menuItemListFetchStarted = (): MenuItemListFetchStartedAction => {
  return {
    type: MENU_ITEM_ACTIONS.LIST_FETCH_STARTED,
  };
};

export const menuItemListAppended = (
  payload: PaginatedResult<MenuItem>,
): MenuItemListAppendedAction => {
  return {
    payload,
    type: MENU_ITEM_ACTIONS.LIST_APPENDED,
  };
};

export const menuItemListFailed = (payload: string): MenuItemListFailedAction => {
  return {
    payload,
    type: MENU_ITEM_ACTIONS.LIST_FAILED,
  };
};

export const menuItemCreated = (payload: MenuItem): MenuItemCreatedAction => {
  return {
    payload,
    type: MENU_ITEM_ACTIONS.CREATED,
  };
};

export const menuItemUpdated = (payload: MenuItem): MenuItemUpdatedAction => {
  return {
    payload,
    type: MENU_ITEM_ACTIONS.UPDATED,
  };
};

export const menuItemDeleted = (payload: string): MenuItemDeletedAction => {
  return {
    payload,
    type: MENU_ITEM_ACTIONS.DELETED,
  };
};

export const menuItemsCleared = (): MenuItemClearedAction => {
  return {
    type: MENU_ITEM_ACTIONS.CLEARED,
  };
};
