import { Navigate, Outlet } from 'react-router-dom';

import { ROUTES } from '@constants/route.constants';

import type { RouteGuardProps } from './RouteGuard.types';

export const RouteGuard = ({ isProtected, isAuthenticated = false }: RouteGuardProps) => {
  if (isProtected && !isAuthenticated) {
    return <Navigate to={ROUTES.AUTH.LOGIN} replace />;
  }

  if (!isProtected && isAuthenticated) {
    return <Navigate to={ROUTES.RESTAURANT.DASHBOARD} replace />;
  }

  return <Outlet />;
};
