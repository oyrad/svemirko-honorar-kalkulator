import { useQuery } from 'react-query';

export function useReports() {
  return useQuery('reports', async () => {
    const res = await fetch(`/api/reports`);
    return res.json();
  });
}
