import type { Order, OrderTrackingInfo } from '@pages/restaurants/types/order.types';

export type OrderTrackingModalProps = OrderTrackingInfo & {
  order: Order;
  onClose: () => void;
};
