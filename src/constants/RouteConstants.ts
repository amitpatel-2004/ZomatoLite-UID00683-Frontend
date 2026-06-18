/**
 * Global navigation route paths.
 */
export const ROUTES = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    VERIFY_EMAIL: '/auth/verify-email',
  },
  RESTAURANT: {
    ROOT: '/restaurant',
    DASHBOARD: '/restaurant/dashboard',
  },
} as const;
