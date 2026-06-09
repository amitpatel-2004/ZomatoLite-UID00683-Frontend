import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { RouteGuard } from './RouteGuard';
import { ROUTES } from '@constants';

describe('RouteGuard Component Layout Core Guard Suites', () => {
  const futureFlags = {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  };

  it('redirects to login route when an unauthenticated user accesses a protected path', () => {
    render(
      <MemoryRouter initialEntries={[ROUTES.RESTAURANT.DASHBOARD]} future={futureFlags}>
        <Routes>
          <Route element={<RouteGuard isProtected={true} />}>
            <Route path={ROUTES.RESTAURANT.DASHBOARD} element={<div>Protected Dashboard</div>} />
          </Route>

          <Route path={ROUTES.AUTH.LOGIN} element={<div>Public Login Screen</div>} />
        </Routes>
      </MemoryRouter>,
    );

    // Now React Router matches /restaurant/dashboard, hits the guard, and executes the swap to /auth/login
    expect(screen.getByText('Public Login Screen')).toBeInTheDocument();
    expect(screen.queryByText('Protected Dashboard')).not.toBeInTheDocument();
  });

  it('renders child content for unprotected routes', () => {
    render(
      <MemoryRouter initialEntries={[ROUTES.AUTH.SIGNUP]} future={futureFlags}>
        <Routes>
          <Route element={<RouteGuard isProtected={false} />}>
            <Route path={ROUTES.AUTH.SIGNUP} element={<div>Public Signup Content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText('Public Signup Content')).toBeInTheDocument();
  });

  it('renders public routes when user is not authenticated', () => {
    render(
      <MemoryRouter initialEntries={[ROUTES.AUTH.LOGIN]} future={futureFlags}>
        <Routes>
          <Route path={ROUTES.AUTH.LOGIN} element={<RouteGuard isProtected={false} />}>
            <Route index element={<div>Public Login UI</div>} />
          </Route>
          <Route path={ROUTES.RESTAURANT.DASHBOARD} element={<div>Home Dashboard UI</div>} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText('Public Login UI')).toBeInTheDocument();
  });
});
