import React from 'react';

import { Spin, Typography } from 'antd';

import { SPIN_SIZES } from '@constants/style.constants';
import { RestaurantCard } from '@pages/owner/components/RestaurantCard';
import { DISPLAY } from '@pages/owner/constants/display.constants';

import type { RestaurantListProps } from './RestaurantList.types';

import './RestaurantList.scss';

const { Text } = Typography;

export const RestaurantList = (props: RestaurantListProps): React.JSX.Element => {
  const { isLoading, isFetching, items, onCardClick, sentinelRef } = props;

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
        <Text type="secondary">{DISPLAY.EMPTY.NO_RESTAURANTS}</Text>
      </div>
    );
  }

  return (
    <div className="restaurant-list">
      {items.map((restaurant) => (
        <RestaurantCard key={restaurant._id} onClick={onCardClick} restaurant={restaurant} />
      ))}

      <div ref={sentinelRef} />

      {isFetching && (
        <div className="restaurant-list__fetching">
          <Spin size={SPIN_SIZES.SMALL} />
        </div>
      )}
    </div>
  );
};
