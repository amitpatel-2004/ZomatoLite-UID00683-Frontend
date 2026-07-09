import type { Restaurant } from '@pages/restaurants/types/restaurant.types';

export type RestaurantDetailsProps = {
  restaurant: Restaurant;
  isOwner: boolean;
  onEdit: () => void;
  onDelete: () => Promise<void>;
};
