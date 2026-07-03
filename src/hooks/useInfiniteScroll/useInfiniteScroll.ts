import { useEffect, useRef } from 'react';

import type { UseInfiniteScrollParams } from './useInfiniteScroll.types';

export const useInfiniteScroll = (params: UseInfiniteScrollParams) => {
  const { hasMore, isFetching, onLoadMore } = params;
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
      { threshold: 0.1 },
    );

    observer.observe(sentinel);
    return () => {
      return observer.disconnect();
    };
  }, [hasMore, isFetching, onLoadMore]);

  return sentinelRef;
};
