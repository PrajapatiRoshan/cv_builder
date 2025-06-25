import { getEducationByIdQueryFn } from '@/libs/api';
import { useQuery } from '@tanstack/react-query';

const useGetEducationById = ({ id }: { id?: string }) => {
  return useQuery({
    queryKey: ['educationById', id],
    queryFn: ({ queryKey }) => {
      const [, educationId] = queryKey;
      if (!educationId) return;
      return getEducationByIdQueryFn(educationId);
    },
    enabled: !!id,
    staleTime: 1000 * 60,
    retry: 1,
  });
};

export default useGetEducationById;

