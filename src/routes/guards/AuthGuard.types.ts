import type { AuthUser } from '@services/auth/authService.types';

export type AuthGuardAuthState = {
  user: AuthUser | null;
  isEmailVerified: boolean;
};

export type AuthGuardCheck = (auth: AuthGuardAuthState) => boolean;

export type AuthGuardProps = {
  accessCheck: AuthGuardCheck;
  fallbackPath: string;
};
