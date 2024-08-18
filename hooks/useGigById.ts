import { useQuery } from 'react-query';

export function useGigById(id: string | null) {
  return useQuery(
    `gig-${id}`,
    async () => {
      const res = await fetch(`/api/gigs/${id}`);
      if (res.status === 200) {
        return res.json();
      } else {
        throw new Error('Gig not found');
      }
    },
    {
      enabled: !!id,
    },
  );
}
