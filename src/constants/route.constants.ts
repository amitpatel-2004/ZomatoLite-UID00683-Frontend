export const ROUTES = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    VERIFY_EMAIL: '/auth/verify-email',
  },
  RESTAURANT: {
    DASHBOARD: '/dashboard',
    DETAIL_BASE: '/dashboard/restaurant',
    DETAIL: (id: string) => {
      return `/dashboard/restaurant/${id}`;
    },
    BROWSE_DETAIL: (id: string) => {
      return `/browse/restaurant/${id}`;
    },
    ORDERS: (id: string) => {
      return `/dashboard/restaurant/${id}/orders`;
    },
  },
  BROWSE: '/browse',
  ORDERS: {
    MINE: '/orders',
  },
  ERROR: {
    NOT_FOUND: '/not-found',
  },
} as const;
