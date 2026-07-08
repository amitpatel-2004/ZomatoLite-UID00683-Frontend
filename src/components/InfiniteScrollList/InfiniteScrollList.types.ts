import type { ReactNode } from 'react';

export type InfiniteScrollListProps<T extends { _id: string }> = {
  items: T[];
  isLoading: boolean;
  isFetching: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  emptyText: string;
  renderItem: (item: T) => ReactNode;
};
