import React, { useState } from 'react';

import { useSelector } from 'react-redux';

import { Button, message, Modal, Typography } from 'antd';

import { BUTTON_TYPES, TITLE_LEVELS } from '@constants/style.constants';
import { isConflictError } from '@core/api/apiError';
import { CartBar } from '@pages/restaurants/components/CartBar';
import { MenuItemForm } from '@pages/restaurants/components/MenuItemForm';
import type { MenuItemFormSubmitValues } from '@pages/restaurants/components/MenuItemForm/MenuItemForm.types';
import { MenuItemList } from '@pages/restaurants/components/MenuItemList';
import { OrderConfirmModal } from '@pages/restaurants/components/OrderConfirmModal';
import { DISPLAY } from '@pages/restaurants/constants/display.constants';
import { MESSAGES } from '@pages/restaurants/constants/messages.constants';
import { useCart } from '@pages/restaurants/hooks/useCart';
import { useMenuItems } from '@pages/restaurants/hooks/useMenuItems';
import type { MenuItem } from '@pages/restaurants/types/restaurant.types';
import { getAuthUser, userUpdated } from '@redux/authStore';
import { useAppDispatch } from '@redux/hooks';
import { menuItemService } from '@services/restaurant/menuItemService';
import { orderService } from '@services/restaurant/orderService';
import { getDirtyValues } from '@utils/formik';
import { getPricingSummary } from '@utils/pricing';

import type { MenuItemsContainerProps } from './MenuItemsContainer.types';

import './MenuItemsContainer.scss';

const { Title } = Typography;

export const MenuItemsContainer = (props: MenuItemsContainerProps): React.JSX.Element => {
  const { restaurantId, restaurantName, isOwner } = props;

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

  const dispatch = useAppDispatch();
  const user = useSelector(getAuthUser);
  const cart = useCart();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const isCartForThisRestaurant = cart.restaurantId === restaurantId;
  const cartItems = isCartForThisRestaurant ? cart.items : [];
  const subtotal = cartItems.reduce((sum, item) => {
    return sum + item.unitPrice * item.quantity;
  }, 0);
  const pricingSummary = getPricingSummary(subtotal);
  const cartItemCount = cartItems.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);
  const showCartBar = !isOwner && cartItemCount > 0;

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

      const payload = {
        name: values.name,
        description: values.description,
        price: values.price,
        isVeg: values.isVeg,
        quantity: values.quantity,
        imagePath,
      };

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
      if (isConflictError(err)) {
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

  const handleAddToCart = (item: MenuItem) => {
    if (cart.restaurantId && cart.restaurantId !== restaurantId) {
      Modal.confirm({
        cancelText: DISPLAY.POPCONFIRM.CANCEL_TEXT,
        okText: DISPLAY.POPCONFIRM.OK_TEXT,
        onOk: () => {
          cart.clear();
          cart.addItem(restaurantId, restaurantName, item);
        },
        title: DISPLAY.POPCONFIRM.CLEAR_CART_TITLE(cart.restaurantName),
      });
      return;
    }
    cart.addItem(restaurantId, restaurantName, item);
  };

  const handlePlaceOrder = async () => {
    setIsPlacingOrder(true);
    try {
      const order = await orderService.create(restaurantId, {
        items: cartItems.map((item) => {
          return { itemId: item.menuItemId, quantity: item.quantity, unitPrice: item.unitPrice };
        }),
      });

      if (user) {
        dispatch(
          userUpdated({ ...user, balance: (user.balance ?? 0) - order.pricingSummary.total }),
        );
      }

      cart.clear();
      setIsOrderModalOpen(false);
      void message.success(MESSAGES.SUCCESS.ORDER_PLACED);
    } catch (err) {
      const msg = err instanceof Error ? err.message : MESSAGES.ERRORS.ORDER_PLACE_FAILED;
      void message.error(msg);
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <div
      className={`menu-items-container${showCartBar ? ' menu-items-container--with-cart-bar' : ''}`}
    >
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
        cartItems={cartItems}
        hasMore={hasMore}
        isFetching={isFetching}
        isLoading={isLoading}
        isOwner={isOwner}
        items={items}
        onAddToCart={handleAddToCart}
        onDecrement={cart.decrement}
        onDelete={handleDelete}
        onEdit={handleOpenEdit}
        onIncrement={cart.increment}
        onLoadMore={fetchMore}
      />

      {showCartBar && (
        <CartBar
          currencySymbol={user?.currency?.symbol ?? ''}
          itemCount={cartItemCount}
          onClearCart={cart.clear}
          onProceed={() => {
            return setIsOrderModalOpen(true);
          }}
          total={pricingSummary.total}
        />
      )}

      <OrderConfirmModal
        currencySymbol={user?.currency?.symbol ?? ''}
        isSubmitting={isPlacingOrder}
        items={cartItems}
        onClose={() => {
          return setIsOrderModalOpen(false);
        }}
        onConfirm={handlePlaceOrder}
        open={isOrderModalOpen}
        pricingSummary={pricingSummary}
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
