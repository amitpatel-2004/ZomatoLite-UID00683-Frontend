import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Button, message, Typography } from 'antd';

import { ROUTES } from '@constants/route.constants';
import { BUTTON_TYPES, TITLE_LEVELS } from '@constants/style.constants';
import { isConflictError } from '@core/api/apiError';
import { DISPLAY } from '@pages/dashboard/constants/display.constants';
import { MESSAGES } from '@pages/dashboard/constants/messages.constants';
import { useOwnerRestaurants } from '@pages/dashboard/hooks/useOwnerRestaurants';
import type { RestaurantFormValues } from '@pages/restaurants/components/RestaurantForm';
import { RestaurantForm } from '@pages/restaurants/components/RestaurantForm';
import { RestaurantList } from '@pages/restaurants/components/RestaurantList';

import './DashboardContainer.scss';

const { Title } = Typography;

export const DashboardContainer = (): React.JSX.Element => {
  const navigate = useNavigate();
  const { createRestaurant, fetchMore, hasMore, isFetching, isLoading, items } =
    useOwnerRestaurants();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = async (
    values: RestaurantFormValues,
    setFieldError: (field: string, message: string) => void,
  ) => {
    setIsSubmitting(true);
    try {
      await createRestaurant(values);
      void message.success(MESSAGES.SUCCESS.RESTAURANT_CREATED);
      setIsFormOpen(false);
    } catch (error) {
      if (isConflictError(error)) {
        setFieldError('name', error.message);
      } else {
        const msg = error instanceof Error ? error.message : MESSAGES.ERRORS.CREATE_FAILED;
        void message.error(msg);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCardClick = (id: string) => {
    navigate(ROUTES.RESTAURANT.DETAIL(id));
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-container__header">
        <Title level={TITLE_LEVELS.HEADING}>{DISPLAY.TITLES.DASHBOARD}</Title>
        <Button
          onClick={() => {
            return setIsFormOpen(true);
          }}
          type={BUTTON_TYPES.PRIMARY}
        >
          {DISPLAY.ACTIONS.ADD_RESTAURANT}
        </Button>
      </div>

      <RestaurantList
        emptyText={DISPLAY.OTHERS.NO_RESTAURANTS}
        hasMore={hasMore}
        isFetching={isFetching}
        isLoading={isLoading}
        items={items}
        onCardClick={handleCardClick}
        onLoadMore={fetchMore}
      />

      <RestaurantForm
        handleSubmit={handleCreate}
        initialValues={null}
        isSubmitting={isSubmitting}
        onClose={() => {
          return setIsFormOpen(false);
        }}
        open={isFormOpen}
      />
    </div>
  );
};
