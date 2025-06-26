import { createContext } from 'react';
import useAuth from '@/hooks/auth/use-auth';
import { AuthContextType } from '@/types/interface';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    data: authData,
    error: authError,
    isLoading,
    isFetching,
    refetch: refetchAuth,
  } = useAuth();

  const user = authData?.user;

  return (
    <AuthContext.Provider
      value={{
        user,
        error: authError,
        isLoading,
        isFetching,
        refetchAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

