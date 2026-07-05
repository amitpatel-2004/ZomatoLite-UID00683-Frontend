import axios from 'axios';

import type { ApiEntityResponse, ApiListResponse, PaginatedResult } from '@appTypes/common.types';
import { API_ENDPOINTS, DEFAULT_PAGE_LIMIT } from '@constants/api.constants';
import { apiClient } from '@core/api/apiClient';
import type { MenuItem } from '@pages/restaurants/types/restaurant.types';

import type {
  CreateMenuItemPayload,
  UpdateMenuItemPayload,
  UploadUrlPayload,
  UploadUrlResponse,
} from './menuItemService.types';

export const menuItemService = {
  list: async (
    restaurantId: string,
    limit = DEFAULT_PAGE_LIMIT,
    after?: string,
  ): Promise<PaginatedResult<MenuItem>> => {
    const params: Record<string, string | number> = { limit };
    if (after) params.after = after;
    const { data } = await apiClient.get<ApiListResponse<MenuItem>>(
      API_ENDPOINTS.RESTAURANTS.menuItems(restaurantId),
      { params },
    );
    return data.data;
  },

  create: async (restaurantId: string, payload: CreateMenuItemPayload): Promise<MenuItem> => {
    const { data } = await apiClient.post<ApiEntityResponse<MenuItem>>(
      API_ENDPOINTS.RESTAURANTS.menuItems(restaurantId),
      payload,
    );
    return data.data;
  },

  update: async (
    restaurantId: string,
    menuItemId: string,
    payload: UpdateMenuItemPayload,
  ): Promise<MenuItem> => {
    const { data } = await apiClient.patch<ApiEntityResponse<MenuItem>>(
      API_ENDPOINTS.RESTAURANTS.menuItemById(restaurantId, menuItemId),
      payload,
    );
    return data.data;
  },

  delete: async (restaurantId: string, menuItemId: string): Promise<void> => {
    await apiClient.delete(API_ENDPOINTS.RESTAURANTS.menuItemById(restaurantId, menuItemId));
  },

  getUploadUrl: async (
    restaurantId: string,
    payload: UploadUrlPayload,
  ): Promise<UploadUrlResponse> => {
    const { data } = await apiClient.post<ApiEntityResponse<UploadUrlResponse>>(
      API_ENDPOINTS.RESTAURANTS.menuItemImageUpload(restaurantId),
      payload,
    );
    return data.data;
  },

  uploadImage: async (uploadUrl: string, file: File): Promise<void> => {
    await axios.put(uploadUrl, file, { headers: { 'Content-Type': file.type } });
  },
};
