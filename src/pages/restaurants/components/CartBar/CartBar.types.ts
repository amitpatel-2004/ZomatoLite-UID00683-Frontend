export type CartBarProps = {
  itemCount: number;
  total: number;
  currencySymbol: string;
  onProceed: () => void;
  onClearCart: () => void;
};
