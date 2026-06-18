import { createBrowserRouter, Navigate } from 'react-router-dom';

import { ROUTES } from '@constants/route.constants';
import { ErrorPage } from '@pages/ErrorPage';

import { RouteGuard } from './RouteGuard';

const LoginPlaceholder = () => <div>Login UI</div>;
const SignupPlaceholder = () => <div>Register UI</div>;
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
            element: <LoginPlaceholder />,
          },
          {
            path: ROUTES.AUTH.SIGNUP,
            element: <SignupPlaceholder />,
          },
        ],
      },

      {
        element: <RouteGuard isProtected={true} />,
        children: [
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
