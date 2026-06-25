import type { UserRole } from '@appTypes/auth.types';

import type { AuthGuardAuthState } from './AuthGuard.types';

export const isAuthenticated = ({ user }: AuthGuardAuthState): boolean => !!user;

export const isGuest = ({ user }: AuthGuardAuthState): boolean => !user;

export const isVerified = ({ user, isEmailVerified }: AuthGuardAuthState): boolean =>
  !!user && isEmailVerified;

export const hasRole =
  (roles: UserRole[]) =>
  ({ user }: AuthGuardAuthState): boolean =>
    !!user && roles.includes(user.role);
