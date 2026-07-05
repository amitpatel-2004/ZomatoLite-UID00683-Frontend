import { initialState, RESTAURANT_ACTIONS } from './restaurantStore.constants';
import type { RestaurantAction, RestaurantState } from './restaurantStore.types';

export const restaurantReducer = (
  state: RestaurantState = initialState,
  action: RestaurantAction,
): RestaurantState => {
  switch (action.type) {
    case RESTAURANT_ACTIONS.LIST_REQUESTED:
      return { ...state, isLoading: true, error: null };

    case RESTAURANT_ACTIONS.LIST_LOADED:
      return {
        ...state,
        isLoading: false,
        items: action.payload.items,
        hasMore: action.payload.hasMore,
        nextCursor: action.payload.nextCursor,
      };

    case RESTAURANT_ACTIONS.LIST_FETCH_STARTED:
      return { ...state, isFetching: true, error: null };

    case RESTAURANT_ACTIONS.LIST_APPENDED:
      return {
        ...state,
        isFetching: false,
        items: [...state.items, ...action.payload.items],
        hasMore: action.payload.hasMore,
        nextCursor: action.payload.nextCursor,
      };

    case RESTAURANT_ACTIONS.LIST_FAILED:
      return { ...state, isLoading: false, isFetching: false, error: action.payload };

    case RESTAURANT_ACTIONS.FETCHED:
      return { ...state, current: action.payload, isLoading: false, error: null };

    case RESTAURANT_ACTIONS.FETCH_FAILED:
      return { ...state, current: null, isLoading: false, error: action.payload };

    case RESTAURANT_ACTIONS.DETAIL_REQUESTED:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case RESTAURANT_ACTIONS.CREATED:
      return { ...state, items: [action.payload, ...state.items] };

    case RESTAURANT_ACTIONS.UPDATED:
      return {
        ...state,
        current: state.current?._id === action.payload._id ? action.payload : state.current,
        items: state.items.map((r) => {
          return r._id === action.payload._id ? action.payload : r;
        }),
      };

    case RESTAURANT_ACTIONS.DELETED:
      return {
        ...state,
        items: state.items.filter((r) => {
          return r._id !== action.payload;
        }),
        current: state.current?._id === action.payload ? null : state.current,
      };

    case RESTAURANT_ACTIONS.CLEARED:
      return initialState;

    case RESTAURANT_ACTIONS.ORDERS_SUBSCRIBED:
      return { ...state, isOrdersLoading: true, ordersError: null };

    case RESTAURANT_ACTIONS.ORDERS_RECEIVED:
      return { ...state, isOrdersLoading: false, orders: action.payload };

    case RESTAURANT_ACTIONS.ORDERS_FAILED:
      return { ...state, isOrdersLoading: false, ordersError: action.payload };

    case RESTAURANT_ACTIONS.ORDERS_CLEARED:
      return { ...state, orders: [] };

    case RESTAURANT_ACTIONS.BROWSE_LIST_REQUESTED:
      return { ...state, isBrowseLoading: true, browseError: null };

    case RESTAURANT_ACTIONS.BROWSE_LIST_LOADED:
      return {
        ...state,
        isBrowseLoading: false,
        browseItems: action.payload.items,
        browseHasMore: action.payload.hasMore,
        browseNextCursor: action.payload.nextCursor,
      };

    case RESTAURANT_ACTIONS.BROWSE_LIST_FETCH_STARTED:
      return { ...state, isBrowseFetching: true, browseError: null };

    case RESTAURANT_ACTIONS.BROWSE_LIST_APPENDED:
      return {
        ...state,
        isBrowseFetching: false,
        browseItems: [...state.browseItems, ...action.payload.items],
        browseHasMore: action.payload.hasMore,
        browseNextCursor: action.payload.nextCursor,
      };

    case RESTAURANT_ACTIONS.BROWSE_LIST_FAILED:
      return {
        ...state,
        isBrowseLoading: false,
        isBrowseFetching: false,
        browseError: action.payload,
      };

    case RESTAURANT_ACTIONS.MENU_ITEM_LIST_REQUESTED:
      return { ...state, isMenuItemsLoading: true, menuItemsError: null };

    case RESTAURANT_ACTIONS.MENU_ITEM_LIST_LOADED:
      return {
        ...state,
        isMenuItemsLoading: false,
        menuItems: action.payload.items,
        menuItemsHasMore: action.payload.hasMore,
        menuItemsNextCursor: action.payload.nextCursor,
      };

    case RESTAURANT_ACTIONS.MENU_ITEM_LIST_FETCH_STARTED:
      return { ...state, isMenuItemsFetching: true, menuItemsError: null };

    case RESTAURANT_ACTIONS.MENU_ITEM_LIST_APPENDED:
      return {
        ...state,
        isMenuItemsFetching: false,
        menuItems: [...state.menuItems, ...action.payload.items],
        menuItemsHasMore: action.payload.hasMore,
        menuItemsNextCursor: action.payload.nextCursor,
      };

    case RESTAURANT_ACTIONS.MENU_ITEM_LIST_FAILED:
      return {
        ...state,
        isMenuItemsLoading: false,
        isMenuItemsFetching: false,
        menuItemsError: action.payload,
      };

    case RESTAURANT_ACTIONS.MENU_ITEM_CREATED:
      return { ...state, menuItems: [action.payload, ...state.menuItems] };

    case RESTAURANT_ACTIONS.MENU_ITEM_UPDATED:
      return {
        ...state,
        menuItems: state.menuItems.map((m) => {
          return m._id === action.payload._id ? action.payload : m;
        }),
      };

    case RESTAURANT_ACTIONS.MENU_ITEM_DELETED:
      return {
        ...state,
        menuItems: state.menuItems.filter((m) => {
          return m._id !== action.payload;
        }),
      };

    case RESTAURANT_ACTIONS.MENU_ITEM_CLEARED:
      return {
        ...state,
        menuItems: [],
        menuItemsHasMore: false,
        menuItemsNextCursor: null,
        isMenuItemsLoading: false,
        isMenuItemsFetching: false,
        menuItemsError: null,
      };

    default:
      return state;
  }
};
