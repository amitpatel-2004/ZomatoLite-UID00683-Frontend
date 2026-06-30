import { USER_ROLES } from '@pages/auth/constants/auth.constants';

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];
