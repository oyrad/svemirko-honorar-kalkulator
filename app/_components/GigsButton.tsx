'use client';

import Link from 'next/link';
import { Button } from '@/app/_atoms/Button';

export function GigsButton() {
  return (
    <Link href="/gigs">
      <Button className="w-full shadow-md bg-gradient-to-r from-red-500 to-violet-500 font-semibold py-2 text-white hover:opacity-85 justify-center">
        Svirke
      </Button>
    </Link>
  );
}
