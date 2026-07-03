import { SELECT_MODES } from '@constants/style.constants';
import { DISPLAY } from '@pages/restaurants/constants/display.constants';
import { OPTIONS } from '@pages/restaurants/constants/options.constants';
import type { Restaurant } from '@pages/restaurants/types/restaurant.types';

export const getRestaurantInitialValues = (restaurant: Restaurant | null) => {
  return {
    name: restaurant?.name ?? '',
    description: restaurant?.description ?? '',
    cuisineTypes: restaurant?.cuisineTypes ?? [],
    openingTime: restaurant?.openingTime ?? '',
    closingTime: restaurant?.closingTime ?? '',
  };
};

export const RESTAURANT_FIELD_CONFIGS = {
  NAME: {
    name: 'name',
    label: DISPLAY.LABELS.NAME,
    maxLength: 100,
    placeholder: DISPLAY.PLACEHOLDERS.RESTAURANT_NAME,
    required: true,
  },
  DESCRIPTION: {
    name: 'description',
    label: DISPLAY.LABELS.DESCRIPTION,
    rows: 3,
    maxLength: 500,
    placeholder: DISPLAY.PLACEHOLDERS.RESTAURANT_DESCRIPTION,
  },
  CUISINE_TYPES: {
    name: 'cuisineTypes',
    label: DISPLAY.LABELS.CUISINE_TYPES,
    mode: SELECT_MODES.MULTIPLE,
    options: OPTIONS.CUISINE,
    placeholder: DISPLAY.PLACEHOLDERS.CUISINE_TYPES,
    required: true,
  },
  OPENING_TIME: { name: 'openingTime', label: DISPLAY.LABELS.OPENING_TIME, required: true },
  CLOSING_TIME: { name: 'closingTime', label: DISPLAY.LABELS.CLOSING_TIME, required: true },
} as const;
