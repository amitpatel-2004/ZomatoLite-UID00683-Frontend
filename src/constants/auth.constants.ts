export const USER_ROLES = {
  CUSTOMER: 'customer',
  OWNER: 'owner',
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];
