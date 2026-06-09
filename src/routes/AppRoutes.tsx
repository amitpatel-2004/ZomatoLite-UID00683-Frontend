import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RouteGuard } from '@routes';
import { ROUTES } from '@constants';
import { ErrorPage } from '@pages';

// TODO: Replace placeholders with actual components later
const LoginPlaceholder = () => <div>Login UI</div>;
const HomePlaceholder = () => <div>Home UI</div>;

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RouteGuard isProtected={false} />}>
          <Route path={ROUTES.AUTH.LOGIN} element={<LoginPlaceholder />} />
        </Route>

        <Route element={<RouteGuard isProtected={true} />}>
          <Route path={ROUTES.RESTAURANT.DASHBOARD} element={<HomePlaceholder />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};
