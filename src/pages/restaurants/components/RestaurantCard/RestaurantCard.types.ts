import type { Restaurant } from '@pages/restaurants/types/restaurant.types';

export type RestaurantCardProps = {
  restaurant: Restaurant;
  onClick: (id: string) => void;
  isOwnRestaurant?: boolean;
};
