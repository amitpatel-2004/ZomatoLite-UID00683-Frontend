import type { Restaurant } from '@pages/restaurants/types/restaurant.types';

export type RestaurantListProps = {
  isLoading: boolean;
  isFetching: boolean;
  hasMore: boolean;
  items: Restaurant[];
  onCardClick: (id: string) => void;
  onLoadMore: () => void;
  emptyText: string;
};
