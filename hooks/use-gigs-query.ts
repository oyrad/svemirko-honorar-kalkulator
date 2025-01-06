import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { Gig } from '@/types/types';

async function getGigs(): Promise<Array<Gig>> {
  const res = await fetch('/api/gigs');
  return await res.json();
}

export function useGigsQuery(
  options?: Omit<UseQueryOptions<Array<Gig>, Error>, 'queryKey' | 'queryFn'>,
) {
  return useQuery({
    queryKey: ['gigs'],
    queryFn: getGigs,
    staleTime: 1000 * 60 * 5,
    ...options,
  });
}
