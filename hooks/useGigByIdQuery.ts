import { useQuery } from '@tanstack/react-query';
import { GigDB } from '@/types/types';

function fetchGigById(id: string): Promise<GigDB> {
  return fetch(`/api/gigs/${id}`).then((res) => {
    if (res.status === 200) {
      return res.json();
    } else {
      throw new Error('Gig not found');
    }
  });
}

export function useGigByIdQuery(id: string) {
  return useQuery({
    queryKey: ['gigs', id],
    queryFn: () => fetchGigById(id),
    enabled: !!id,
    retry: false,
  });
}
