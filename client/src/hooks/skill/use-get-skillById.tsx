import { getSkillByIdQueryFn } from '@/libs/api';
import { useQuery } from '@tanstack/react-query';

const useGetSkillById = ({ id }: { id?: string }) => {
  return useQuery({
    queryKey: ['skillId', id],
    queryFn: ({ queryKey }) => {
      const [, skillId] = queryKey;
      if (!skillId) return;
      return getSkillByIdQueryFn(skillId);
    },
    enabled: !!id,
    staleTime: 1000 * 60,
    retry: 1,
  });
};

export default useGetSkillById;

