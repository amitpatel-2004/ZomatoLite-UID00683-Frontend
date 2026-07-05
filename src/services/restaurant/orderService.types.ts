export type CreateOrderItemPayload = {
  itemId: string;
  quantity: number;
  unitPrice: number;
};

export type CreateOrderPayload = {
  items: CreateOrderItemPayload[];
};

export type CreateOrderResponse = {
  id: string;
  customerId: string;
  status: string;
  restaurant: { name: string };
  currency: { code: string; symbol: string };
  pricingSummary: { subtotal: number; bookingFee: number; total: number };
  items: { name: string; quantity: number; unitPrice: number }[];
};
