import { getAllTemplateQueryFn } from '@/libs/api';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

const useGetAllTemplateHook = (skip = false) => {
  const query = useQuery({
    queryKey: ['userTemplates'],
    queryFn: getAllTemplateQueryFn,
    staleTime: 1000 * 60,
    placeholderData: skip ? undefined : keepPreviousData,
    enabled: !skip,
  });
  return query;
};

export default useGetAllTemplateHook;

