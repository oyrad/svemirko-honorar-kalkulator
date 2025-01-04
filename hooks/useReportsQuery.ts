import { useQuery } from '@tanstack/react-query';
import { ReportDB } from '@/types/types';

function fetchReports(): Promise<ReportDB[]> {
  return fetch('/api/reports').then((res) => res.json());
}

export function useReportsQuery() {
  return useQuery({
    queryKey: ['reports'],
    queryFn: fetchReports,
  });
}
