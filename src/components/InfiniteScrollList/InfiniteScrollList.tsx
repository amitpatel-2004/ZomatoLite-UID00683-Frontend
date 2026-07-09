import React from 'react';

import { Empty, Spin } from 'antd';

import { SPIN_SIZES } from '@constants/style.constants';
import { useInfiniteScroll } from '@hooks/useInfiniteScroll';

import type { InfiniteScrollListProps } from './InfiniteScrollList.types';

import './InfiniteScrollList.scss';

export const InfiniteScrollList = <T extends { _id: string }>(
  props: InfiniteScrollListProps<T>,
): React.JSX.Element => {
  const { emptyText, hasMore, isFetching, isLoading, items, onLoadMore, renderItem } = props;
  const sentinelRef = useInfiniteScroll({ hasMore, isFetching, onLoadMore });

  if (isLoading) {
    return (
      <div className="infinite-scroll-list__loading">
        <Spin size={SPIN_SIZES.LARGE} />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="infinite-scroll-list__empty">
        <Empty description={emptyText} />
      </div>
    );
  }

  return (
    <div className="infinite-scroll-list">
      {items.map((item) => {
        return <React.Fragment key={item._id}>{renderItem(item)}</React.Fragment>;
      })}

      <div className="infinite-scroll-list__sentinel" ref={sentinelRef} />

      {isFetching && (
        <div className="infinite-scroll-list__fetching">
          <Spin size={SPIN_SIZES.SMALL} />
        </div>
      )}
    </div>
  );
};
