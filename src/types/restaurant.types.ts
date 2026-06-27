import type { ValueOf } from '@appTypes/common.types';
import { RESTAURANT_STATUS } from '@constants/restaurant.constants';

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

export type MenuItem = {
  _id: string;
  name: string;
  description: string;
  price: number;
  isVeg: boolean;
  imagePath: string | null;
  rating: number;
  quantity: number | null;
};
