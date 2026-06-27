import type { Restaurant } from '@appTypes/restaurant.types';

export type RestaurantCardProps = {
  restaurant: Restaurant;
  onClick: (id: string) => void;
};
