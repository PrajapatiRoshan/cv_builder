import { getAllSkillDetailQueryFn } from '@/libs/api';
import { useQuery } from '@tanstack/react-query';

const useGetAllSkills = () =>
  useQuery({
    queryKey: ['AllSkills'],
    queryFn: getAllSkillDetailQueryFn,
    staleTime: 1000 * 60,
    retry: 1,
  });

export default useGetAllSkills;

