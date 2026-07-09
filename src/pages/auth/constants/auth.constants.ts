export const USER_ROLES = {
  CUSTOMER: 'customer',
  OWNER: 'owner',
} as const;

export const PASSWORD_PATTERN = /^(?=.*[A-Za-z])(?=.*\d).+$/;
