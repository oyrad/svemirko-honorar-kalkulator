import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { ReportDB } from '@/types/types';

async function getReports(): Promise<ReportDB[]> {
  const res = await fetch('/api/reports');
  return await res.json();
}

export function useReportsQuery(
  options?: Omit<UseQueryOptions<ReportDB[], Error>, 'queryKey' | 'queryFn'>,
) {
  return useQuery({
    queryKey: ['reports'],
    queryFn: getReports,
    ...options,
  });
}
