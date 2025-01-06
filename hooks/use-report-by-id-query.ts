import { useQuery } from '@tanstack/react-query';
import { Report } from '@/types/types';

async function getReportById(id: string): Promise<Report> {
  const res = await fetch(`/api/reports/${id}`);

  if (res.status === 200) {
    return res.json();
  } else {
    throw new Error('Report not found');
  }
}

export function useReportByIdQuery(id: string) {
  return useQuery({
    queryKey: ['reports', id],
    queryFn: () => getReportById(id),
    enabled: !!id,
    retry: false,
  });
}
