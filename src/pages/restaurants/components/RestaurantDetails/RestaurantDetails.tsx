import React, { useState } from 'react';

import { Button, Popconfirm, Space, Tag, Typography } from 'antd';

import { DeleteOutlined, EditOutlined, StarFilled } from '@ant-design/icons';
import { RESTAURANT_STATUS } from '@constants/restaurant.constants';
import {
  BUTTON_TYPES,
  POPCONFIRM_PLACEMENT,
  TAG_COLORS,
  TITLE_LEVELS,
} from '@constants/style.constants';
import { DISPLAY } from '@pages/restaurants/constants/display.constants';
import { formatTo12Hour } from '@utils/time';

import type { RestaurantDetailsProps } from './RestaurantDetails.types';

import './RestaurantDetails.scss';

const { Text, Title } = Typography;

export const RestaurantDetails = (props: RestaurantDetailsProps): React.JSX.Element => {
  const { isOwner, onDelete, onEdit, restaurant } = props;
  const { cuisineTypes, closingTime, description, name, openingTime, rating, status } = restaurant;
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete();
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="restaurant-details">
      <div className="restaurant-details__header">
        <div className="restaurant-details__title-row">
          <Title
            className="restaurant-details__title"
            ellipsis={{ tooltip: true }}
            level={TITLE_LEVELS.HEADING}
          >
            {name}
          </Title>
          <Tag
            className="restaurant-details__status-tag"
            color={status === RESTAURANT_STATUS.ACTIVE ? TAG_COLORS.ACTIVE : TAG_COLORS.INACTIVE}
          >
            {status}
          </Tag>
        </div>

        {isOwner && (
          <Space className="restaurant-details__actions">
            <Button icon={<EditOutlined />} onClick={onEdit} type={BUTTON_TYPES.DEFAULT}>
              {DISPLAY.ACTIONS.EDIT}
            </Button>

            <Popconfirm
              cancelText={DISPLAY.POPCONFIRM.CANCEL_TEXT}
              okText={DISPLAY.POPCONFIRM.OK_TEXT}
              okType="danger"
              onConfirm={handleDelete}
              placement={POPCONFIRM_PLACEMENT.TOP_RIGHT}
              title={DISPLAY.POPCONFIRM.DELETE_RESTAURANT_TITLE}
            >
              <Button
                danger
                icon={<DeleteOutlined />}
                loading={isDeleting}
                type={BUTTON_TYPES.DEFAULT}
              >
                {DISPLAY.ACTIONS.DELETE}
              </Button>
            </Popconfirm>
            <Button disabled>{DISPLAY.ACTIONS.GO_TO_ORDERS}</Button>
          </Space>
        )}
      </div>

      {description && (
        <Text className="restaurant-details__description typography__body">{description}</Text>
      )}

      <div className="restaurant-details__meta">
        {cuisineTypes.length > 0 && (
          <div className="restaurant-details__cuisine-row">
            {cuisineTypes.map((c) => (
              <Tag className="restaurant-details__cuisine-tag" key={c}>
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </Tag>
            ))}
          </div>
        )}

        <div className="restaurant-details__meta-right">
          <span className="restaurant-details__rating">
            <StarFilled className="restaurant-details__star" />
            <Text className="typography__meta">
              {rating > 0 ? rating.toFixed(1) : DISPLAY.EMPTY.NO_RATING}
            </Text>
          </span>
          <Text className="typography__caption typography--secondary">
            {DISPLAY.LABELS.OPENS}: {formatTo12Hour(openingTime)} - {formatTo12Hour(closingTime)}
          </Text>
        </div>
      </div>
    </div>
  );
};
