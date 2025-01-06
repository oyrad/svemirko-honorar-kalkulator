import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { Report } from '@/types/types';

async function getReports(): Promise<Array<Report>> {
  const res = await fetch('/api/reports');
  return await res.json();
}

export function useReportsQuery(
  options?: Omit<UseQueryOptions<Array<Report>, Error>, 'queryKey' | 'queryFn'>,
) {
  return useQuery({
    queryKey: ['reports'],
    queryFn: getReports,
    staleTime: 1000 * 60 * 5,
    ...options,
  });
}
