import { createBrowserRouter, Outlet, RouterProvider } from 'react-router';
import { lazy, Suspense } from 'react';

const SignUp = lazy(() => import('./pages/auth/SignUp'));
const SignInView = lazy(() => import('./pages/auth/SignIn'));
const NotFoundView = lazy(() => import('./pages/NotFoundView'));
const AuthLayout = lazy(() => import('./layouts/AuthLayout'));
const RenderFallBack = lazy(() => import('./components/RenderFallBack'));
const DashboardLayout = lazy(() => import('./layouts/DashboardLayout'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

const router = createBrowserRouter([
  {
    path: '/dashboard',
    element: (
      <DashboardLayout>
        <Suspense fallback={<RenderFallBack />}>
          <Outlet />
        </Suspense>
      </DashboardLayout>
    ),
    children: [
      {
        index: true,
        Component: Dashboard,
      },
    ],
  },
  {
    element: (
      <AuthLayout>
        <Suspense fallback={<RenderFallBack />}>
          <Outlet />
        </Suspense>
      </AuthLayout>
    ),
    children: [
      {
        path: 'sign-up',
        Component: SignUp,
      },
      {
        path: 'sign-in',
        Component: SignInView,
      },
    ],
  },
  {
    path: '*',
    Component: NotFoundView,
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};

