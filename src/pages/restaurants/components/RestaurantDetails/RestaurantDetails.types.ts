import type { Restaurant } from '@appTypes/restaurant.types';

export type RestaurantDetailsProps = {
  restaurant: Restaurant;
  isOwner: boolean;
  onEdit: () => void;
  onDelete: () => Promise<void>;
};
