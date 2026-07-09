import type { MenuItem } from '@pages/restaurants/types/restaurant.types';

export type MenuItemListProps = {
  items: MenuItem[];
  hasMore: boolean;
  isLoading: boolean;
  isFetching: boolean;
  isOwner: boolean;
  onLoadMore: () => void;
  onEdit: (item: MenuItem) => void;
  onDelete: (id: string) => Promise<void>;
};
