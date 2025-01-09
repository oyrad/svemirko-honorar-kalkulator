import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { Report } from '@/types/types';
import { queryKeys } from '@/utils/query-keys';

async function getReports(): Promise<Array<Report>> {
  const res = await fetch('/api/reports');
  return await res.json();
}

export function useReportsQuery(
  options?: Omit<UseQueryOptions<Array<Report>, Error>, 'queryKey' | 'queryFn'>,
) {
  return useQuery({
    queryKey: queryKeys.reports,
    queryFn: getReports,
    staleTime: 1000 * 60 * 5,
    ...options,
  });
}
