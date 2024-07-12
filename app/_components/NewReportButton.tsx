'use client';

import { useRouter } from 'next/navigation';

export default function NewReportButton() {
  const router = useRouter();

  return (
    <button
      className="w-full bg-gradient-to-r from-green-600 to-blue-600 font-semibold py-2 rounded-lg text-white hover:opacity-85 transition-opacity duration-300 outline-none shadow-2xl"
      onClick={() => router.push('/report/create')}
    >
      Novi izračun
    </button>
  );
}
