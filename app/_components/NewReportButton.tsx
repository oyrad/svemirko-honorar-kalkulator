'use client';

import { useRouter } from 'next/navigation';

export default function NewReportButton() {
  const router = useRouter();

  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full transition-colors duration-300 ease-in-out"
      onClick={() => router.push('/create')}
    >
      New Report
    </button>
  );
}
