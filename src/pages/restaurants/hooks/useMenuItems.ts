import { useCallback, useEffect } from 'react';

import { useSelector } from 'react-redux';

import type { MenuItem } from '@appTypes/restaurant.types';
import type { CreateMenuItemPayload, UpdateMenuItemPayload } from '@services/menuItemService';
import { menuItemService } from '@services/menuItemService';
import { useAppDispatch } from '@store/hooks';
import {
  menuItemCreated,
  menuItemDeleted,
  menuItemListAppended,
  menuItemListFailed,
  menuItemListFetchStarted,
  menuItemListLoaded,
  menuItemListRequested,
  menuItemsCleared,
  menuItemUpdated,
  selectIsMenuItemsFetching,
  selectIsMenuItemsLoading,
  selectMenuItems,
  selectMenuItemsHasMore,
  selectMenuItemsNextCursor,
} from '@store/menuItem';

export const useMenuItems = (restaurantId: string) => {
  const dispatch = useAppDispatch();
  const items = useSelector(selectMenuItems);
  const hasMore = useSelector(selectMenuItemsHasMore);
  const nextCursor = useSelector(selectMenuItemsNextCursor);
  const isLoading = useSelector(selectIsMenuItemsLoading);
  const isFetching = useSelector(selectIsMenuItemsFetching);

  const fetchInitial = useCallback(async () => {
    dispatch(menuItemListRequested());
    try {
      const result = await menuItemService.list(restaurantId);
      dispatch(menuItemListLoaded(result));
    } catch {
      dispatch(menuItemListFailed('Could not load menu items.'));
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
      const result = await menuItemService.list(restaurantId, 20, nextCursor);
      dispatch(menuItemListAppended(result));
    } catch {
      dispatch(menuItemListFailed('Could not load more menu items.'));
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
