import { useCallback, useEffect } from 'react';

import { useSelector } from 'react-redux';

import type { Restaurant } from '@appTypes/restaurant.types';
import type { CreateRestaurantPayload } from '@services/restaurantService';
import { restaurantService } from '@services/restaurantService';
import { useAppDispatch } from '@store/hooks';
import {
  restaurantCreated,
  restaurantDeleted,
  restaurantListAppended,
  restaurantListFailed,
  restaurantListFetchStarted,
  restaurantListLoaded,
  restaurantListRequested,
  selectIsRestaurantsFetching,
  selectIsRestaurantsLoading,
  selectRestaurants,
  selectRestaurantsHasMore,
  selectRestaurantsNextCursor,
} from '@store/restaurant';

export const useOwnerRestaurants = () => {
  const dispatch = useAppDispatch();
  const items = useSelector(selectRestaurants);
  const hasMore = useSelector(selectRestaurantsHasMore);
  const nextCursor = useSelector(selectRestaurantsNextCursor);
  const isLoading = useSelector(selectIsRestaurantsLoading);
  const isFetching = useSelector(selectIsRestaurantsFetching);

  const fetchInitial = useCallback(async () => {
    dispatch(restaurantListRequested());
    try {
      const result = await restaurantService.listMine();
      dispatch(restaurantListLoaded(result));
    } catch {
      dispatch(restaurantListFailed('Could not load your restaurants.'));
    }
  }, [dispatch]);

  useEffect(() => {
    fetchInitial();
  }, [fetchInitial]);

  const fetchMore = useCallback(async () => {
    if (!hasMore || isFetching || !nextCursor) return;
    dispatch(restaurantListFetchStarted());
    try {
      const result = await restaurantService.listMine(2, nextCursor);
      dispatch(restaurantListAppended(result));
    } catch {
      dispatch(restaurantListFailed('Could not load more restaurants.'));
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
