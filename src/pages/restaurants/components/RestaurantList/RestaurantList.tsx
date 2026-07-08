import React from 'react';

import { InfiniteScrollList } from '@components/InfiniteScrollList';
import { RestaurantCard } from '@pages/restaurants/components/RestaurantCard';

import type { RestaurantListProps } from './RestaurantList.types';

export const RestaurantList = (props: RestaurantListProps): React.JSX.Element => {
  const { onCardClick, ...listProps } = props;

  return (
    <InfiniteScrollList
      {...listProps}
      renderItem={(restaurant) => {
        return <RestaurantCard onClick={onCardClick} restaurant={restaurant} />;
      }}
    />
  );
};
