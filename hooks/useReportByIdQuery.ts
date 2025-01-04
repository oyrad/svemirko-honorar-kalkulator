import { useQuery } from '@tanstack/react-query';
import { ReportDB } from '@/types/types';

function fetchReportById(id: string): Promise<ReportDB> {
  return fetch(`/api/reports/${id}`).then((res) => {
    if (res.status === 200) {
      return res.json();
    } else {
      throw new Error('Report not found');
    }
  });
}

export function useReportByIdQuery(id: string) {
  return useQuery({
    queryKey: ['reports', id],
    queryFn: () => fetchReportById(id),
    enabled: !!id,
    retry: false,
  });
}
