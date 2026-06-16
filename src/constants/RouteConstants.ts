import type { ValueOf } from '@types';

/**
 * Global navigation route paths.
 */
export const ROUTES = {
  AUTH: {
    ROOT: '/auth',
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
  },
  RESTAURANT: {
    ROOT: '/restaurant',
    DASHBOARD: '/restaurant/dashboard',
  },
} as const;

export type RoutePath = ValueOf<ValueOf<typeof ROUTES>>;
