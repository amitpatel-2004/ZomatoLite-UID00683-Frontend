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
  },
  ERROR: {
    NOT_FOUND: '/not-found',
  },
} as const;
