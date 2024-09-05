import { useQuery } from 'react-query';

export function useGigs() {
  return useQuery(
    'gigs',
    async () => {
      const res = await fetch('/api/gigs');
      return res.json();
    },
    {
      cacheTime: 0,
    },
  );
}
