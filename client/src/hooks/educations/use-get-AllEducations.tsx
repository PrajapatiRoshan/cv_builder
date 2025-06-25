import { getAllEducationDetailQueryFn } from '@/libs/api';
import { useQuery } from '@tanstack/react-query';

const useGetAllEducations = () => {
  return useQuery({
    queryKey: ['AllEducation'],
    queryFn: getAllEducationDetailQueryFn,
    staleTime: 1000 * 60,
    retry: 1,
  });
};

export default useGetAllEducations;

