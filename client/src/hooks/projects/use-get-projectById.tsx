import { getProjectByIdQueryFn } from '@/libs/api';
import { useQuery } from '@tanstack/react-query';

const useGetProjectById = ({ id }: { id?: string }) =>
  useQuery({
    queryKey: ['projectById', id],
    queryFn: ({ queryKey }) => {
      const [, projectId] = queryKey;
      if (!projectId) return;
      return getProjectByIdQueryFn(projectId);
    },
    enabled: !!id,
    staleTime: 1000 * 60,
    retry: 1,
  });

export default useGetProjectById;

