import type { ApiListResponse, ApiSingleResponse, PaginatedResult } from '@appTypes/common.types';
import type { Restaurant } from '@appTypes/restaurant.types';
import { API_ENDPOINTS } from '@constants/api.constants';
import { apiClient } from '@core/api/apiClient';

export type CreateRestaurantPayload = {
  name: string;
  description: string;
  cuisineTypes: string[];
  openingTime: string;
  closingTime: string;
};

export type UpdateRestaurantPayload = Partial<CreateRestaurantPayload>;

export const restaurantService = {
  listMine: async (limit = 20, after?: string): Promise<PaginatedResult<Restaurant>> => {
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
    const { data } = await apiClient.get<ApiSingleResponse<Restaurant>>(
      API_ENDPOINTS.RESTAURANTS.byId(id),
    );
    return data.data;
  },

  create: async (payload: CreateRestaurantPayload): Promise<Restaurant> => {
    const { data } = await apiClient.post<ApiSingleResponse<Restaurant>>(
      API_ENDPOINTS.RESTAURANTS.BASE,
      payload,
    );
    return data.data;
  },

  update: async (id: string, payload: UpdateRestaurantPayload): Promise<Restaurant> => {
    const { data } = await apiClient.patch<ApiSingleResponse<Restaurant>>(
      API_ENDPOINTS.RESTAURANTS.byId(id),
      payload,
    );
    return data.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(API_ENDPOINTS.RESTAURANTS.byId(id));
  },
};
