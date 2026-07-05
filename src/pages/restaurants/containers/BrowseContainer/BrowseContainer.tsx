import React from 'react';

import { useNavigate } from 'react-router-dom';

import { Typography } from 'antd';

import { ROUTES } from '@constants/route.constants';
import { TITLE_LEVELS } from '@constants/style.constants';
import { RestaurantList } from '@pages/restaurants/components/RestaurantList';
import { DISPLAY } from '@pages/restaurants/constants/display.constants';
import { useBrowseRestaurants } from '@pages/restaurants/hooks/useBrowseRestaurants';

import './BrowseContainer.scss';

const { Title } = Typography;

export const BrowseContainer = (): React.JSX.Element => {
  const navigate = useNavigate();
  const { fetchMore, hasMore, isFetching, isLoading, items } = useBrowseRestaurants();

  const handleCardClick = (id: string) => {
    navigate(ROUTES.RESTAURANT.DETAIL(id));
  };

  return (
    <div className="browse-container">
      <Title level={TITLE_LEVELS.HEADING}>{DISPLAY.TITLES.BROWSE}</Title>

      <RestaurantList
        emptyText={DISPLAY.EMPTY.NO_RESTAURANTS}
        hasMore={hasMore}
        isFetching={isFetching}
        isLoading={isLoading}
        items={items}
        onCardClick={handleCardClick}
        onLoadMore={fetchMore}
      />
    </div>
  );
};
