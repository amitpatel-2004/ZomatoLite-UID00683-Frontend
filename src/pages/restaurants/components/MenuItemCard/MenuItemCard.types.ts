import type { MenuItem } from '@appTypes/restaurant.types';

export type MenuItemCardProps = {
  item: MenuItem;
  isOwner: boolean;
  onEdit: (item: MenuItem) => void;
  onDelete: (id: string) => Promise<void>;
};
