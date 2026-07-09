import type { MenuItem } from '@pages/restaurants/types/restaurant.types';

export type MenuItemCardProps = {
  item: MenuItem;
  isOwner: boolean;
  onEdit: (item: MenuItem) => void;
  onDelete: (id: string) => Promise<void>;
  cartQuantity: number;
  onAddToCart: (item: MenuItem) => void;
  onIncrement: (menuItemId: string) => void;
  onDecrement: (menuItemId: string) => void;
};

export type OwnerActionsParams = {
  item: MenuItem;
  onEdit: (item: MenuItem) => void;
  onDeleteClick: () => void;
};
