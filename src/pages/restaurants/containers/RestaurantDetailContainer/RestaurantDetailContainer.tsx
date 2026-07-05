import React, { useState } from 'react';

import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { Button, message, Spin, Typography } from 'antd';

import { ArrowLeftOutlined } from '@ant-design/icons';
import { ROUTES } from '@constants/route.constants';
import { BUTTON_TYPES, SPIN_SIZES, TITLE_LEVELS } from '@constants/style.constants';
import { isConflictError } from '@core/api/apiError';
import { getAuthUser } from '@pages/auth/store';
import { RestaurantDetails } from '@pages/restaurants/components/RestaurantDetails';
import type { RestaurantFormValues } from '@pages/restaurants/components/RestaurantForm';
import { RestaurantForm } from '@pages/restaurants/components/RestaurantForm';
import { DISPLAY } from '@pages/restaurants/constants/display.constants';
import { MESSAGES } from '@pages/restaurants/constants/messages.constants';
import { useRestaurantDetail } from '@pages/restaurants/hooks/useRestaurantDetail';
import { getDirtyValues } from '@utils/formik';

import { MenuItemsContainer } from '../MenuItemsContainer';

import './RestaurantDetailContainer.scss';

const { Title } = Typography;

export const RestaurantDetailContainer = (): React.JSX.Element => {
  const { id: restaurantId = '' } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const user = useSelector(getAuthUser);

  const { deleteRestaurant, error, isLoading, restaurant, updateRestaurant } =
    useRestaurantDetail(restaurantId);

  const [isEditRestaurantOpen, setIsEditRestaurantOpen] = useState(false);
  const [isRestaurantSubmitting, setIsRestaurantSubmitting] = useState(false);

  const isOwner = !!user && !!restaurant && restaurant.ownerId === user._id;

  const handleRestaurantUpdate = async (
    values: RestaurantFormValues,
    setFieldError: (field: string, msg: string) => void,
  ) => {
    if (!restaurant) return;

    const changedFields = getDirtyValues(values, restaurant);
    if (Object.keys(changedFields).length === 0) {
      setIsEditRestaurantOpen(false);
      return;
    }

    setIsRestaurantSubmitting(true);
    try {
      await updateRestaurant(changedFields);
      void message.success(MESSAGES.SUCCESS.RESTAURANT_UPDATED);
      setIsEditRestaurantOpen(false);
    } catch (err) {
      if (isConflictError(err)) {
        setFieldError('name', err.message);
      } else {
        const msg = err instanceof Error ? err.message : MESSAGES.ERRORS.UPDATE_FAILED;
        void message.error(msg);
      }
    } finally {
      setIsRestaurantSubmitting(false);
    }
  };

  const handleRestaurantDelete = async () => {
    try {
      await deleteRestaurant();
      void message.success(MESSAGES.SUCCESS.RESTAURANT_DELETED);
      void navigate(ROUTES.RESTAURANT.DASHBOARD);
    } catch (err) {
      const msg = err instanceof Error ? err.message : MESSAGES.ERRORS.DELETE_FAILED;
      void message.error(msg);
    }
  };

  if (isLoading) {
    return (
      <div className="restaurant-detail-container__loading">
        <Spin size={SPIN_SIZES.LARGE} />
      </div>
    );
  }

  if (error || !restaurant) {
    return (
      <div className="restaurant-detail-container__error">
        <Title level={TITLE_LEVELS.SUBHEADING}>{error ?? MESSAGES.ERRORS.FETCH_FAILED}</Title>
      </div>
    );
  }

  return (
    <div className="restaurant-detail-container">
      <div className="restaurant-detail-container__nav">
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => {
            return navigate(-1);
          }}
          type={BUTTON_TYPES.TEXT}
        >
          {DISPLAY.ACTIONS.BACK}
        </Button>
      </div>

      <RestaurantDetails
        isOwner={isOwner}
        onDelete={handleRestaurantDelete}
        onEdit={() => {
          return setIsEditRestaurantOpen(true);
        }}
        restaurant={restaurant}
      />

      <RestaurantForm
        handleSubmit={handleRestaurantUpdate}
        initialValues={restaurant}
        isSubmitting={isRestaurantSubmitting}
        onClose={() => {
          return setIsEditRestaurantOpen(false);
        }}
        open={isEditRestaurantOpen}
      />

      <MenuItemsContainer isOwner={isOwner} restaurantId={restaurantId} />
    </div>
  );
};
