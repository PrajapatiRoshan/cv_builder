import RenderFallBack from '@/components/RenderFallBack';
import useAuth from '@/hooks/auth/use-auth';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
const ProtectedRoute = () => {
  const { data: authData, isLoading } = useAuth();
  const user = authData?.user;

  if (isLoading)
    return (
      <DashboardLayout>
        <Suspense fallback={<RenderFallBack />}>
          <Outlet />
        </Suspense>
      </DashboardLayout>
    );

  return user ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;

