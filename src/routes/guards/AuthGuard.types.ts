import type { AuthUser } from '@appTypes/auth.types';

export type AuthGuardAuthState = {
  user: AuthUser | null;
  isEmailVerified: boolean;
};

export type AuthGuardCheck = (auth: AuthGuardAuthState) => boolean;

export type AuthGuardProps = {
  check: AuthGuardCheck;
  fallbackPath: string;
};
