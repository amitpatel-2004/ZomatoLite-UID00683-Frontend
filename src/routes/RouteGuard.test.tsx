import React from 'react';

import { onAuthStateChanged } from 'firebase/auth';
import { useSelector } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { ROUTES } from '@constants/route.constants';
import { render, screen } from '@testing-library/react';

import { RouteGuard } from './RouteGuard';

import '@testing-library/jest-dom';

jest.mock('firebase/auth', () => ({
  onAuthStateChanged: jest.fn(),
}));

jest.mock('@core/firebase', () => ({
  firebaseAuth: {},
}));

jest.mock('react-redux', () => ({
  useDispatch: () => jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('antd', () => ({
  Spin: () => null,
}));

const mockOnAuthStateChanged = jest.mocked(onAuthStateChanged);
const mockUseSelector = jest.mocked(useSelector);

const TEXT = {
  LOGIN: 'Login Screen',
  SIGNUP: 'Signup Screen',
  DASHBOARD: 'Dashboard',
};

const loginRoute = <Route path={ROUTES.AUTH.LOGIN} element={<div>{TEXT.LOGIN}</div>} />;
const signupRoute = <Route path={ROUTES.AUTH.REGISTER} element={<div>{TEXT.SIGNUP}</div>} />;
const dashboardRoute = (
  <Route path={ROUTES.RESTAURANT.DASHBOARD} element={<div>{TEXT.DASHBOARD}</div>} />
);

const setupAuthMocks = (isAuthenticated: boolean) => {
  const mockUser = isAuthenticated
    ? { _id: '1', email: 'test@test.com', displayName: 'Test', role: 'customer' }
    : null;

  mockUseSelector.mockImplementation((selector: (state: unknown) => unknown) =>
    selector({ auth: { user: mockUser, isEmailVerified: isAuthenticated } }),
  );

  mockOnAuthStateChanged.mockImplementation((_auth, nextOrObserver) => {
    if (typeof nextOrObserver === 'function') {
      nextOrObserver(null);
    }
    return jest.fn();
  });
};

const renderGuard = (
  guardProps: { isProtected: boolean; isAuthenticated?: boolean },
  guardedRoute: React.ReactElement,
  entry: string,
  extraRoutes?: React.ReactElement,
) => {
  const { isAuthenticated = false, ...routeProps } = guardProps;
  setupAuthMocks(isAuthenticated);

  return render(
    <MemoryRouter initialEntries={[entry]}>
      <Routes>
        <Route element={<RouteGuard {...routeProps} />}>{guardedRoute}</Route>
        {extraRoutes}
      </Routes>
    </MemoryRouter>,
  );
};

describe('RouteGuard Component Layout Core Guard Suites', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should redirect to login route when an unauthenticated user accesses a protected path', () => {
    renderGuard({ isProtected: true }, dashboardRoute, ROUTES.RESTAURANT.DASHBOARD, loginRoute);

    expect(screen.getByText(TEXT.LOGIN)).toBeVisible();
    expect(screen.queryByText(TEXT.DASHBOARD)).not.toBeInTheDocument();
  });

  it('should render child content for unprotected routes', () => {
    renderGuard({ isProtected: false }, signupRoute, ROUTES.AUTH.REGISTER);

    expect(screen.getByText(TEXT.SIGNUP)).toBeVisible();
  });

  it('should render public routes when user is not authenticated', () => {
    renderGuard({ isProtected: false }, loginRoute, ROUTES.AUTH.LOGIN, dashboardRoute);

    expect(screen.getByText(TEXT.LOGIN)).toBeVisible();
  });

  it('should redirect authenticated user to dashboard when trying to access public routes', () => {
    renderGuard(
      { isProtected: false, isAuthenticated: true },
      loginRoute,
      ROUTES.AUTH.LOGIN,
      dashboardRoute,
    );

    expect(screen.getByText(TEXT.DASHBOARD)).toBeVisible();
    expect(screen.queryByText(TEXT.LOGIN)).not.toBeInTheDocument();
  });
});
