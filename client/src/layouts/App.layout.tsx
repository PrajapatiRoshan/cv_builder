import { AuthProvider } from '@/context/auth-provider.context';
import { Outlet } from 'react-router';

const AppLayout = () => (
  <AuthProvider>
    <Outlet />
  </AuthProvider>
);

export default AppLayout;

