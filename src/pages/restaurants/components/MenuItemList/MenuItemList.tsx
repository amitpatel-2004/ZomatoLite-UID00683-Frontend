import React from 'react';

import { Empty, Spin } from 'antd';

import { SPIN_SIZES } from '@constants/style.constants';
import { useInfiniteScroll } from '@hooks/useInfiniteScroll';
import { MenuItemCard } from '@pages/restaurants/components/MenuItemCard';
import { DISPLAY } from '@pages/restaurants/constants/display.constants';

import type { MenuItemListProps } from './MenuItemList.types';

import './MenuItemList.scss';

export const MenuItemList = (props: MenuItemListProps): React.JSX.Element => {
  const { hasMore, isFetching, isLoading, isOwner, items, onDelete, onEdit, onLoadMore } = props;
  const sentinelRef = useInfiniteScroll({ hasMore, isFetching, onLoadMore });

  if (isLoading) {
    return (
      <div className="menu-item-list__loading">
        <Spin />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="menu-item-list__empty">
        <Empty description={DISPLAY.EMPTY.NO_MENU_ITEMS} />
      </div>
    );
  }

  return (
    <div className="menu-item-list">
      {items.map((item) => {
        return (
          <MenuItemCard
            isOwner={isOwner}
            item={item}
            key={item._id}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        );
      })}

      <div ref={sentinelRef} className="menu-item-list__sentinel" />

      {isFetching && (
        <div className="menu-item-list__fetching">
          <Spin size={SPIN_SIZES.LARGE} />
        </div>
      )}
    </div>
  );
};
