import useAuth from '@/hooks/auth/use-auth';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { isAuthRoute, PROTECTED_ROUTES } from './common/routesPath';
import AuthLayout from '@/layouts/AuthLayout';
import { Suspense } from 'react';
import RenderFallBack from '@/components/RenderFallBack';
import DashboardLayout from '@/layouts/DashboardLayout';

const AuthRoute = () => {
  const location = useLocation();
  const { data: authData, isLoading } = useAuth();
  const user = authData?.user;

  const _isAuthRoute = isAuthRoute(location.pathname);

  if (isLoading && !_isAuthRoute)
    return (
      <DashboardLayout>
        <Suspense fallback={<RenderFallBack />}>
          <Outlet />
        </Suspense>
      </DashboardLayout>
    );

  if (!user)
    return (
      <AuthLayout>
        <Suspense fallback={<RenderFallBack />}>
          <Outlet />
        </Suspense>
      </AuthLayout>
    );

  return <Navigate to={PROTECTED_ROUTES.USER} replace />;
};

export default AuthRoute;

