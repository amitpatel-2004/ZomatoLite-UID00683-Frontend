import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import type { RouteGuardProps } from './routeGuard.types';
import { ROUTES } from '@constants';

export const RouteGuard: React.FC<RouteGuardProps> = ({ isProtected }) => {
  // TODO: Check actual user authentication status later
  const isAuthenticated = false;

  if (isProtected && !isAuthenticated) {
    return <Navigate to={ROUTES.AUTH.LOGIN} replace />;
  }

  if (!isProtected && isAuthenticated) {
    return <Navigate to={ROUTES.RESTAURANT.DASHBOARD} replace />;
  }

  return <Outlet />;
};
