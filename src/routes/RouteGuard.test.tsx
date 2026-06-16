import '@testing-library/jest-dom';

import { ROUTES } from '@constants';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { RouteGuard } from './RouteGuard';

describe('RouteGuard Component Layout Core Guard Suites', () => {
  const renderTestRouter = (ui: React.ReactElement, entry: string) => {
    return render(<MemoryRouter initialEntries={[entry]}>{ui}</MemoryRouter>);
  };

  it('redirects to login route when an unauthenticated user accesses a protected path', () => {
    renderTestRouter(
      <Routes>
        <Route element={<RouteGuard isProtected={true} />}>
          <Route path={ROUTES.RESTAURANT.DASHBOARD} element={<div>Protected Dashboard</div>} />
        </Route>
        <Route path={ROUTES.AUTH.LOGIN} element={<div>Public Login Screen</div>} />
      </Routes>,
      ROUTES.RESTAURANT.DASHBOARD,
    );

    expect(screen.getByText('Public Login Screen')).toBeVisible();
    expect(screen.queryByText('Protected Dashboard')).not.toBeInTheDocument();
  });

  it('renders child content for unprotected routes', () => {
    renderTestRouter(
      <Routes>
        <Route element={<RouteGuard isProtected={false} />}>
          <Route path={ROUTES.AUTH.SIGNUP} element={<div>Public Signup Content</div>} />
        </Route>
      </Routes>,
      ROUTES.AUTH.SIGNUP,
    );

    expect(screen.getByText('Public Signup Content')).toBeVisible();
  });

  it('renders public routes when user is not authenticated', () => {
    renderTestRouter(
      <Routes>
        <Route path={ROUTES.AUTH.LOGIN} element={<RouteGuard isProtected={false} />}>
          <Route index element={<div>Public Login UI</div>} />
        </Route>
        <Route path={ROUTES.RESTAURANT.DASHBOARD} element={<div>Home Dashboard UI</div>} />
      </Routes>,
      ROUTES.AUTH.LOGIN,
    );

    expect(screen.getByText('Public Login UI')).toBeVisible();
  });

  it('redirects authenticated user to dashboard when trying to access public routes', () => {
    renderTestRouter(
      <Routes>
        <Route element={<RouteGuard isProtected={false} isAuthenticated={true} />}>
          <Route path={ROUTES.AUTH.LOGIN} element={<div>Public Login UI</div>} />
        </Route>
        <Route path={ROUTES.RESTAURANT.DASHBOARD} element={<div>Home Dashboard UI</div>} />
      </Routes>,
      ROUTES.AUTH.LOGIN,
    );

    expect(screen.getByText('Home Dashboard UI')).toBeVisible();
    expect(screen.queryByText('Public Login UI')).not.toBeInTheDocument();
  });
});
