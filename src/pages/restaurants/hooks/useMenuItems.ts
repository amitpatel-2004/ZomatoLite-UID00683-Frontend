import { useCallback, useEffect } from 'react';

import { useSelector } from 'react-redux';

import { DEFAULT_PAGE_LIMIT } from '@constants/api.constants';
import { MESSAGES } from '@pages/restaurants/constants/messages.constants';
import {
  getIsMenuItemsFetching,
  getIsMenuItemsLoading,
  getMenuItems,
  getMenuItemsHasMore,
  getMenuItemsNextCursor,
  menuItemCreated,
  menuItemDeleted,
  menuItemListAppended,
  menuItemListFailed,
  menuItemListFetchStarted,
  menuItemListLoaded,
  menuItemListRequested,
  menuItemsCleared,
  menuItemUpdated,
} from '@pages/restaurants/store/menuItemStore';
import type { MenuItem } from '@pages/restaurants/types/restaurant.types';
import { menuItemService } from '@services/restaurant/menuItemService';
import type {
  CreateMenuItemPayload,
  UpdateMenuItemPayload,
} from '@services/restaurant/menuItemService.types';
import { useAppDispatch } from '@store/hooks';

export const useMenuItems = (restaurantId: string) => {
  const dispatch = useAppDispatch();
  const items = useSelector(getMenuItems);
  const hasMore = useSelector(getMenuItemsHasMore);
  const nextCursor = useSelector(getMenuItemsNextCursor);
  const isLoading = useSelector(getIsMenuItemsLoading);
  const isFetching = useSelector(getIsMenuItemsFetching);

  const fetchInitial = useCallback(async () => {
    dispatch(menuItemListRequested());
    try {
      const result = await menuItemService.list(restaurantId);
      dispatch(menuItemListLoaded(result));
    } catch (error) {
      const msg = error instanceof Error ? error.message : MESSAGES.ERRORS.MENU_LOAD_FAILED;
      dispatch(menuItemListFailed(msg));
    }
  }, [dispatch, restaurantId]);

  useEffect(() => {
    fetchInitial();
    return () => {
      dispatch(menuItemsCleared());
    };
  }, [fetchInitial, dispatch]);

  const fetchMore = useCallback(async () => {
    if (!hasMore || isFetching || !nextCursor) return;
    dispatch(menuItemListFetchStarted());
    try {
      const result = await menuItemService.list(restaurantId, DEFAULT_PAGE_LIMIT, nextCursor);
      dispatch(menuItemListAppended(result));
    } catch (error) {
      const msg = error instanceof Error ? error.message : MESSAGES.ERRORS.MENU_MORE_FAILED;
      dispatch(menuItemListFailed(msg));
    }
  }, [dispatch, hasMore, isFetching, nextCursor, restaurantId]);

  const createMenuItem = async (payload: CreateMenuItemPayload): Promise<MenuItem> => {
    const result = await menuItemService.create(restaurantId, payload);
    dispatch(menuItemCreated(result));
    return result;
  };

  const updateMenuItem = async (
    menuItemId: string,
    payload: UpdateMenuItemPayload,
  ): Promise<MenuItem> => {
    const result = await menuItemService.update(restaurantId, menuItemId, payload);
    dispatch(menuItemUpdated(result));
    return result;
  };

  const deleteMenuItem = async (menuItemId: string): Promise<void> => {
    await menuItemService.delete(restaurantId, menuItemId);
    dispatch(menuItemDeleted(menuItemId));
  };

  return {
    createMenuItem,
    deleteMenuItem,
    fetchMore,
    hasMore,
    isFetching,
    isLoading,
    items,
    updateMenuItem,
  };
};
