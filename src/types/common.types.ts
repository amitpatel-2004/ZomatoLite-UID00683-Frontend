import type { ROUTES } from '@constants/route.constants';

/**
 * Extracts the value types of an object.
 */
export type ValueOf<T> = T[keyof T];

/**
 * Extracts all valid URL path strings from the nested ROUTES configuration object.
 */
export type RoutePath = ValueOf<ValueOf<typeof ROUTES>>;

export type Currency = {
  code: string;
  symbol: string;
};
