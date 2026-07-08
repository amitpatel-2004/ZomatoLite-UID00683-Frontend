import React from 'react';

import { Card, Tag, Typography } from 'antd';

import { Rating } from '@components/Rating';
import { TAG_COLORS, TITLE_LEVELS } from '@constants/style.constants';
import { CuisineTags } from '@pages/restaurants/components/CuisineTags';
import { DISPLAY } from '@pages/restaurants/constants/display.constants';
import { RESTAURANT_STATUS } from '@pages/restaurants/constants/restaurant.constants';
import { formatTo12Hour } from '@utils/time';

import type { RestaurantCardProps } from './RestaurantCard.types';

import './RestaurantCard.scss';

const { Text, Title } = Typography;

export const RestaurantCard = (props: RestaurantCardProps): React.JSX.Element => {
  const { restaurant, onClick } = props;
  const { _id, cuisineTypes, description, name, openingTime, closingTime, rating, status } =
    restaurant;

  return (
    <Card
      className="restaurant-card"
      hoverable
      onClick={() => {
        return onClick(_id);
      }}
    >
      <div className="restaurant-card-summary">
        <div className="restaurant-card-heading">
          <Title
            className="restaurant-card-heading__name typography__heading"
            ellipsis={{ tooltip: true }}
            level={TITLE_LEVELS.LABEL}
          >
            {name}
          </Title>
          <Tag
            className="restaurant-card-heading__status"
            color={status === RESTAURANT_STATUS.ACTIVE ? TAG_COLORS.ACTIVE : TAG_COLORS.INACTIVE}
          >
            {status}
          </Tag>
        </div>

        <Rating emptyText={DISPLAY.EMPTY.NO_RATING} value={rating} />
      </div>

      {description && (
        <Text
          className="typography__meta typography--secondary restaurant-card__description"
          ellipsis={{ tooltip: true }}
        >
          {description}
        </Text>
      )}

      <div className="restaurant-card-meta">
        <CuisineTags cuisineTypes={cuisineTypes} />

        <Text className="typography__caption typography--secondary restaurant-card-meta__time">
          {DISPLAY.LABELS.OPENS}: {formatTo12Hour(openingTime)} - {formatTo12Hour(closingTime)}
        </Text>
      </div>
    </Card>
  );
};
