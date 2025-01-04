import { useQuery } from '@tanstack/react-query';
import { GigDB } from '@/types/types';

function fetchGigs(): Promise<GigDB[]> {
  return fetch('/api/gigs').then((res) => res.json());
}

export function useGigsQuery() {
  return useQuery({
    queryKey: ['gigs'],
    queryFn: fetchGigs,
  });
}
