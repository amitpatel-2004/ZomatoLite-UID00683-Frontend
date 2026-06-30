import { initialState } from './restaurantSlice.constants';
import type { RestaurantAction, RestaurantState } from './restaurantSlice.types';
import { RESTAURANT_ACTIONS } from './restaurantSlice.types';

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
      return { ...state, current: action.payload, error: null };

    case RESTAURANT_ACTIONS.FETCH_FAILED:
      return { ...state, current: null, error: action.payload };

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

    default:
      return state;
  }
};
