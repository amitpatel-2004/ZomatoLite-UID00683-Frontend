import { initialState, MENU_ITEM_ACTIONS } from './menuItemStore.constants';
import type { MenuItemAction, MenuItemState } from './menuItemStore.types';

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
        items: state.items.map((m) => {
          return m._id === action.payload._id ? action.payload : m;
        }),
      };

    case MENU_ITEM_ACTIONS.DELETED:
      return {
        ...state,
        items: state.items.filter((m) => {
          return m._id !== action.payload;
        }),
      };

    case MENU_ITEM_ACTIONS.CLEARED:
      return initialState;

    default:
      return state;
  }
};
