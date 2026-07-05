import { BOOKING_FEE } from '@pages/restaurants/constants/order.constants';
import type { PricingSummary } from '@pages/restaurants/types/order.types';

/** Rounds a number to 2 decimal places. */
const round2 = (value: number): number => {
  return Math.round(value * 100) / 100;
};

/** Booking fee is the flat amount or a percent of subtotal, whichever is higher. */
export const getPricingSummary = (subtotal: number): PricingSummary => {
  const bookingFee = round2(Math.max(BOOKING_FEE.FLAT_AMOUNT, subtotal * BOOKING_FEE.PERCENT));
  const total = round2(subtotal + bookingFee);

  return { subtotal: round2(subtotal), bookingFee, total };
};
