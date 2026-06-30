import type { MenuItemState } from './menuItemSlice.types';

export const initialState: MenuItemState = {
  items: [],
  hasMore: false,
  nextCursor: null,
  isLoading: false,
  isFetching: false,
  error: null,
};
