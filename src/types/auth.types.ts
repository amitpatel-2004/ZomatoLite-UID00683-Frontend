import type { Currency, ValueOf } from '@appTypes/common.types';
import { USER_ROLES } from '@constants/auth.constants';

export type UserRole = ValueOf<typeof USER_ROLES>;

export type AuthUser = {
  _id: string;
  email: string;
  displayName: string;
  role: UserRole;
  balance?: number;
  currency?: Currency;
};

export type AuthState = {
  user: AuthUser | null;
  /** Firebase ID token to be used in Authorization request header. */
  idToken: string | null;
  isLoading: boolean;
  isEmailVerified: boolean;
  isFirebaseInitializing: boolean;
  error: string | null;
};

export type AuthResult = {
  user: AuthUser;
  idToken: string;
  isEmailVerified: boolean;
};
