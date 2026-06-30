import type { UserRole } from '@constants/auth.constants';

import type { AuthGuardAuthState } from './AuthGuard.types';

export const isAuthenticated = ({ user }: AuthGuardAuthState): boolean => {
  return !!user;
};

export const isGuest = ({ user }: AuthGuardAuthState): boolean => {
  return !user;
};

export const isVerified = ({ user, isEmailVerified }: AuthGuardAuthState): boolean => {
  return !!user && isEmailVerified;
};

export const hasRole = (roles: UserRole[]) => {
  return ({ user }: AuthGuardAuthState): boolean => {
    return !!user && roles.includes(user.role);
  };
};
