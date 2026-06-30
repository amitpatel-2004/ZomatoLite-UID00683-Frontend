import React from 'react';

import { Card, Tag, Typography } from 'antd';

import { StarFilled } from '@ant-design/icons';
import { RESTAURANT_STATUS } from '@constants/restaurant.constants';
import { TAG_COLORS, TITLE_LEVELS } from '@constants/style.constants';
import { DISPLAY } from '@pages/restaurants/constants/display.constants';
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
      <div className="restaurant-card__top">
        <div className="restaurant-card__title-row">
          <Title
            className="restaurant-card__name typography__heading"
            ellipsis={{ tooltip: true }}
            level={TITLE_LEVELS.LABEL}
          >
            {name}
          </Title>
          <Tag
            className="restaurant-card__status-tag"
            color={status === RESTAURANT_STATUS.ACTIVE ? TAG_COLORS.ACTIVE : TAG_COLORS.INACTIVE}
          >
            {status}
          </Tag>
        </div>

        <span className="restaurant-card__rating">
          <StarFilled className="restaurant-card__star" />
          <Text className="typography__meta">
            {rating > 0 ? rating.toFixed(1) : DISPLAY.EMPTY.NO_RATING}
          </Text>
        </span>
      </div>

      {description && (
        <Text
          className="typography__meta typography--secondary restaurant-card__description"
          ellipsis={{ tooltip: true }}
        >
          {description}
        </Text>
      )}

      <div className="restaurant-card__bottom">
        <div className="restaurant-card__cuisine-row">
          {cuisineTypes.map((c) => {
            return (
              <Tag className="restaurant-card__cuisine-tag" key={c}>
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </Tag>
            );
          })}
        </div>

        <Text className="typography__caption typography--secondary restaurant-card__time">
          {DISPLAY.LABELS.OPENS}: {formatTo12Hour(openingTime)} - {formatTo12Hour(closingTime)}
        </Text>
      </div>
    </Card>
  );
};
