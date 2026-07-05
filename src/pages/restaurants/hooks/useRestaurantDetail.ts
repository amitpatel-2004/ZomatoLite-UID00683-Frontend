import { useCallback, useEffect } from 'react';

import { useSelector } from 'react-redux';

import { MESSAGES } from '@pages/restaurants/constants/messages.constants';
import {
  getCurrentRestaurant,
  getIsRestaurantsLoading,
  getRestaurantsError,
  restaurantDeleted,
  restaurantDetailRequested,
  restaurantFetched,
  restaurantFetchFailed,
  restaurantUpdated,
} from '@pages/restaurants/store/restaurantStore';
import type { Restaurant } from '@pages/restaurants/types/restaurant.types';
import { restaurantService } from '@services/restaurant/restaurantService';
import type { UpdateRestaurantPayload } from '@services/restaurant/restaurantService.types';
import { useAppDispatch } from '@store/hooks';

export const useRestaurantDetail = (restaurantId: string) => {
  const dispatch = useAppDispatch();
  const restaurant = useSelector(getCurrentRestaurant);
  const isLoading = useSelector(getIsRestaurantsLoading);
  const error = useSelector(getRestaurantsError);

  const fetchRestaurant = useCallback(async () => {
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
    fetchRestaurant();
  }, [fetchRestaurant]);

  const updateRestaurant = async (payload: UpdateRestaurantPayload): Promise<Restaurant> => {
    const result = await restaurantService.update(restaurantId, payload);
    dispatch(restaurantUpdated(result));
    return result;
  };

  const deleteRestaurant = async (): Promise<void> => {
    await restaurantService.delete(restaurantId);
    dispatch(restaurantDeleted(restaurantId));
  };

  return { deleteRestaurant, error, isLoading, restaurant, updateRestaurant };
};
