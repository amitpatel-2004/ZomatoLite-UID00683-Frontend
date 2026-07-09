import { DISPLAY } from '@pages/restaurants/constants/display.constants';
import type { MenuItem } from '@pages/restaurants/types/restaurant.types';

import type { MenuItemFormValues } from './MenuItemForm.types';

export const getMenuItemInitialValues = (item: MenuItem | null): MenuItemFormValues => {
  return {
    name: item?.name ?? '',
    description: item?.description ?? '',
    price: item?.price ?? '',
    isVeg: item?.isVeg ?? true,
    quantity: item?.quantity ?? '',
  };
};

export const MENU_ITEM_FIELD_CONFIGS = {
  NAME: {
    name: 'name',
    label: DISPLAY.LABELS.NAME,
    maxLength: 100,
    placeholder: DISPLAY.PLACEHOLDERS.MENU_ITEM_NAME,
    required: true,
  },
  DESCRIPTION: {
    name: 'description',
    label: DISPLAY.LABELS.DESCRIPTION,
    rows: 2,
    maxLength: 500,
    placeholder: DISPLAY.PLACEHOLDERS.MENU_ITEM_DESCRIPTION,
  },
  PRICE: {
    name: 'price',
    label: DISPLAY.LABELS.PRICE,
    min: 0.01,
    max: 9999.99,
    placeholder: '0.00',
    required: true,
  },
  QUANTITY: {
    name: 'quantity',
    label: DISPLAY.LABELS.QUANTITY,
    min: 0,
    max: 9999,
    placeholder: '0',
  },
  IS_VEG: { name: 'isVeg', label: DISPLAY.LABELS.IS_VEG, required: true },
} as const;
