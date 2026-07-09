import type { MenuItem } from '@pages/restaurants/types/restaurant.types';
import type { CartItem } from '@redux/customerStore';

export type MenuItemListProps = {
  items: MenuItem[];
  hasMore: boolean;
  isLoading: boolean;
  isFetching: boolean;
  isOwner: boolean;
  onLoadMore: () => void;
  onEdit: (item: MenuItem) => void;
  onDelete: (id: string) => Promise<void>;
  cartItems: CartItem[];
  onAddToCart: (item: MenuItem) => void;
  onIncrement: (menuItemId: string) => void;
  onDecrement: (menuItemId: string) => void;
};
