import type React from 'react';

import type { Order } from '@pages/restaurants/types/order.types';

export type OrderCardProps = {
  order: Order;
  showRestaurantName?: boolean;
  actions?: React.ReactNode;
  onTrack: (order: Order) => void;
};
