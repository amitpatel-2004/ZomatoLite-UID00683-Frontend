import React, { useEffect } from 'react';

import { Button, Empty, message, Popconfirm, Spin, Typography } from 'antd';

import {
  BUTTON_TYPES,
  POPCONFIRM_PLACEMENT,
  SPIN_SIZES,
  TITLE_LEVELS,
} from '@constants/style.constants';
import { OrderCard } from '@pages/restaurants/components/OrderCard';
import { DISPLAY } from '@pages/restaurants/constants/display.constants';
import { MESSAGES } from '@pages/restaurants/constants/messages.constants';
import { ORDER_STATUS } from '@pages/restaurants/constants/order.constants';
import { useMyOrders } from '@pages/restaurants/hooks/useMyOrders';
import type { Order } from '@pages/restaurants/types/order.types';

import './MyOrdersContainer.scss';

const { Title } = Typography;

export const MyOrdersContainer = (): React.JSX.Element => {
  const { cancelOrder, error, isLoading, orders } = useMyOrders();

  useEffect(() => {
    if (error) void message.error(error);
  }, [error]);

  const handleCancel = async (order: Order) => {
    try {
      await cancelOrder(order);
      void message.success(MESSAGES.SUCCESS.ORDER_CANCELLED);
    } catch (err) {
      const msg = err instanceof Error ? err.message : MESSAGES.ERRORS.ORDER_CANCEL_FAILED;
      void message.error(msg);
    }
  };

  return (
    <div className="my-orders-container">
      <Title level={TITLE_LEVELS.HEADING}>{DISPLAY.TITLES.MY_ORDERS}</Title>

      {isLoading && (
        <div className="my-orders-container__loading">
          <Spin size={SPIN_SIZES.LARGE} />
        </div>
      )}

      {!isLoading && orders.length === 0 && <Empty description={DISPLAY.EMPTY.NO_ORDERS} />}

      {!isLoading && orders.length > 0 && (
        <div className="my-orders-container__list">
          {orders.map((order) => {
            const canCancel = order.status === ORDER_STATUS.PENDING;

            return (
              <OrderCard
                actions={
                  canCancel && (
                    <Popconfirm
                      cancelText={DISPLAY.POPCONFIRM.CANCEL_TEXT}
                      okText={DISPLAY.POPCONFIRM.OK_TEXT}
                      okType="danger"
                      onConfirm={() => {
                        return void handleCancel(order);
                      }}
                      placement={POPCONFIRM_PLACEMENT.TOP_RIGHT}
                      title={DISPLAY.POPCONFIRM.CANCEL_ORDER_TITLE}
                    >
                      <Button danger type={BUTTON_TYPES.DEFAULT}>
                        {DISPLAY.ACTIONS.CANCEL_ORDER}
                      </Button>
                    </Popconfirm>
                  )
                }
                key={order._id}
                order={order}
                showRestaurantName
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
