import type { PaginatedResult } from '@appTypes/common.types';
import type { MenuItem } from '@appTypes/restaurant.types';

type MenuItemState = {
  items: MenuItem[];
  hasMore: boolean;
  nextCursor: string | null;
  isLoading: boolean;
  isFetching: boolean;
  error: string | null;
};

const MENU_ITEM_ACTIONS = {
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

type MenuItemListRequestedAction = { type: typeof MENU_ITEM_ACTIONS.LIST_REQUESTED };
type MenuItemListLoadedAction = {
  type: typeof MENU_ITEM_ACTIONS.LIST_LOADED;
  payload: PaginatedResult<MenuItem>;
};
type MenuItemListFetchStartedAction = { type: typeof MENU_ITEM_ACTIONS.LIST_FETCH_STARTED };
type MenuItemListAppendedAction = {
  type: typeof MENU_ITEM_ACTIONS.LIST_APPENDED;
  payload: PaginatedResult<MenuItem>;
};
type MenuItemListFailedAction = {
  type: typeof MENU_ITEM_ACTIONS.LIST_FAILED;
  payload: string;
};
type MenuItemCreatedAction = {
  type: typeof MENU_ITEM_ACTIONS.CREATED;
  payload: MenuItem;
};
type MenuItemUpdatedAction = {
  type: typeof MENU_ITEM_ACTIONS.UPDATED;
  payload: MenuItem;
};
type MenuItemDeletedAction = {
  type: typeof MENU_ITEM_ACTIONS.DELETED;
  payload: string;
};
type MenuItemClearedAction = { type: typeof MENU_ITEM_ACTIONS.CLEARED };

type MenuItemAction =
  | MenuItemListRequestedAction
  | MenuItemListLoadedAction
  | MenuItemListFetchStartedAction
  | MenuItemListAppendedAction
  | MenuItemListFailedAction
  | MenuItemCreatedAction
  | MenuItemUpdatedAction
  | MenuItemDeletedAction
  | MenuItemClearedAction;

const initialState: MenuItemState = {
  items: [],
  hasMore: false,
  nextCursor: null,
  isLoading: false,
  isFetching: false,
  error: null,
};

export const menuItemListRequested = (): MenuItemListRequestedAction => ({
  type: MENU_ITEM_ACTIONS.LIST_REQUESTED,
});

export const menuItemListLoaded = (
  payload: PaginatedResult<MenuItem>,
): MenuItemListLoadedAction => ({
  payload,
  type: MENU_ITEM_ACTIONS.LIST_LOADED,
});

export const menuItemListFetchStarted = (): MenuItemListFetchStartedAction => ({
  type: MENU_ITEM_ACTIONS.LIST_FETCH_STARTED,
});

export const menuItemListAppended = (
  payload: PaginatedResult<MenuItem>,
): MenuItemListAppendedAction => ({
  payload,
  type: MENU_ITEM_ACTIONS.LIST_APPENDED,
});

export const menuItemListFailed = (payload: string): MenuItemListFailedAction => ({
  payload,
  type: MENU_ITEM_ACTIONS.LIST_FAILED,
});

export const menuItemCreated = (payload: MenuItem): MenuItemCreatedAction => ({
  payload,
  type: MENU_ITEM_ACTIONS.CREATED,
});

export const menuItemUpdated = (payload: MenuItem): MenuItemUpdatedAction => ({
  payload,
  type: MENU_ITEM_ACTIONS.UPDATED,
});

export const menuItemDeleted = (payload: string): MenuItemDeletedAction => ({
  payload,
  type: MENU_ITEM_ACTIONS.DELETED,
});

export const menuItemsCleared = (): MenuItemClearedAction => ({
  type: MENU_ITEM_ACTIONS.CLEARED,
});

export const menuItemReducer = (
  state: MenuItemState = initialState,
  action: MenuItemAction,
): MenuItemState => {
  switch (action.type) {
    case MENU_ITEM_ACTIONS.LIST_REQUESTED:
      return { ...state, isLoading: true, error: null };

    case MENU_ITEM_ACTIONS.LIST_LOADED:
      return {
        ...state,
        isLoading: false,
        items: action.payload.items,
        hasMore: action.payload.hasMore,
        nextCursor: action.payload.nextCursor,
      };

    case MENU_ITEM_ACTIONS.LIST_FETCH_STARTED:
      return { ...state, isFetching: true, error: null };

    case MENU_ITEM_ACTIONS.LIST_APPENDED:
      return {
        ...state,
        isFetching: false,
        items: [...state.items, ...action.payload.items],
        hasMore: action.payload.hasMore,
        nextCursor: action.payload.nextCursor,
      };

    case MENU_ITEM_ACTIONS.LIST_FAILED:
      return { ...state, isLoading: false, isFetching: false, error: action.payload };

    case MENU_ITEM_ACTIONS.CREATED:
      return { ...state, items: [action.payload, ...state.items] };

    case MENU_ITEM_ACTIONS.UPDATED:
      return {
        ...state,
        items: state.items.map((m) => (m._id === action.payload._id ? action.payload : m)),
      };

    case MENU_ITEM_ACTIONS.DELETED:
      return {
        ...state,
        items: state.items.filter((m) => m._id !== action.payload),
      };

    case MENU_ITEM_ACTIONS.CLEARED:
      return initialState;

    default:
      return state;
  }
};
