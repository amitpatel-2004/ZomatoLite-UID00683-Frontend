import type { ValueOf } from '@appTypes/common.types';
import {
  MENU_ITEM_STATUS,
  RESTAURANT_STATUS,
} from '@pages/restaurants/constants/restaurant.constants';

export type RestaurantStatus = ValueOf<typeof RESTAURANT_STATUS>;

export type Restaurant = {
  _id: string;
  ownerId: string;
  name: string;
  description: string;
  cuisineTypes: string[];
  rating: number;
  status: RestaurantStatus;
  openingTime: string;
  closingTime: string;
};

export type MenuItemStatus = ValueOf<typeof MENU_ITEM_STATUS>;

export type MenuItem = {
  _id: string;
  name: string;
  description: string;
  price: number;
  isVeg: boolean;
  imagePath: string | null;
  rating: number;
  quantity: number | null;
  status: MenuItemStatus;
};
