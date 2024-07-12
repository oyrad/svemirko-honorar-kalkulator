'use client';

import Link from 'next/link';

export default function NewReportButton() {
  return (
    <Link href="/report/create">
      <button className="w-full bg-gradient-to-r from-green-600 to-blue-600 font-semibold py-2 rounded-lg text-white hover:opacity-85 transition-opacity duration-300 outline-none shadow-2xl">
        Novi izračun
      </button>
    </Link>
  );
}
