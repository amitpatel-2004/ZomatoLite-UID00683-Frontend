import React from 'react';

import { InfiniteScrollList } from '@components/InfiniteScrollList';
import { MenuItemCard } from '@pages/restaurants/components/MenuItemCard';
import { DISPLAY } from '@pages/restaurants/constants/display.constants';

import type { MenuItemListProps } from './MenuItemList.types';

export const MenuItemList = (props: MenuItemListProps): React.JSX.Element => {
  const { isOwner, onDelete, onEdit, ...listProps } = props;

  return (
    <InfiniteScrollList
      {...listProps}
      emptyText={DISPLAY.EMPTY.NO_MENU_ITEMS}
      renderItem={(item) => {
        return <MenuItemCard isOwner={isOwner} item={item} onDelete={onDelete} onEdit={onEdit} />;
      }}
    />
  );
};
