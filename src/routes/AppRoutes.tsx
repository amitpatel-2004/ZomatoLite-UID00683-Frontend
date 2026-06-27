import { createBrowserRouter, Navigate } from 'react-router-dom';

import { USER_ROLES } from '@constants/auth.constants';
import { ROUTES } from '@constants/route.constants';
import { AppLayout } from '@layouts/AppLayout';
import { CenteredLayout } from '@layouts/CenteredLayout';
import { LoginContainer, RegisterContainer, VerifyEmailContainer } from '@pages/auth';
import { ErrorContainer } from '@pages/error';
import { DashboardContainer } from '@pages/owner';
import { RestaurantDetailContainer } from '@pages/restaurants';

import { AuthGuard } from './guards/AuthGuard';
import { hasRole, isAuthenticated, isGuest, isVerified } from './guards/authGuardChecks';

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
        element: <AuthGuard check={isGuest} fallbackPath={ROUTES.RESTAURANT.DASHBOARD} />,
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
        element: <AuthGuard check={isAuthenticated} fallbackPath={ROUTES.AUTH.LOGIN} />,
        children: [
          {
            path: ROUTES.AUTH.VERIFY_EMAIL,
            element: (
              <CenteredLayout>
                <VerifyEmailContainer />
              </CenteredLayout>
            ),
          },
          {
            element: <AuthGuard check={isVerified} fallbackPath={ROUTES.AUTH.VERIFY_EMAIL} />,
            children: [
              {
                element: (
                  <AuthGuard
                    check={hasRole([USER_ROLES.OWNER])}
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
