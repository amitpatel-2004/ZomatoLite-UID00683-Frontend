import type { NavigateFunction } from 'react-router-dom';

import type { AuthUser, UserRole } from '@appTypes/auth.types';

export type RouteGuardProps = {
  isProtected: boolean;
  redirectTo?: string;
  allowedRoles?: UserRole[];
  onUnauthorized?: (user: AuthUser, navigate: NavigateFunction) => void;
};
