import type { AuthUser, UserRole } from '@appTypes/auth.types';

export type AuthResponseUser = Omit<AuthUser, 'balance' | 'currency'>;

export type AuthResponseData = {
  customToken: string;
  user: AuthResponseUser;
};

export type AuthApiResponse = {
  message: string;
  data: AuthResponseData;
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

export type LoginFormValues = {
  email: string;
  password: string;
};

export type RegisterFormValues = {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
};
