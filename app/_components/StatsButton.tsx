'use client';

import { ChartBarIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/_atoms/Button';
import { useRouter } from 'next/navigation';

export function StatsButton() {
  const { push } = useRouter();

  return (
    <Button className="hover:opacity-80" onClick={() => push('/stats')}>
      <ChartBarIcon className="w-6 h-6" />
    </Button>
  );
}
