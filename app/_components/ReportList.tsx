'use client';

import Link from 'next/link';
import Card from '@/app/_atoms/Card';
import Loader from '@/app/_atoms/Loader';
import { LockOpenIcon } from '@heroicons/react/24/outline';
import { useReportsQuery } from '@/hooks/useReportsQuery';

export default function ReportList() {
  const { data: reports, isPending } = useReportsQuery();

  if (isPending) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col gap-2">
      {reports?.map((report) => (
        <Link key={report._id} href={`/report/${report._id}?from=reports`}>
          <Card className="py-3 cursor-pointer shadow-md hover:opacity-75 transition-opacity duration-300 flex justify-between items-center">
            <p className="font-medium">{report.name}</p>
            {!report.isLocked && (
              <LockOpenIcon className="size-5 text-gray-700 dark:text-gray-300" />
            )}
          </Card>
        </Link>
      ))}
    </div>
  );
}
