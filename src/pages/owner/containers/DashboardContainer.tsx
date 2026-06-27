import React, { useEffect, useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Button, message, Typography } from 'antd';

import { ROUTES } from '@constants/route.constants';
import { BUTTON_TYPES, TITLE_LEVELS } from '@constants/style.constants';
import { RestaurantList } from '@pages/owner/components/RestaurantList';
import { DISPLAY } from '@pages/owner/constants/display.constants';
import { MESSAGES } from '@pages/owner/constants/messages.constants';
import { useOwnerRestaurants } from '@pages/owner/hooks/useOwnerRestaurants';
import { RestaurantForm } from '@pages/restaurants/components/RestaurantForm';
import type { RestaurantFormValues } from '@pages/restaurants/types/restaurant.types';

import './DashboardContainer.scss';

const { Title } = Typography;

export const DashboardContainer = (): React.JSX.Element => {
  const navigate = useNavigate();
  const { createRestaurant, fetchMore, hasMore, isFetching, isLoading, items } =
    useOwnerRestaurants();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isFetching) {
          fetchMore();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, isFetching, fetchMore]);

  const handleCreate = async (values: RestaurantFormValues) => {
    setIsSubmitting(true);
    try {
      await createRestaurant(values);
      void message.success(MESSAGES.SUCCESS.RESTAURANT_CREATED);
      setIsFormOpen(false);
    } catch {
      void message.error(MESSAGES.ERRORS.CREATE_FAILED);
      throw new Error('create failed');
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
        <Button onClick={() => setIsFormOpen(true)} type={BUTTON_TYPES.PRIMARY}>
          {DISPLAY.ACTIONS.ADD_RESTAURANT}
        </Button>
      </div>

      <RestaurantList
        isFetching={isFetching}
        isLoading={isLoading}
        items={items}
        onCardClick={handleCardClick}
        sentinelRef={sentinelRef}
      />

      <RestaurantForm
        initialValues={null}
        isSubmitting={isSubmitting}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleCreate}
        open={isFormOpen}
      />
    </div>
  );
};
