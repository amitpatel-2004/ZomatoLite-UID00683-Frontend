import type { MenuItem } from '@appTypes/restaurant.types';

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
