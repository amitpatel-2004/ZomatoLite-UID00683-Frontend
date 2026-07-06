import React, { useEffect, useState } from 'react';

import { Button, Empty, message, Popconfirm, Spin, Typography } from 'antd';

import {
  BUTTON_TYPES,
  POPCONFIRM_PLACEMENT,
  SPIN_SIZES,
  TITLE_LEVELS,
} from '@constants/style.constants';
import { OrderCard } from '@pages/restaurants/components/OrderCard';
import { OrderTrackingModal } from '@pages/restaurants/components/OrderTrackingModal';
import { DISPLAY } from '@pages/restaurants/constants/display.constants';
import { MESSAGES } from '@pages/restaurants/constants/messages.constants';
import { ORDER_STATUS } from '@pages/restaurants/constants/order.constants';
import { useMyOrders } from '@pages/restaurants/hooks/useMyOrders';
import { useOrderTracking } from '@pages/restaurants/hooks/useOrderTracking';
import type { Order } from '@pages/restaurants/types/order.types';

import './MyOrdersContainer.scss';

const { Title } = Typography;

export const MyOrdersContainer = (): React.JSX.Element => {
  const { cancelOrder, error, isLoading, orders } = useMyOrders();
  const [trackingOrderId, setTrackingOrderId] = useState<string | null>(null);
  const trackingOrder =
    orders.find((order) => {
      return order._id === trackingOrderId;
    }) ?? null;
  const tracking = useOrderTracking(trackingOrder);

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
                onTrack={(trackedOrder) => {
                  return setTrackingOrderId(trackedOrder._id);
                }}
                order={order}
                showRestaurantName
              />
            );
          })}
        </div>
      )}

      {trackingOrder && tracking && (
        <OrderTrackingModal
          onClose={() => {
            return setTrackingOrderId(null);
          }}
          order={trackingOrder}
          {...tracking}
        />
      )}
    </div>
  );
};
