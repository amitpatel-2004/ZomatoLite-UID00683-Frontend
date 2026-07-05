import { TAG_COLORS } from '@constants/style.constants';
import type { OrderStatus } from '@pages/restaurants/types/order.types';

export const ORDER_STATUS = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  PREPARING: 'preparing',
  OUT_FOR_DELIVERY: 'out_for_delivery',
  DELIVERED: 'delivered',
  REJECTED: 'rejected',
  CANCELLED: 'cancelled',
} as const;

export const ORDER_STATUS_TAG_COLORS: Record<OrderStatus, string> = {
  [ORDER_STATUS.PENDING]: TAG_COLORS.PENDING,
  [ORDER_STATUS.ACCEPTED]: TAG_COLORS.PROCESSING,
  [ORDER_STATUS.PREPARING]: TAG_COLORS.PROCESSING,
  [ORDER_STATUS.OUT_FOR_DELIVERY]: TAG_COLORS.PROCESSING,
  [ORDER_STATUS.DELIVERED]: TAG_COLORS.SUCCESS,
  [ORDER_STATUS.REJECTED]: TAG_COLORS.ERROR,
  [ORDER_STATUS.CANCELLED]: TAG_COLORS.ERROR,
};

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  [ORDER_STATUS.PENDING]: 'Pending',
  [ORDER_STATUS.ACCEPTED]: 'Accepted',
  [ORDER_STATUS.PREPARING]: 'Preparing',
  [ORDER_STATUS.OUT_FOR_DELIVERY]: 'Out for Delivery',
  [ORDER_STATUS.DELIVERED]: 'Delivered',
  [ORDER_STATUS.REJECTED]: 'Rejected',
  [ORDER_STATUS.CANCELLED]: 'Cancelled',
};

export const BOOKING_FEE = {
  FLAT_AMOUNT: 20,
  PERCENT: 0.01,
} as const;
