import { useCallback, useEffect } from 'react';

import { useSelector } from 'react-redux';

import type { Restaurant } from '@appTypes/restaurant.types';
import { MESSAGES } from '@pages/restaurants/constants/messages.constants';
import type { UpdateRestaurantPayload } from '@services/restaurantService';
import { restaurantService } from '@services/restaurantService';
import { useAppDispatch } from '@store/hooks';
import {
  restaurantDeleted,
  restaurantFetched,
  restaurantFetchFailed,
  restaurantUpdated,
  selectCurrentRestaurant,
  selectIsRestaurantsLoading,
  selectRestaurantsError,
} from '@store/restaurant';

export const useRestaurantDetail = (restaurantId: string) => {
  const dispatch = useAppDispatch();
  const restaurant = useSelector(selectCurrentRestaurant);
  const isLoading = useSelector(selectIsRestaurantsLoading);
  const error = useSelector(selectRestaurantsError);

  const fetchRestaurant = useCallback(async () => {
    try {
      const result = await restaurantService.getById(restaurantId);
      dispatch(restaurantFetched(result));
    } catch {
      dispatch(restaurantFetchFailed(MESSAGES.ERRORS.FETCH_FAILED));
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
