import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { Gig } from '@/types/types';
import { queryKeys } from '@/utils/query-keys';

async function getGigById(id: string): Promise<Gig> {
  const res = await fetch(`/api/gigs/${id}`);

  if (res.status === 200) {
    return res.json();
  } else {
    throw new Error('Gig not found');
  }
}

export function useGigByIdQuery(
  id: string,
  options?: Omit<UseQueryOptions<Gig, Error>, 'queryKey' | 'queryFn'>,
) {
  return useQuery({
    queryKey: queryKeys.gigById(id),
    queryFn: () => getGigById(id),
    enabled: !!id,
    retry: false,
    ...options,
  });
}
