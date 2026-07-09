import React, { useState } from 'react';

import { Button, Popconfirm, Space, Tag, Typography } from 'antd';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Rating } from '@components/Rating';
import {
  BUTTON_TYPES,
  POPCONFIRM_PLACEMENT,
  TAG_COLORS,
  TITLE_LEVELS,
} from '@constants/style.constants';
import { CuisineTags } from '@pages/restaurants/components/CuisineTags';
import { DISPLAY } from '@pages/restaurants/constants/display.constants';
import { RESTAURANT_STATUS, SHOW_RATING } from '@pages/restaurants/constants/restaurant.constants';
import { formatTo12Hour } from '@utils/time';

import type { RestaurantDetailsProps } from './RestaurantDetails.types';

import './RestaurantDetails.scss';

const { Text, Title } = Typography;

export const RestaurantDetails = (props: RestaurantDetailsProps): React.JSX.Element => {
  const { isOwner, onDelete, onEdit, onGoToOrders, restaurant } = props;
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
      <div className="restaurant-header">
        <div className="restaurant-heading">
          <Title
            className="restaurant-heading__name"
            ellipsis={{ tooltip: true }}
            level={TITLE_LEVELS.HEADING}
          >
            {name}
          </Title>
          <Tag
            className="restaurant-heading__status"
            color={status === RESTAURANT_STATUS.ACTIVE ? TAG_COLORS.ACTIVE : TAG_COLORS.INACTIVE}
          >
            {status}
          </Tag>
        </div>

        {isOwner && (
          <Space className="restaurant-header__actions">
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
            <Button onClick={onGoToOrders} type={BUTTON_TYPES.DEFAULT}>
              {DISPLAY.ACTIONS.GO_TO_ORDERS}
            </Button>
          </Space>
        )}
      </div>

      {description && (
        <Text className="restaurant-details__description typography__body">{description}</Text>
      )}

      <div className="restaurant-meta">
        {cuisineTypes.length > 0 && <CuisineTags cuisineTypes={cuisineTypes} />}

        <div className="restaurant-highlights">
          {SHOW_RATING && <Rating emptyText={DISPLAY.EMPTY.NO_RATING} value={rating} />}
          <Text className="typography__caption typography--secondary restaurant-highlights__hours">
            {DISPLAY.LABELS.OPENS}: {formatTo12Hour(openingTime)} - {formatTo12Hour(closingTime)}
          </Text>
        </div>
      </div>
    </div>
  );
};
