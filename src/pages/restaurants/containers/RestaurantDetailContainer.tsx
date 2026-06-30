import React, { useState } from 'react';

import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { Button, message, Spin, Typography } from 'antd';

import { ArrowLeftOutlined } from '@ant-design/icons';
import type { MenuItem } from '@appTypes/restaurant.types';
import { ROUTES } from '@constants/route.constants';
import { BUTTON_TYPES, SPIN_SIZES, TITLE_LEVELS } from '@constants/style.constants';
import { isConflictError } from '@core/api/apiError';
import { getAuthUser } from '@pages/auth/store';
import { MenuItemForm } from '@pages/restaurants/components/MenuItemForm';
import type { MenuItemFormSubmitValues } from '@pages/restaurants/components/MenuItemForm/MenuItemForm.types';
import { MenuItemList } from '@pages/restaurants/components/MenuItemList';
import { RestaurantDetails } from '@pages/restaurants/components/RestaurantDetails';
import type { RestaurantFormValues } from '@pages/restaurants/components/RestaurantForm';
import { RestaurantForm } from '@pages/restaurants/components/RestaurantForm';
import { DISPLAY } from '@pages/restaurants/constants/display.constants';
import { MESSAGES } from '@pages/restaurants/constants/messages.constants';
import { useMenuItems } from '@pages/restaurants/hooks/useMenuItems';
import { useRestaurantDetail } from '@pages/restaurants/hooks/useRestaurantDetail';
import { menuItemService } from '@services/menuItemService';

import './RestaurantDetailContainer.scss';

const { Title } = Typography;

export const RestaurantDetailContainer = (): React.JSX.Element => {
  const { id: restaurantId = '' } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const user = useSelector(getAuthUser);

  const { deleteRestaurant, error, isLoading, restaurant, updateRestaurant } =
    useRestaurantDetail(restaurantId);

  const {
    createMenuItem,
    deleteMenuItem,
    fetchMore,
    hasMore,
    isFetching,
    isLoading: isMenuLoading,
    items: menuItems,
    updateMenuItem,
  } = useMenuItems(restaurantId);

  const [isEditRestaurantOpen, setIsEditRestaurantOpen] = useState(false);
  const [isRestaurantSubmitting, setIsRestaurantSubmitting] = useState(false);

  const [menuItemModalOpen, setMenuItemModalOpen] = useState(false);
  const [editingMenuItem, setEditingMenuItem] = useState<MenuItem | null>(null);
  const [isMenuItemSubmitting, setIsMenuItemSubmitting] = useState(false);

  const isOwner = !!user && !!restaurant && restaurant.ownerId === user._id;

  const handleRestaurantUpdate = async (
    values: RestaurantFormValues,
    setFieldError: (field: string, msg: string) => void,
  ) => {
    setIsRestaurantSubmitting(true);
    try {
      await updateRestaurant(values);
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

  const handleOpenCreateMenuItem = () => {
    setEditingMenuItem(null);
    setMenuItemModalOpen(true);
  };

  const handleOpenEditMenuItem = (item: MenuItem) => {
    setEditingMenuItem(item);
    setMenuItemModalOpen(true);
  };

  const handleMenuItemSubmit = async (
    values: MenuItemFormSubmitValues,
    setFieldError: (field: string, msg: string) => void,
  ) => {
    setIsMenuItemSubmitting(true);
    try {
      let imagePath: string | null = values.existingImagePath;

      if (values.imageFile) {
        try {
          const { uploadUrl, imagePath: newImagePath } = await menuItemService.getUploadUrl(
            restaurantId,
            {
              fileName: values.imageFile.name,
              contentType: values.imageFile.type,
              fileSize: values.imageFile.size,
            },
          );
          await menuItemService.uploadImage(uploadUrl, values.imageFile);
          imagePath = newImagePath;
        } catch (err) {
          const msg = err instanceof Error ? err.message : MESSAGES.ERRORS.IMAGE_UPLOAD_FAILED;
          void message.error(msg);
          return;
        }
      }

      const payload = {
        name: values.name,
        description: values.description,
        price: values.price,
        isVeg: values.isVeg,
        quantity: values.quantity,
        imagePath,
      };

      if (editingMenuItem) {
        await updateMenuItem(editingMenuItem._id, payload);
        void message.success(MESSAGES.SUCCESS.MENU_ITEM_UPDATED);
      } else {
        await createMenuItem(payload);
        void message.success(MESSAGES.SUCCESS.MENU_ITEM_CREATED);
      }

      setMenuItemModalOpen(false);
      setEditingMenuItem(null);
    } catch (err) {
      if (isConflictError(err)) {
        setFieldError('name', err.message);
      } else {
        const msg = err instanceof Error ? err.message : MESSAGES.ERRORS.MENU_ITEM_SAVE_FAILED;
        void message.error(msg);
      }
    } finally {
      setIsMenuItemSubmitting(false);
    }
  };

  const handleMenuItemDelete = async (id: string) => {
    try {
      await deleteMenuItem(id);
      void message.success(MESSAGES.SUCCESS.MENU_ITEM_DELETED);
    } catch (err) {
      const msg = err instanceof Error ? err.message : MESSAGES.ERRORS.MENU_ITEM_DELETE_FAILED;
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

      <div className="restaurant-detail-container__menu-header">
        <Title level={TITLE_LEVELS.SUBHEADING}>{DISPLAY.TITLES.MENU_ITEMS}</Title>

        {isOwner && (
          <div className="restaurant-detail-container__menu-actions">
            <Button disabled>{DISPLAY.ACTIONS.UPLOAD_CSV}</Button>
            <Button onClick={handleOpenCreateMenuItem} type={BUTTON_TYPES.PRIMARY}>
              {DISPLAY.ACTIONS.ADD_MENU_ITEM}
            </Button>
          </div>
        )}
      </div>

      <MenuItemList
        hasMore={hasMore}
        isFetching={isFetching}
        isLoading={isMenuLoading}
        isOwner={isOwner}
        items={menuItems}
        onDelete={handleMenuItemDelete}
        onEdit={handleOpenEditMenuItem}
        onLoadMore={fetchMore}
      />

      <MenuItemForm
        handleSubmit={handleMenuItemSubmit}
        initialValues={editingMenuItem}
        isSubmitting={isMenuItemSubmitting}
        onClose={() => {
          setMenuItemModalOpen(false);
          setEditingMenuItem(null);
        }}
        open={menuItemModalOpen}
      />
    </div>
  );
};
