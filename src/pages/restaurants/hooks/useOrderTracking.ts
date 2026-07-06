import { useEffect, useState } from 'react';

import {
  ORDER_TRACKING_TERMINAL_STATUSES,
  ORDER_TRACKING_TICK_MS,
} from '@pages/restaurants/constants/order.constants';
import type { Order, OrderTrackingInfo } from '@pages/restaurants/types/order.types';
import { getOrderTrackingInfo } from '@utils/orderTracking';

export const useOrderTracking = (order: Order | null): OrderTrackingInfo | null => {
  const [now, setNow] = useState(() => {
    return Date.now();
  });

  useEffect(() => {
    if (!order || ORDER_TRACKING_TERMINAL_STATUSES.includes(order.status)) return;

    const interval = setInterval(() => {
      setNow(Date.now());
    }, ORDER_TRACKING_TICK_MS);

    return () => {
      clearInterval(interval);
    };
  }, [order]);

  if (!order) return null;

  return getOrderTrackingInfo(order, now);
};
