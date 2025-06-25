import { AuthProvider } from '@/context/auth-provider.context';
import { Outlet } from 'react-router';

const AppLayout = () => {
  return (
    <>
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    </>
  );
};

export default AppLayout;

