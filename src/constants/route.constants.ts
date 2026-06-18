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
  ERROR: {
    NOT_FOUND: '/not-found',
  },
} as const;
