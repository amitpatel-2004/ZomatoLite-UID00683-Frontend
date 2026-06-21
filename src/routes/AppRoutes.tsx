import { createBrowserRouter, Navigate } from 'react-router-dom';

import { ErrorComponent } from '@components/ErrorComponent';
import { ROUTES } from '@constants/route.constants';
import { CenteredLayout } from '@layouts/CenteredLayout';
import { LoginContainer, RegisterContainer, VerifyEmailContainer } from '@pages/auth';

import { RouteGuard } from './RouteGuard';

const DashboardPlaceholder = () => <div>Restaurant Dashboard UI</div>;

export const router = createBrowserRouter([
  {
    path: '/',
    errorElement: (
      <CenteredLayout>
        <ErrorComponent />
      </CenteredLayout>
    ),
    children: [
      {
        index: true,
        element: <Navigate to={ROUTES.RESTAURANT.DASHBOARD} replace />,
      },

      {
        element: <RouteGuard isProtected={false} />,
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
        element: <RouteGuard isProtected={true} />,
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
            path: ROUTES.RESTAURANT.DASHBOARD,
            element: <DashboardPlaceholder />,
          },
        ],
      },

      {
        path: ROUTES.ERROR.NOT_FOUND,
        element: (
          <CenteredLayout>
            <ErrorComponent />
          </CenteredLayout>
        ),
      },
      {
        path: '*',
        element: (
          <CenteredLayout>
            <ErrorComponent />
          </CenteredLayout>
        ),
      },
    ],
  },
]);
