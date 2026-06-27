import type { Restaurant } from '@appTypes/restaurant.types';

export type RestaurantListProps = {
  isLoading: boolean;
  isFetching: boolean;
  items: Restaurant[];
  onCardClick: (id: string) => void;
  sentinelRef: React.Ref<HTMLDivElement>;
};
