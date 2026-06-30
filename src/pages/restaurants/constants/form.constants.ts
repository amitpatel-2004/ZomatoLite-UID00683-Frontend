import type { MenuItem, Restaurant } from '@appTypes/restaurant.types';
import { SELECT_MODES } from '@constants/style.constants';
import { DISPLAY } from '@pages/restaurants/constants/display.constants';
import { OPTIONS } from '@pages/restaurants/constants/options.constants';

export const getRestaurantInitialValues = (restaurant: Restaurant | null) => {
  return {
    name: restaurant?.name ?? '',
    description: restaurant?.description ?? '',
    cuisineTypes: restaurant?.cuisineTypes ?? ([] as string[]),
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
  },
  OPENING_TIME: { name: 'openingTime', label: DISPLAY.LABELS.OPENING_TIME },
  CLOSING_TIME: { name: 'closingTime', label: DISPLAY.LABELS.CLOSING_TIME },
} as const;

export const getMenuItemInitialValues = (item: MenuItem | null) => {
  return {
    name: item?.name ?? '',
    description: item?.description ?? '',
    price: (item?.price ?? '') as number | string,
    isVeg: item?.isVeg ?? true,
    quantity: (item?.quantity ?? '') as number | string | null,
  };
};

export const MENU_ITEM_FIELD_CONFIGS = {
  NAME: {
    name: 'name',
    label: DISPLAY.LABELS.NAME,
    maxLength: 100,
    placeholder: DISPLAY.PLACEHOLDERS.MENU_ITEM_NAME,
  },
  DESCRIPTION: {
    name: 'description',
    label: DISPLAY.LABELS.DESCRIPTION,
    rows: 2,
    placeholder: DISPLAY.PLACEHOLDERS.MENU_ITEM_DESCRIPTION,
  },
  PRICE: { name: 'price', label: DISPLAY.LABELS.PRICE, min: 0.01, placeholder: '0.00' },
  QUANTITY: {
    name: 'quantity',
    label: DISPLAY.LABELS.QUANTITY,
    min: 0,
    max: 9999,
    placeholder: '0',
  },
  IS_VEG: { name: 'isVeg', label: DISPLAY.LABELS.IS_VEG },
} as const;
