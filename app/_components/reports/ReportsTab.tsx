'use client';

import Link from 'next/link';
import { LockOpenIcon } from '@heroicons/react/24/outline';
import { useReportsQuery } from '@/hooks/use-reports-query';
import { Loader } from '@/ui/atoms/Loader';
import { Card } from '@/ui/atoms/Card';
import { Button } from '@/ui/atoms/Button';
import { PlusIcon } from '@heroicons/react/24/solid';
import { useSelectedYearStore } from '@/app/stores/use-selected-year-store';

export function ReportsTab() {
  const { selectedYear } = useSelectedYearStore();

  const { data: reports, isPending } = useReportsQuery({
    select: (data) => data.filter((report) => report.year === selectedYear),
  });

  if (isPending) {
    return <Loader />;
  }

  return (
    <div>
      <Link href={`/report/create`}>
        <Button className="border border-emerald-600 py-1.5 bg-white w-full mb-2 opacity-50 hover:opacity-100 dark:bg-dark-card-background dark:border-gray-600">
          <PlusIcon className="size-7 w-full dark:text-slate-100" />
        </Button>
      </Link>

      {reports?.length ? (
        <div className="flex flex-col gap-2">
          {reports.map((report) => (
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
      ) : (
        <Card>Nema izračuna za odabranu godinu.</Card>
      )}
    </div>
  );
}
