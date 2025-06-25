import { getAllProejctDetailQueryFn } from '@/libs/api';
import { useQuery } from '@tanstack/react-query';

const useGetAllProject = () =>
  useQuery({
    queryKey: ['AllProjects'],
    queryFn: getAllProejctDetailQueryFn,
    staleTime: 1000 * 60,
    retry: 1,
  });

export default useGetAllProject;

