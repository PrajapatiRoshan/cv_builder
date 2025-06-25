import { getAllUserDetailsQueryFn } from '@/libs/api';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

const useGetAllUSerDetails = (skip = false) =>
  useQuery({
    queryKey: ['userDetails'],
    queryFn: getAllUserDetailsQueryFn,
    staleTime: 1000 * 60,
    placeholderData: skip ? undefined : keepPreviousData,
    enabled: !skip,
  });

export default useGetAllUSerDetails;

