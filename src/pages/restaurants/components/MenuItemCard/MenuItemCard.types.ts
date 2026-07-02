import type { MenuItem } from '@pages/restaurants/types/restaurant.types';

export type MenuItemCardProps = {
  item: MenuItem;
  isOwner: boolean;
  onEdit: (item: MenuItem) => void;
  onDelete: (id: string) => Promise<void>;
};

export type OwnerActionsParams = {
  item: MenuItem;
  onEdit: (item: MenuItem) => void;
  onDeleteClick: () => void;
};
