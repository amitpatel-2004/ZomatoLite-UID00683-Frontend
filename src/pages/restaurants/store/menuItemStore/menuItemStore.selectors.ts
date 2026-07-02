import type { RootState } from '@store/index';

export const getMenuItems = (state: RootState) => {
  return state.menuItems.items;
};
export const getMenuItemsHasMore = (state: RootState) => {
  return state.menuItems.hasMore;
};
export const getMenuItemsNextCursor = (state: RootState) => {
  return state.menuItems.nextCursor;
};
export const getIsMenuItemsLoading = (state: RootState) => {
  return state.menuItems.isLoading;
};
export const getIsMenuItemsFetching = (state: RootState) => {
  return state.menuItems.isFetching;
};
export const getMenuItemsError = (state: RootState) => {
  return state.menuItems.error;
};
