import { getWorkExpByIdQueryFn } from '@/libs/api';
import { useQuery } from '@tanstack/react-query';

const useGetExperienceById = ({ id }: { id?: string }) =>
  useQuery({
    queryKey: ['experienceById', id],
    queryFn: ({ queryKey }) => {
      const [, workExpId] = queryKey;
      if (!workExpId) return;
      return getWorkExpByIdQueryFn(workExpId);
    },
    enabled: !!id,
    staleTime: 1000 * 60,
    retry: 1,
  });

export default useGetExperienceById;

