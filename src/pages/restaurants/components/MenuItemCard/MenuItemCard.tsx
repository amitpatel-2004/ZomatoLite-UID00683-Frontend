import React from 'react';

import { Button, Dropdown, Modal, Tooltip, Typography } from 'antd';

import { MinusOutlined, MoreOutlined, PlusOutlined } from '@ant-design/icons';
import { Rating } from '@components/Rating';
import { DEFAULT_CURRENCY } from '@constants/app.constants';
import { FIREBASE_BUCKETS } from '@constants/firebase.constants';
import { BUTTON_SHAPES, BUTTON_SIZES, BUTTON_TYPES } from '@constants/style.constants';
import { DESCRIPTION_MAX_ROWS, DISPLAY } from '@pages/restaurants/constants/display.constants';
import { SHOW_RATING } from '@pages/restaurants/constants/restaurant.constants';
import { getFileUrl } from '@utils/firebase';

import { getOwnerActions } from './MenuItemCard.config';
import type { MenuItemCardProps } from './MenuItemCard.types';

import './MenuItemCard.scss';

const { Text, Paragraph } = Typography;

export const MenuItemCard = (props: MenuItemCardProps): React.JSX.Element => {
  const { cartQuantity, isOwner, item, onAddToCart, onDecrement, onDelete, onEdit, onIncrement } =
    props;
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
          <Tooltip title={isVeg ? DISPLAY.FOOD_TYPE.VEG : DISPLAY.FOOD_TYPE.NON_VEG}>
            <span
              className={`menu-item-heading__food-type-dot menu-item-heading__food-type-dot--${isVeg ? DISPLAY.FOOD_TYPE.VEG : DISPLAY.FOOD_TYPE.NON_VEG}`}
            />
          </Tooltip>
          <Text
            className="menu-item-heading__name typography__display"
            ellipsis={{ tooltip: true }}
          >
            {name}
          </Text>
          {SHOW_RATING && <Rating emptyText={DISPLAY.EMPTY.NO_RATING} value={rating} />}
        </div>

        {description && (
          <Paragraph
            className="typography__body typography--secondary menu-item-body__description"
            ellipsis={{ rows: DESCRIPTION_MAX_ROWS, tooltip: true }}
          >
            {description}
          </Paragraph>
        )}

        <div className="menu-item-body__footer">
          <Text className="typography__accent">{`${DEFAULT_CURRENCY.symbol}${price.toFixed(2)}/-`}</Text>

          {isOwner && (
            <Dropdown menu={{ items: ownerActions }} trigger={['click']}>
              <Button icon={<MoreOutlined />} size={BUTTON_SIZES.MIDDLE} type={BUTTON_TYPES.TEXT} />
            </Dropdown>
          )}

          {!isOwner &&
            (cartQuantity > 0 ? (
              <div className="menu-item-body__stepper">
                <Button
                  icon={<MinusOutlined />}
                  onClick={() => {
                    return onDecrement(_id);
                  }}
                  shape={BUTTON_SHAPES.ICON}
                  size={BUTTON_SIZES.SMALL}
                />
                <Text className="menu-item-body__stepper-count">{cartQuantity}</Text>
                <Button
                  icon={<PlusOutlined />}
                  onClick={() => {
                    return onIncrement(_id);
                  }}
                  shape={BUTTON_SHAPES.ICON}
                  size={BUTTON_SIZES.SMALL}
                  type={BUTTON_TYPES.PRIMARY}
                />
              </div>
            ) : (
              <Button
                onClick={() => {
                  return onAddToCart(item);
                }}
                size={BUTTON_SIZES.SMALL}
                type={BUTTON_TYPES.PRIMARY}
              >
                {DISPLAY.ACTIONS.ADD_TO_CART}
              </Button>
            ))}
        </div>
      </div>
    </div>
  );
};
