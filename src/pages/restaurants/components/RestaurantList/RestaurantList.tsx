import React from 'react';

import { InfiniteScrollList } from '@components/InfiniteScrollList';
import { RestaurantCard } from '@pages/restaurants/components/RestaurantCard';

import type { RestaurantListProps } from './RestaurantList.types';

export const RestaurantList = (props: RestaurantListProps): React.JSX.Element => {
  const { currentUserId, onCardClick, ...listProps } = props;

  return (
    <InfiniteScrollList
      {...listProps}
      renderItem={(restaurant) => {
        return (
          <RestaurantCard
            isOwnRestaurant={Boolean(currentUserId) && restaurant.ownerId === currentUserId}
            onClick={onCardClick}
            restaurant={restaurant}
          />
        );
      }}
    />
  );
};
