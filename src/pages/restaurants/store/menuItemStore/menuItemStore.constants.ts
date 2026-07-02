import type { MenuItemState } from './menuItemStore.types';

export const initialState: MenuItemState = {
  items: [],
  hasMore: false,
  nextCursor: null,
  isLoading: false,
  isFetching: false,
  error: null,
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
