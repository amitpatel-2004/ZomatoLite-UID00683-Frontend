import { useCallback, useEffect } from 'react';

import { useSelector } from 'react-redux';

import { DEFAULT_PAGE_LIMIT } from '@constants/api.constants';
import { MESSAGES } from '@pages/dashboard/constants/messages.constants';
import {
  getIsRestaurantsFetching,
  getIsRestaurantsLoading,
  getRestaurants,
  getRestaurantsHasMore,
  getRestaurantsNextCursor,
  restaurantCreated,
  restaurantDeleted,
  restaurantListAppended,
  restaurantListFailed,
  restaurantListFetchStarted,
  restaurantListLoaded,
  restaurantListRequested,
} from '@pages/restaurants/store/restaurantStore';
import type { Restaurant } from '@pages/restaurants/types/restaurant.types';
import { restaurantService } from '@services/restaurant/restaurantService';
import type { CreateRestaurantPayload } from '@services/restaurant/restaurantService.types';
import { useAppDispatch } from '@store/hooks';

export const useOwnerRestaurants = () => {
  const dispatch = useAppDispatch();
  const items = useSelector(getRestaurants);
  const hasMore = useSelector(getRestaurantsHasMore);
  const nextCursor = useSelector(getRestaurantsNextCursor);
  const isLoading = useSelector(getIsRestaurantsLoading);
  const isFetching = useSelector(getIsRestaurantsFetching);

  const fetchInitial = useCallback(async () => {
    dispatch(restaurantListRequested());
    try {
      const result = await restaurantService.listMine();
      dispatch(restaurantListLoaded(result));
    } catch (error) {
      const msg = error instanceof Error ? error.message : MESSAGES.ERRORS.FETCH_FAILED;
      dispatch(restaurantListFailed(msg));
    }
  }, [dispatch]);

  useEffect(() => {
    fetchInitial();
  }, [fetchInitial]);

  const fetchMore = useCallback(async () => {
    if (!hasMore || isFetching || !nextCursor) return;
    dispatch(restaurantListFetchStarted());
    try {
      const result = await restaurantService.listMine(DEFAULT_PAGE_LIMIT, nextCursor);
      dispatch(restaurantListAppended(result));
    } catch (error) {
      const msg = error instanceof Error ? error.message : MESSAGES.ERRORS.FETCH_MORE_FAILED;
      dispatch(restaurantListFailed(msg));
    }
  }, [dispatch, hasMore, isFetching, nextCursor]);

  const createRestaurant = async (payload: CreateRestaurantPayload): Promise<Restaurant> => {
    const result = await restaurantService.create(payload);
    dispatch(restaurantCreated(result));
    return result;
  };

  const deleteRestaurant = async (id: string): Promise<void> => {
    await restaurantService.delete(id);
    dispatch(restaurantDeleted(id));
  };

  return { createRestaurant, deleteRestaurant, fetchMore, hasMore, isFetching, isLoading, items };
};
