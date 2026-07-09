import React from 'react';

import { InfiniteScrollList } from '@components/InfiniteScrollList';
import { MenuItemCard } from '@pages/restaurants/components/MenuItemCard';
import { DISPLAY } from '@pages/restaurants/constants/display.constants';

import type { MenuItemListProps } from './MenuItemList.types';

export const MenuItemList = (props: MenuItemListProps): React.JSX.Element => {
  const {
    cartItems,
    isOwner,
    onAddToCart,
    onDecrement,
    onDelete,
    onEdit,
    onIncrement,
    ...listProps
  } = props;

  return (
    <InfiniteScrollList
      {...listProps}
      emptyText={DISPLAY.EMPTY.NO_MENU_ITEMS}
      renderItem={(item) => {
        const cartQuantity =
          cartItems.find((cartItem) => {
            return cartItem.menuItemId === item._id;
          })?.quantity ?? 0;

        return (
          <MenuItemCard
            cartQuantity={cartQuantity}
            isOwner={isOwner}
            item={item}
            onAddToCart={onAddToCart}
            onDecrement={onDecrement}
            onDelete={onDelete}
            onEdit={onEdit}
            onIncrement={onIncrement}
          />
        );
      }}
    />
  );
};
