'use client';

import Link from 'next/link';
import Button from '@/app/_atoms/Button';

export default function NewReportButton() {
  return (
    <Link href="/report/create">
      <Button className="w-full shadow-md bg-gradient-to-r from-green-600 to-blue-600 font-semibold py-2 text-white hover:opacity-85 justify-center">
        Novi izračun
      </Button>
    </Link>
  );
}
