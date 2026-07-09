import React, { useState } from 'react';

import { Button, message, Typography } from 'antd';

import { HTTP_STATUS } from '@constants/api.constants';
import { BUTTON_TYPES, TITLE_LEVELS } from '@constants/style.constants';
import { isApiErrorWithStatus } from '@core/api/apiError';
import { MenuItemForm } from '@pages/restaurants/components/MenuItemForm';
import type { MenuItemFormSubmitValues } from '@pages/restaurants/components/MenuItemForm/MenuItemForm.types';
import { MenuItemList } from '@pages/restaurants/components/MenuItemList';
import { DISPLAY } from '@pages/restaurants/constants/display.constants';
import { MESSAGES } from '@pages/restaurants/constants/messages.constants';
import { useMenuItems } from '@pages/restaurants/hooks/useMenuItems';
import type { MenuItem } from '@pages/restaurants/types/restaurant.types';
import { menuItemService } from '@services/menuItem/menuItemService';
import { getDirtyValues } from '@utils/formik';

import type { MenuItemsContainerProps } from './MenuItemsContainer.types';
import { buildMenuItemPayload } from './MenuItemsContainer.utils';

import './MenuItemsContainer.scss';

const { Title } = Typography;

export const MenuItemsContainer = (props: MenuItemsContainerProps): React.JSX.Element => {
  const { restaurantId, isOwner } = props;

  const {
    createMenuItem,
    deleteMenuItem,
    fetchMore,
    hasMore,
    isFetching,
    isLoading,
    items,
    updateMenuItem,
  } = useMenuItems(restaurantId);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpenCreate = () => {
    setEditingItem(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (item: MenuItem) => {
    setEditingItem(item);
    setModalOpen(true);
  };

  const handleSubmit = async (
    values: MenuItemFormSubmitValues,
    setFieldError: (field: string, msg: string) => void,
  ) => {
    setIsSubmitting(true);
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

      const payload = buildMenuItemPayload(values, imagePath);

      if (editingItem) {
        const changedFields = getDirtyValues(payload, editingItem);
        if (Object.keys(changedFields).length > 0) {
          await updateMenuItem(editingItem._id, changedFields);
          void message.success(MESSAGES.SUCCESS.MENU_ITEM_UPDATED);
        }
      } else {
        await createMenuItem(payload);
        void message.success(MESSAGES.SUCCESS.MENU_ITEM_CREATED);
      }

      setModalOpen(false);
      setEditingItem(null);
    } catch (err) {
      if (isApiErrorWithStatus(err, HTTP_STATUS.CONFLICT)) {
        setFieldError('name', err.message);
      } else {
        const msg = err instanceof Error ? err.message : MESSAGES.ERRORS.MENU_ITEM_SAVE_FAILED;
        void message.error(msg);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteMenuItem(id);
      void message.success(MESSAGES.SUCCESS.MENU_ITEM_DELETED);
    } catch (err) {
      const msg = err instanceof Error ? err.message : MESSAGES.ERRORS.MENU_ITEM_DELETE_FAILED;
      void message.error(msg);
    }
  };

  return (
    <div className="menu-items-container">
      <div className="menu-items-container__header">
        <Title level={TITLE_LEVELS.SUBHEADING}>{DISPLAY.TITLES.MENU_ITEMS}</Title>

        {isOwner && (
          <div className="menu-items-container__actions">
            <Button disabled>{DISPLAY.ACTIONS.UPLOAD_CSV}</Button>
            <Button onClick={handleOpenCreate} type={BUTTON_TYPES.PRIMARY}>
              {DISPLAY.ACTIONS.ADD_MENU_ITEM}
            </Button>
          </div>
        )}
      </div>

      <MenuItemList
        hasMore={hasMore}
        isFetching={isFetching}
        isLoading={isLoading}
        isOwner={isOwner}
        items={items}
        onDelete={handleDelete}
        onEdit={handleOpenEdit}
        onLoadMore={fetchMore}
      />

      <MenuItemForm
        handleSubmit={handleSubmit}
        initialValues={editingItem}
        isSubmitting={isSubmitting}
        onClose={() => {
          setModalOpen(false);
          setEditingItem(null);
        }}
        open={modalOpen}
      />
    </div>
  );
};
