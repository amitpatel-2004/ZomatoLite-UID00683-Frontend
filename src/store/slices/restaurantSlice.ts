import type { PaginatedResult } from '@appTypes/common.types';
import type { Restaurant } from '@appTypes/restaurant.types';

type RestaurantState = {
  items: Restaurant[];
  current: Restaurant | null;
  hasMore: boolean;
  nextCursor: string | null;
  isLoading: boolean;
  isFetching: boolean;
  error: string | null;
};

const RESTAURANT_ACTIONS = {
  LIST_REQUESTED: 'restaurants/listRequested',
  LIST_LOADED: 'restaurants/listLoaded',
  LIST_FETCH_STARTED: 'restaurants/listFetchStarted',
  LIST_APPENDED: 'restaurants/listAppended',
  LIST_FAILED: 'restaurants/listFailed',
  FETCHED: 'restaurants/fetched',
  FETCH_FAILED: 'restaurants/fetchFailed',
  CREATED: 'restaurants/created',
  UPDATED: 'restaurants/updated',
  DELETED: 'restaurants/deleted',
  CLEARED: 'restaurants/cleared',
} as const;

type RestaurantListRequestedAction = { type: typeof RESTAURANT_ACTIONS.LIST_REQUESTED };
type RestaurantListLoadedAction = {
  type: typeof RESTAURANT_ACTIONS.LIST_LOADED;
  payload: PaginatedResult<Restaurant>;
};
type RestaurantListFetchStartedAction = { type: typeof RESTAURANT_ACTIONS.LIST_FETCH_STARTED };
type RestaurantListAppendedAction = {
  type: typeof RESTAURANT_ACTIONS.LIST_APPENDED;
  payload: PaginatedResult<Restaurant>;
};
type RestaurantListFailedAction = {
  type: typeof RESTAURANT_ACTIONS.LIST_FAILED;
  payload: string;
};
type RestaurantFetchedAction = {
  type: typeof RESTAURANT_ACTIONS.FETCHED;
  payload: Restaurant;
};
type RestaurantFetchFailedAction = {
  type: typeof RESTAURANT_ACTIONS.FETCH_FAILED;
  payload: string;
};
type RestaurantCreatedAction = {
  type: typeof RESTAURANT_ACTIONS.CREATED;
  payload: Restaurant;
};
type RestaurantUpdatedAction = {
  type: typeof RESTAURANT_ACTIONS.UPDATED;
  payload: Restaurant;
};
type RestaurantDeletedAction = {
  type: typeof RESTAURANT_ACTIONS.DELETED;
  payload: string;
};
type RestaurantClearedAction = { type: typeof RESTAURANT_ACTIONS.CLEARED };

type RestaurantAction =
  | RestaurantListRequestedAction
  | RestaurantListLoadedAction
  | RestaurantListFetchStartedAction
  | RestaurantListAppendedAction
  | RestaurantListFailedAction
  | RestaurantFetchedAction
  | RestaurantFetchFailedAction
  | RestaurantCreatedAction
  | RestaurantUpdatedAction
  | RestaurantDeletedAction
  | RestaurantClearedAction;

const initialState: RestaurantState = {
  items: [],
  current: null,
  hasMore: false,
  nextCursor: null,
  isLoading: false,
  isFetching: false,
  error: null,
};

export const restaurantListRequested = (): RestaurantListRequestedAction => ({
  type: RESTAURANT_ACTIONS.LIST_REQUESTED,
});

export const restaurantListLoaded = (
  payload: PaginatedResult<Restaurant>,
): RestaurantListLoadedAction => ({
  payload,
  type: RESTAURANT_ACTIONS.LIST_LOADED,
});

export const restaurantListFetchStarted = (): RestaurantListFetchStartedAction => ({
  type: RESTAURANT_ACTIONS.LIST_FETCH_STARTED,
});

export const restaurantListAppended = (
  payload: PaginatedResult<Restaurant>,
): RestaurantListAppendedAction => ({
  payload,
  type: RESTAURANT_ACTIONS.LIST_APPENDED,
});

export const restaurantListFailed = (payload: string): RestaurantListFailedAction => ({
  payload,
  type: RESTAURANT_ACTIONS.LIST_FAILED,
});

export const restaurantFetched = (payload: Restaurant): RestaurantFetchedAction => ({
  payload,
  type: RESTAURANT_ACTIONS.FETCHED,
});

export const restaurantFetchFailed = (payload: string): RestaurantFetchFailedAction => ({
  payload,
  type: RESTAURANT_ACTIONS.FETCH_FAILED,
});

export const restaurantCreated = (payload: Restaurant): RestaurantCreatedAction => ({
  payload,
  type: RESTAURANT_ACTIONS.CREATED,
});

export const restaurantUpdated = (payload: Restaurant): RestaurantUpdatedAction => ({
  payload,
  type: RESTAURANT_ACTIONS.UPDATED,
});

export const restaurantDeleted = (payload: string): RestaurantDeletedAction => ({
  payload,
  type: RESTAURANT_ACTIONS.DELETED,
});

export const restaurantsCleared = (): RestaurantClearedAction => ({
  type: RESTAURANT_ACTIONS.CLEARED,
});

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
        items: state.items.map((r) => (r._id === action.payload._id ? action.payload : r)),
      };

    case RESTAURANT_ACTIONS.DELETED:
      return {
        ...state,
        items: state.items.filter((r) => r._id !== action.payload),
        current: state.current?._id === action.payload ? null : state.current,
      };

    case RESTAURANT_ACTIONS.CLEARED:
      return initialState;

    default:
      return state;
  }
};
