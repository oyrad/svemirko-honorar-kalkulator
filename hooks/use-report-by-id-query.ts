import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { Report } from '@/types/types';
import { queryKeys } from '@/utils/query-keys';

async function getReportById(id: string): Promise<Report> {
  const res = await fetch(`/api/reports/${id}`);

  if (res.status === 200) {
    return res.json();
  } else {
    throw new Error('Report not found');
  }
}

export function useReportByIdQuery(
  id: string,
  options?: Omit<UseQueryOptions<Report, Error>, 'queryKey' | 'queryFn'>,
) {
  return useQuery({
    queryKey: queryKeys.reportById(id),
    queryFn: () => getReportById(id),
    enabled: !!id,
    retry: false,
    ...options,
  });
}
