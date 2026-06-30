import type { ApiListResponse, ApiSingleResponse, PaginatedResult } from '@appTypes/common.types';
import type { MenuItem } from '@appTypes/restaurant.types';
import { API_ENDPOINTS } from '@constants/api.constants';
import { apiClient } from '@core/api/apiClient';

export type CreateMenuItemPayload = {
  name: string;
  description: string;
  price: number;
  isVeg: boolean;
  quantity?: number | null;
  imagePath?: string | null;
};

export type UpdateMenuItemPayload = Partial<CreateMenuItemPayload>;

export type UploadUrlPayload = {
  fileName: string;
  contentType: string;
  fileSize: number;
};

export type UploadUrlResponse = {
  uploadUrl: string;
  imagePath: string;
};

export const menuItemService = {
  list: async (
    restaurantId: string,
    limit = 20,
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
    const { data } = await apiClient.post<ApiSingleResponse<MenuItem>>(
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
    const { data } = await apiClient.put<ApiSingleResponse<MenuItem>>(
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
    const { data } = await apiClient.post<ApiSingleResponse<UploadUrlResponse>>(
      API_ENDPOINTS.RESTAURANTS.menuItemImageUpload(restaurantId),
      payload,
    );
    return data.data;
  },

  uploadImage: async (uploadUrl: string, file: File): Promise<void> => {
    await fetch(uploadUrl, {
      method: 'PUT',
      body: file,
      headers: { 'Content-Type': file.type },
    });
  },
};
