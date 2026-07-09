import type { ApiEntityResponse, ApiListResponse, PaginatedResult } from '@appTypes/common.types';
import { API_ENDPOINTS, DEFAULT_PAGE_LIMIT } from '@constants/api.constants';
import { apiClient } from '@core/api/apiClient';
import type { Restaurant } from '@pages/restaurants/types/restaurant.types';

import type { CreateRestaurantPayload, UpdateRestaurantPayload } from './restaurantService.types';

export const restaurantService = {
  list: async (
    limit = DEFAULT_PAGE_LIMIT,
    after?: string,
  ): Promise<PaginatedResult<Restaurant>> => {
    const params: Record<string, string | number> = { limit };
    if (after) params.after = after;
    const { data } = await apiClient.get<ApiListResponse<Restaurant>>(
      API_ENDPOINTS.RESTAURANTS.BASE,
      {
        params,
      },
    );
    return data.data;
  },

  listMine: async (
    limit = DEFAULT_PAGE_LIMIT,
    after?: string,
  ): Promise<PaginatedResult<Restaurant>> => {
    const params: Record<string, string | number> = { limit };
    if (after) params.after = after;
    const { data } = await apiClient.get<ApiListResponse<Restaurant>>(
      API_ENDPOINTS.RESTAURANTS.MINE,
      {
        params,
      },
    );
    return data.data;
  },

  getById: async (id: string): Promise<Restaurant> => {
    const { data } = await apiClient.get<ApiEntityResponse<Restaurant>>(
      API_ENDPOINTS.RESTAURANTS.byId(id),
    );
    return data.data;
  },

  create: async (payload: CreateRestaurantPayload): Promise<Restaurant> => {
    const { data } = await apiClient.post<ApiEntityResponse<Restaurant>>(
      API_ENDPOINTS.RESTAURANTS.BASE,
      payload,
    );
    return data.data;
  },

  update: async (id: string, payload: UpdateRestaurantPayload): Promise<Restaurant> => {
    const { data } = await apiClient.patch<ApiEntityResponse<Restaurant>>(
      API_ENDPOINTS.RESTAURANTS.byId(id),
      payload,
    );
    return data.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(API_ENDPOINTS.RESTAURANTS.byId(id));
  },
};
