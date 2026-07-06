import { createBrowserRouter, Navigate } from 'react-router-dom';

import { ROUTES } from '@constants/route.constants';
import { AppLayout } from '@layouts/AppLayout';
import { CenteredLayout } from '@layouts/CenteredLayout';
import { USER_ROLES } from '@pages/auth/constants/auth.constants';
import { LoginContainer } from '@pages/auth/containers/LoginContainer';
import { RegisterContainer } from '@pages/auth/containers/RegisterContainer';
import { VerifyEmailContainer } from '@pages/auth/containers/VerifyEmailContainer';
import { ErrorContainer } from '@pages/error/containers/ErrorContainer';
import { DashboardContainer } from '@pages/restaurants/containers/DashboardContainer';
import { RestaurantDetailContainer } from '@pages/restaurants/containers/RestaurantDetailContainer';

import { AuthGuard } from './guards/AuthGuard';
import {
  hasRole,
  isAuthenticated,
  isGuest,
  isUnverified,
  isVerified,
} from './guards/authGuardChecks';

export const router = createBrowserRouter([
  {
    path: '/',
    errorElement: (
      <CenteredLayout>
        <ErrorContainer />
      </CenteredLayout>
    ),
    children: [
      { index: true, element: <Navigate to={ROUTES.RESTAURANT.DASHBOARD} replace /> },

      {
        element: <AuthGuard accessCheck={isGuest} fallbackPath={ROUTES.RESTAURANT.DASHBOARD} />,
        children: [
          {
            path: ROUTES.AUTH.LOGIN,
            element: (
              <CenteredLayout>
                <LoginContainer />
              </CenteredLayout>
            ),
          },
          {
            path: ROUTES.AUTH.REGISTER,
            element: (
              <CenteredLayout>
                <RegisterContainer />
              </CenteredLayout>
            ),
          },
        ],
      },

      {
        element: <AuthGuard accessCheck={isAuthenticated} fallbackPath={ROUTES.AUTH.LOGIN} />,
        children: [
          {
            element: (
              <AuthGuard accessCheck={isUnverified} fallbackPath={ROUTES.RESTAURANT.DASHBOARD} />
            ),
            children: [
              {
                path: ROUTES.AUTH.VERIFY_EMAIL,
                element: (
                  <CenteredLayout>
                    <VerifyEmailContainer />
                  </CenteredLayout>
                ),
              },
            ],
          },
          {
            element: <AuthGuard accessCheck={isVerified} fallbackPath={ROUTES.AUTH.VERIFY_EMAIL} />,
            children: [
              {
                element: (
                  <AuthGuard
                    accessCheck={hasRole([USER_ROLES.OWNER])}
                    fallbackPath={ROUTES.ERROR.NOT_FOUND}
                  />
                ),
                children: [
                  {
                    path: ROUTES.RESTAURANT.DASHBOARD,
                    element: (
                      <AppLayout>
                        <DashboardContainer />
                      </AppLayout>
                    ),
                  },
                ],
              },
              {
                path: ROUTES.RESTAURANT.DETAIL(':id'),
                element: (
                  <AppLayout>
                    <RestaurantDetailContainer />
                  </AppLayout>
                ),
              },
            ],
          },
        ],
      },

      {
        path: ROUTES.ERROR.NOT_FOUND,
        element: (
          <CenteredLayout>
            <ErrorContainer />
          </CenteredLayout>
        ),
      },
      {
        path: '*',
        element: (
          <CenteredLayout>
            <ErrorContainer />
          </CenteredLayout>
        ),
      },
    ],
  },
]);
