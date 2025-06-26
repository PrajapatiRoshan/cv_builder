import { getUserDetailQueryFn } from '@/libs/api';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

const useGetUserDetailQuery = ({ skip = false }: { skip?: boolean }) =>
  useQuery({
    queryKey: ['userDetail'],
    queryFn: getUserDetailQueryFn,
    staleTime: 0,
    placeholderData: skip ? undefined : keepPreviousData,
    enabled: !skip,
  });

export default useGetUserDetailQuery;

