import React from 'react';

import { Tag, Typography } from 'antd';

import { TITLE_LEVELS } from '@constants/style.constants';
import { DISPLAY } from '@pages/restaurants/constants/display.constants';
import { ORDER_STATUS_TAG_COLORS } from '@pages/restaurants/constants/order.constants';

import type { OrderCardProps } from './OrderCard.types';

import './OrderCard.scss';

const { Text, Title } = Typography;

export const OrderCard = (props: OrderCardProps): React.JSX.Element => {
  const { actions, order, showRestaurantName } = props;

  return (
    <div className="order-card">
      <div className="order-card__header">
        <div>
          {showRestaurantName && (
            <Text className="typography__caption typography--secondary">
              {order.restaurantName}
            </Text>
          )}
          <Title className="order-card__id" level={TITLE_LEVELS.LABEL}>
            {DISPLAY.LABELS.ORDER_ID} #{order._id.slice(-6)}
          </Title>
        </div>
        <Tag color={ORDER_STATUS_TAG_COLORS[order.status]}>
          {DISPLAY.LABELS.ORDER_STATUS[order.status]}
        </Tag>
      </div>

      <div className="order-card__items">
        {order.items.map((item) => {
          return (
            <div className="order-card__row" key={item.name}>
              <Text className="typography__body order-card__item-name">
                {item.name} x {item.quantity}
              </Text>
              <Text className="typography__body order-card__item-price">
                {order.currency.symbol}
                {(item.unitPrice * item.quantity).toFixed(2)}
              </Text>
            </div>
          );
        })}
      </div>

      <div className="order-card__footer">
        <Text className="typography__label">{DISPLAY.LABELS.TOTAL}</Text>
        <Text className="typography__accent">
          {order.currency.symbol}
          {order.pricingSummary.total.toFixed(2)}
        </Text>
      </div>

      {actions && <div className="order-card__actions">{actions}</div>}
    </div>
  );
};
