export type UseInfiniteScrollParams = {
  hasMore: boolean;
  isFetching: boolean;
  onLoadMore: () => void;
  threshold?: number;
};
