import type { RootState } from '@store/rootReducer';

export const selectMenuItems = (state: RootState) => state.menuItems.items;
export const selectMenuItemsHasMore = (state: RootState) => state.menuItems.hasMore;
export const selectMenuItemsNextCursor = (state: RootState) => state.menuItems.nextCursor;
export const selectIsMenuItemsLoading = (state: RootState) => state.menuItems.isLoading;
export const selectIsMenuItemsFetching = (state: RootState) => state.menuItems.isFetching;
export const selectMenuItemsError = (state: RootState) => state.menuItems.error;
