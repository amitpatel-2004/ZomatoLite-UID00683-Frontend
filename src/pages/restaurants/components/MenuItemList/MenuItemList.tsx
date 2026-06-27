import React, { useEffect, useRef } from 'react';

import { Spin, Typography } from 'antd';

import { MenuItemCard } from '@pages/restaurants/components/MenuItemCard';
import { DISPLAY } from '@pages/restaurants/constants/display.constants';

import type { MenuItemListProps } from './MenuItemList.types';

import './MenuItemList.scss';

const { Text } = Typography;

export const MenuItemList = (props: MenuItemListProps): React.JSX.Element => {
  const { hasMore, isFetching, isLoading, isOwner, items, onDelete, onEdit, onLoadMore } = props;
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isFetching) {
          onLoadMore();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, isFetching, onLoadMore]);

  if (isLoading) {
    return (
      <div className="menu-item-list__loading">
        <Spin />
      </div>
    );
  }

  if (!isLoading && items.length === 0) {
    return (
      <div className="menu-item-list__empty">
        <Text type="secondary">{DISPLAY.EMPTY.NO_MENU_ITEMS}</Text>
      </div>
    );
  }

  return (
    <div className="menu-item-list">
      {items.map((item) => (
        <MenuItemCard
          isOwner={isOwner}
          item={item}
          key={item._id}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}

      <div ref={sentinelRef} className="menu-item-list__sentinel" />

      {isFetching && (
        <div className="menu-item-list__fetching">
          <Spin size="small" />
        </div>
      )}
    </div>
  );
};
