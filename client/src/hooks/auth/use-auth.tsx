import { getCurrentUserQueryFn } from '@/libs/api';
import { useQuery } from '@tanstack/react-query';

const useAuth = () =>
  useQuery({
    queryKey: ['authUser'],
    queryFn: getCurrentUserQueryFn,
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: true,
    refetchOnMount: 'always',
    refetchOnReconnect: true,
  });

export default useAuth;

