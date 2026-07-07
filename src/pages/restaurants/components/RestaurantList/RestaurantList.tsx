import React from 'react';

import { Empty, Spin } from 'antd';

import { SPIN_SIZES } from '@constants/style.constants';
import { useInfiniteScroll } from '@hooks/useInfiniteScroll';
import { RestaurantCard } from '@pages/restaurants/components/RestaurantCard';

import type { RestaurantListProps } from './RestaurantList.types';

import './RestaurantList.scss';

export const RestaurantList = (props: RestaurantListProps): React.JSX.Element => {
  const {
    currentUserId,
    isLoading,
    isFetching,
    hasMore,
    items,
    onCardClick,
    onLoadMore,
    emptyText,
  } = props;
  const sentinelRef = useInfiniteScroll({ hasMore, isFetching, onLoadMore });

  if (isLoading) {
    return (
      <div className="restaurant-list__loading">
        <Spin size={SPIN_SIZES.LARGE} />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="restaurant-list__empty">
        <Empty description={emptyText} />
      </div>
    );
  }

  return (
    <div className="restaurant-list">
      {items.map((restaurant) => {
        return (
          <RestaurantCard
            isOwnRestaurant={Boolean(currentUserId) && restaurant.ownerId === currentUserId}
            key={restaurant._id}
            onClick={onCardClick}
            restaurant={restaurant}
          />
        );
      })}

      <div ref={sentinelRef} />

      {isFetching && (
        <div className="restaurant-list__fetching">
          <Spin size={SPIN_SIZES.SMALL} />
        </div>
      )}
    </div>
  );
};
