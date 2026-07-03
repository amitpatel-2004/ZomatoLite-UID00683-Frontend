import type { UserRole } from '@pages/auth/types/auth.types';

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

export const isUnverified = ({ user, isEmailVerified }: AuthGuardAuthState): boolean => {
  return !!user && !isEmailVerified;
};

export const hasRole = (roles: UserRole[]) => {
  return ({ user }: AuthGuardAuthState): boolean => {
    return !!user && roles.includes(user.role);
  };
};
