import { getAllWorkExpDetailQueryFn } from '@/libs/api';
import { useQuery } from '@tanstack/react-query';

const useGetAllWorkExperience = () =>
  useQuery({
    queryKey: ['AllExperience'],
    queryFn: getAllWorkExpDetailQueryFn,
    staleTime: 1000 * 60,
    retry: 1,
  });

export default useGetAllWorkExperience;

