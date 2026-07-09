import React from 'react';

import { Button, Dropdown, Modal, Typography } from 'antd';

import { MoreOutlined } from '@ant-design/icons';
import { Rating } from '@components/Rating';
import { DEFAULT_CURRENCY } from '@constants/app.constants';
import { FIREBASE_BUCKETS } from '@constants/firebase.constants';
import { BUTTON_SIZES, BUTTON_TYPES } from '@constants/style.constants';
import { DISPLAY } from '@pages/restaurants/constants/display.constants';
import { getFileUrl } from '@utils/firebase';

import { getOwnerActions } from './MenuItemCard.config';
import type { MenuItemCardProps } from './MenuItemCard.types';

import './MenuItemCard.scss';

const { Text } = Typography;

export const MenuItemCard = (props: MenuItemCardProps): React.JSX.Element => {
  const { isOwner, item, onDelete, onEdit } = props;
  const { _id, description, imagePath, isVeg, name, price, rating } = item;
  const imageUrl = getFileUrl(imagePath, FIREBASE_BUCKETS.IMAGE_UPLOAD_BUCKET);

  const handleDeleteClick = () => {
    Modal.confirm({
      cancelText: DISPLAY.POPCONFIRM.CANCEL_TEXT,
      okText: DISPLAY.POPCONFIRM.OK_TEXT,
      okType: 'danger',
      onOk: () => {
        return onDelete(_id);
      },
      title: DISPLAY.POPCONFIRM.DELETE_MENU_ITEM_TITLE,
    });
  };

  const ownerActions = getOwnerActions({ item, onEdit, onDeleteClick: handleDeleteClick });

  return (
    <div className="menu-item-card">
      {imageUrl && (
        <div className="menu-item-card__image-wrap">
          <img alt={name} className="menu-item-card__image" src={imageUrl} />
        </div>
      )}

      <div className="menu-item-body">
        <div className="menu-item-heading">
          <span
            className={`menu-item-heading__food-type-dot menu-item-heading__food-type-dot--${isVeg ? DISPLAY.FOOD_TYPE.VEG : DISPLAY.FOOD_TYPE.NON_VEG}`}
          />
          <Text
            className="menu-item-heading__name typography__display"
            ellipsis={{ tooltip: true }}
          >
            {name}
          </Text>
          <Rating emptyText={DISPLAY.EMPTY.NO_RATING} value={rating} />
        </div>

        {description && (
          <Text
            className="typography__meta typography--secondary menu-item-body__description"
            ellipsis={{ tooltip: true }}
          >
            {description}
          </Text>
        )}

        <div className="menu-item-body__footer">
          <Text className="typography__accent">{`${DEFAULT_CURRENCY.symbol}${price.toFixed(2)}/-`}</Text>

          {isOwner && (
            <Dropdown menu={{ items: ownerActions }} trigger={['click']}>
              <Button icon={<MoreOutlined />} size={BUTTON_SIZES.MIDDLE} type={BUTTON_TYPES.TEXT} />
            </Dropdown>
          )}
        </div>
      </div>
    </div>
  );
};
