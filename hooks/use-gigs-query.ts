import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { GigDB } from '@/types/types';

async function getGigs(): Promise<GigDB[]> {
  const res = await fetch('/api/gigs');
  return await res.json();
}

export function useGigsQuery(
  options?: Omit<UseQueryOptions<GigDB[], Error>, 'queryKey' | 'queryFn'>,
) {
  return useQuery({
    queryKey: ['gigs'],
    queryFn: getGigs,
    ...options,
  });
}
