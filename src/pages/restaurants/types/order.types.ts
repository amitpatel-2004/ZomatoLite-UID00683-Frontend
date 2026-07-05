import type { Currency, ValueOf } from '@appTypes/common.types';
import { ORDER_STATUS } from '@pages/restaurants/constants/order.constants';

export type OrderStatus = ValueOf<typeof ORDER_STATUS>;

export type OrderItem = {
  name: string;
  quantity: number;
  unitPrice: number;
};

export type PricingSummary = {
  subtotal: number;
  bookingFee: number;
  total: number;
};

export type Order = {
  _id: string;
  restaurantId: string;
  restaurantName: string;
  customerId: string;
  status: OrderStatus;
  currency: Currency;
  pricingSummary: PricingSummary;
  items: OrderItem[];
  _createdAt: number;
  _updatedAt: number;
};
