'use client';

import Link from 'next/link';
import Card from '@/app/_atoms/Card';
import Loader from '@/app/_atoms/Loader';
import { LockOpenIcon } from '@heroicons/react/24/outline';
import { useQuery } from 'react-query';
import { ReportDB } from '@/types/types';

export default function ReportList() {
  const { data: reports, isLoading } = useQuery('reports', async () => {
    const res = await fetch(`/api/reports`);
    return res.json();
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col gap-2">
      {reports.map((report: ReportDB) => (
        <Link key={report._id} href={`/report/${report._id}`}>
          <Card className="py-3 cursor-pointer shadow-md hover:opacity-65 transition-opacity duration-300 flex justify-between items-center">
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
