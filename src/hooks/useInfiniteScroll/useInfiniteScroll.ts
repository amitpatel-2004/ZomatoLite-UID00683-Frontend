import { useEffect, useRef } from 'react';

import { DEFAULT_INFINITE_SCROLL_THRESHOLD } from './useInfiniteScroll.constants';
import type { UseInfiniteScrollParams } from './useInfiniteScroll.types';

export const useInfiniteScroll = (params: UseInfiniteScrollParams) => {
  const { hasMore, isFetching, onLoadMore, threshold = DEFAULT_INFINITE_SCROLL_THRESHOLD } = params;
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isFetching) {
          onLoadMore();
        }
      },
      { threshold },
    );

    observer.observe(sentinel);
    return () => {
      return observer.disconnect();
    };
  }, [hasMore, isFetching, onLoadMore, threshold]);

  return sentinelRef;
};
