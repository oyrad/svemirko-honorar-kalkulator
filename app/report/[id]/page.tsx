'use client';

import ArrowLeft from '@/app/_icons/ArrowLeft';
import { useRouter } from 'next/navigation';

const reportMock = {
  name: 'sarajevo i bl',
};

export default function ReportDetails() {
  const router = useRouter();
  return (
    <>
      <div className="flex gap-4 items-center">
        <ArrowLeft onClick={() => router.push('/')} />
        <p className="font-semibold text-lg">{reportMock.name}</p>
      </div>
    </>
  );
}
