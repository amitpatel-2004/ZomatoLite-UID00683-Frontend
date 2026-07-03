import type { Currency } from '@appTypes/common.types';
import type { UserRole } from '@pages/auth/types/auth.types';

export type AuthUser = {
  _id: string;
  email: string;
  displayName: string;
  role: UserRole;
  balance?: number;
  currency?: Currency;
};

export type AuthResponseUser = Omit<AuthUser, 'balance' | 'currency'>;

export type AuthResult = {
  user: AuthUser;
  idToken: string;
  isEmailVerified: boolean;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  email: string;
  password: string;
  displayName: string;
  role: UserRole;
};

export type AuthResponseData = {
  customToken: string;
  user: AuthResponseUser;
};

export type AuthApiResponse = {
  message: string;
  data: AuthResponseData;
};
