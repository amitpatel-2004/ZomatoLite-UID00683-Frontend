import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { Button, Empty, message, Spin, Typography } from 'antd';

import { ArrowLeftOutlined } from '@ant-design/icons';
import { ROUTES } from '@constants/route.constants';
import { BUTTON_TYPES, SPIN_SIZES, TITLE_LEVELS } from '@constants/style.constants';
import { OrderCard } from '@pages/restaurants/components/OrderCard';
import { DISPLAY } from '@pages/restaurants/constants/display.constants';
import { MESSAGES } from '@pages/restaurants/constants/messages.constants';
import { ORDER_STATUS } from '@pages/restaurants/constants/order.constants';
import { useRestaurant } from '@pages/restaurants/hooks/useRestaurant';
import { useRestaurantOrders } from '@pages/restaurants/hooks/useRestaurantOrders';
import type { Order, OrderStatus } from '@pages/restaurants/types/order.types';
import { getAuthUser } from '@redux/authStore';

import './RestaurantOrdersContainer.scss';

const { Text, Title } = Typography;

const getNextActions = (status: OrderStatus): { label: string; nextStatus: OrderStatus }[] => {
  switch (status) {
    case ORDER_STATUS.PENDING:
      return [
        { label: DISPLAY.ACTIONS.ACCEPT, nextStatus: ORDER_STATUS.ACCEPTED },
        { label: DISPLAY.ACTIONS.REJECT, nextStatus: ORDER_STATUS.REJECTED },
      ];
    case ORDER_STATUS.ACCEPTED:
      return [{ label: DISPLAY.ACTIONS.MARK_PREPARING, nextStatus: ORDER_STATUS.PREPARING }];
    case ORDER_STATUS.PREPARING:
      return [
        { label: DISPLAY.ACTIONS.MARK_OUT_FOR_DELIVERY, nextStatus: ORDER_STATUS.OUT_FOR_DELIVERY },
      ];
    case ORDER_STATUS.OUT_FOR_DELIVERY:
      return [{ label: DISPLAY.ACTIONS.MARK_DELIVERED, nextStatus: ORDER_STATUS.DELIVERED }];
    default:
      return [];
  }
};

export const RestaurantOrdersContainer = (): React.JSX.Element => {
  const { id: restaurantId = '' } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const user = useSelector(getAuthUser);

  const { isLoading: isRestaurantLoading, restaurant } = useRestaurant(restaurantId);
  const isOwner = !!user && !!restaurant && restaurant.ownerId === user._id;

  const { error, isLoading, orders, updateStatus } = useRestaurantOrders(
    restaurantId,
    restaurant?.name ?? '',
  );

  useEffect(() => {
    if (error) void message.error(error);
  }, [error]);

  const handleStatusChange = async (orderId: string, next: OrderStatus) => {
    try {
      await updateStatus(orderId, next);
      void message.success(MESSAGES.SUCCESS.ORDER_STATUS_UPDATED);
    } catch (err) {
      const msg = err instanceof Error ? err.message : MESSAGES.ERRORS.ORDER_STATUS_UPDATE_FAILED;
      void message.error(msg);
    }
  };

  if (isRestaurantLoading) {
    return (
      <div className="restaurant-orders-container__loading">
        <Spin size={SPIN_SIZES.LARGE} />
      </div>
    );
  }

  if (!restaurant || !isOwner) {
    return (
      <div className="restaurant-orders-container__error">
        <Title level={TITLE_LEVELS.SUBHEADING}>{MESSAGES.ERRORS.FETCH_FAILED}</Title>
      </div>
    );
  }

  return (
    <div className="restaurant-orders-container">
      <div className="restaurant-orders-container__nav">
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => {
            return navigate(ROUTES.RESTAURANT.DETAIL(restaurantId));
          }}
          type={BUTTON_TYPES.TEXT}
        >
          {DISPLAY.ACTIONS.BACK}
        </Button>
      </div>

      <Title level={TITLE_LEVELS.HEADING}>{DISPLAY.TITLES.RESTAURANT_ORDERS}</Title>
      <Text className="typography__body typography--secondary">{restaurant.name}</Text>

      {isLoading && (
        <div className="restaurant-orders-container__loading">
          <Spin size={SPIN_SIZES.LARGE} />
        </div>
      )}

      {!isLoading && orders.length === 0 && <Empty description={DISPLAY.EMPTY.NO_ORDERS} />}

      {!isLoading && orders.length > 0 && (
        <div className="restaurant-orders-container__list">
          {orders.map((order: Order) => {
            const nextActions = getNextActions(order.status);

            return (
              <OrderCard
                actions={nextActions.map((action) => {
                  return (
                    <Button
                      key={action.nextStatus}
                      onClick={() => {
                        return void handleStatusChange(order._id, action.nextStatus);
                      }}
                      type={BUTTON_TYPES.PRIMARY}
                    >
                      {action.label}
                    </Button>
                  );
                })}
                key={order._id}
                order={order}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
