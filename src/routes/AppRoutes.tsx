import { createBrowserRouter, Navigate } from 'react-router-dom';

import { MESSAGES } from '@constants/message.constants';
import { ROUTES } from '@constants/route.constants';
import { CenteredLayout } from '@layouts/CenteredLayout';
import { LoginContainer, RegisterContainer, VerifyEmailContainer } from '@pages/auth';
import { ErrorPage } from '@pages/ErrorPage';

import { RouteGuard } from './RouteGuard';

const DashboardPlaceholder = () => <div>Restaurant Dashboard UI</div>;

export const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage />,
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
              <CenteredLayout
                subtitle={MESSAGES.PAGE_TITLES.LOGIN_SUBTITLE}
                title={MESSAGES.PAGE_TITLES.LOGIN}
              >
                <LoginContainer />
              </CenteredLayout>
            ),
          },
          {
            path: ROUTES.AUTH.REGISTER,
            element: (
              <CenteredLayout
                subtitle={MESSAGES.PAGE_TITLES.REGISTER_SUBTITLE}
                title={MESSAGES.PAGE_TITLES.REGISTER}
              >
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
              <CenteredLayout
                subtitle={MESSAGES.PAGE_TITLES.VERIFY_EMAIL_SUBTITLE}
                title={MESSAGES.PAGE_TITLES.VERIFY_EMAIL}
              >
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
        path: '*',
        element: <ErrorPage />,
      },
    ],
  },
]);
