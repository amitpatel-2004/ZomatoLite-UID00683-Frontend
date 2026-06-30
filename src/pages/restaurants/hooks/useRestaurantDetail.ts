import { useCallback, useEffect } from 'react';

import { useSelector } from 'react-redux';

import type { Restaurant } from '@appTypes/restaurant.types';
import { MESSAGES } from '@pages/restaurants/constants/messages.constants';
import {
  getCurrentRestaurant,
  getIsRestaurantsLoading,
  getRestaurantsError,
  restaurantDeleted,
  restaurantFetched,
  restaurantFetchFailed,
  restaurantUpdated,
} from '@pages/restaurants/store';
import type { UpdateRestaurantPayload } from '@services/restaurantService';
import { restaurantService } from '@services/restaurantService';
import { useAppDispatch } from '@store/hooks';

export const useRestaurantDetail = (restaurantId: string) => {
  const dispatch = useAppDispatch();
  const restaurant = useSelector(getCurrentRestaurant);
  const isLoading = useSelector(getIsRestaurantsLoading);
  const error = useSelector(getRestaurantsError);

  const fetchRestaurant = useCallback(async () => {
    try {
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
