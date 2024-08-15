'use client';

import Link from 'next/link';
import Button from '@/app/_atoms/Button';

export default function GigsButton() {
  return (
    <Link href="/gigs">
      <Button className="w-full shadow-md bg-gradient-to-r from-red-600 to-violet-600 font-semibold py-2 text-white hover:opacity-85 justify-center">
        Svirke
      </Button>
    </Link>
  );
}
