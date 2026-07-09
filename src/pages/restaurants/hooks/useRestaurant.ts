import { useCallback, useEffect } from 'react';

import { useSelector } from 'react-redux';

import { DEFAULT_PAGE_LIMIT } from '@constants/api.constants';
import { MESSAGES } from '@pages/restaurants/constants/messages.constants';
import { useAppDispatch } from '@redux/hooks';
import {
  getCurrentRestaurant,
  getIsRestaurantsFetching,
  getIsRestaurantsLoading,
  getRestaurants,
  getRestaurantsError,
  getRestaurantsHasMore,
  getRestaurantsNextCursor,
  restaurantCreated,
  restaurantDeleted,
  restaurantDetailRequested,
  restaurantFetched,
  restaurantFetchFailed,
  restaurantListAppended,
  restaurantListFailed,
  restaurantListFetchStarted,
  restaurantListLoaded,
  restaurantListRequested,
  restaurantUpdated,
} from '@redux/restaurantStore';
import { restaurantService } from '@services/restaurant/restaurantService';
import type {
  CreateRestaurantPayload,
  UpdateRestaurantPayload,
} from '@services/restaurant/restaurantService.types';

export const useRestaurant = (restaurantId?: string) => {
  const dispatch = useAppDispatch();
  const items = useSelector(getRestaurants);
  const hasMore = useSelector(getRestaurantsHasMore);
  const nextCursor = useSelector(getRestaurantsNextCursor);
  const restaurant = useSelector(getCurrentRestaurant);
  const error = useSelector(getRestaurantsError);
  const isLoading = useSelector(getIsRestaurantsLoading);
  const isFetching = useSelector(getIsRestaurantsFetching);

  const fetchList = useCallback(async () => {
    dispatch(restaurantListRequested());
    try {
      const result = await restaurantService.listMine();
      dispatch(restaurantListLoaded(result));
    } catch (err) {
      const msg = err instanceof Error ? err.message : MESSAGES.ERRORS.FETCH_FAILED;
      dispatch(restaurantListFailed(msg));
    }
  }, [dispatch]);

  const fetchDetail = useCallback(async () => {
    if (!restaurantId) return;
    try {
      dispatch(restaurantDetailRequested());
      const result = await restaurantService.getById(restaurantId);
      dispatch(restaurantFetched(result));
    } catch (err) {
      const msg = err instanceof Error ? err.message : MESSAGES.ERRORS.FETCH_FAILED;
      dispatch(restaurantFetchFailed(msg));
    }
  }, [dispatch, restaurantId]);

  useEffect(() => {
    if (restaurantId) {
      fetchDetail();
    } else {
      fetchList();
    }
  }, [restaurantId, fetchDetail, fetchList]);

  const fetchMore = useCallback(async () => {
    if (!hasMore || isFetching || !nextCursor) return;
    dispatch(restaurantListFetchStarted());
    try {
      const result = await restaurantService.listMine(DEFAULT_PAGE_LIMIT, nextCursor);
      dispatch(restaurantListAppended(result));
    } catch (err) {
      const msg = err instanceof Error ? err.message : MESSAGES.ERRORS.FETCH_MORE_FAILED;
      dispatch(restaurantListFailed(msg));
    }
  }, [dispatch, hasMore, isFetching, nextCursor]);

  const createRestaurant = async (payload: CreateRestaurantPayload): Promise<void> => {
    const result = await restaurantService.create(payload);
    dispatch(restaurantCreated(result));
  };

  const updateRestaurant = async (payload: UpdateRestaurantPayload): Promise<void> => {
    if (!restaurantId) return;
    const result = await restaurantService.update(restaurantId, payload);
    dispatch(restaurantUpdated(result));
  };

  const deleteRestaurant = async (): Promise<void> => {
    if (!restaurantId) return;
    await restaurantService.delete(restaurantId);
    dispatch(restaurantDeleted(restaurantId));
  };

  return {
    createRestaurant,
    deleteRestaurant,
    error,
    fetchMore,
    hasMore,
    isFetching,
    isLoading,
    items,
    restaurant,
    updateRestaurant,
  };
};
