import { useQuery } from '@tanstack/react-query';
import { Gig } from '@/types/types';

async function getGigById(id: string): Promise<Gig> {
  const res = await fetch(`/api/gigs/${id}`);

  if (res.status === 200) {
    return res.json();
  } else {
    throw new Error('Gig not found');
  }
}

export function useGigByIdQuery(id: string) {
  return useQuery({
    queryKey: ['gigs', id],
    queryFn: () => getGigById(id),
    enabled: !!id,
    retry: false,
  });
}
