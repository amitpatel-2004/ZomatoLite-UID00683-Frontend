import type { PricingSummary } from '@pages/restaurants/types/order.types';
import type { CartItem } from '@redux/customerStore';

export type OrderConfirmModalProps = {
  open: boolean;
  isSubmitting: boolean;
  items: CartItem[];
  pricingSummary: PricingSummary;
  currencySymbol: string;
  onClose: () => void;
  onConfirm: () => void;
};
