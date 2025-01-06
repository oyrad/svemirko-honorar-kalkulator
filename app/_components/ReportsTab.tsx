'use client';

import Link from 'next/link';
import { LockOpenIcon } from '@heroicons/react/24/outline';
import { useReportsQuery } from '@/hooks/use-reports-query';
import { Loader } from '@/app/_atoms/Loader';
import { Card } from '@/app/_atoms/Card';
import { Button } from '@/app/_atoms/Button';
import { PlusIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import { YearSelect } from '@/app/_components/YearSelect';
import { useSelectedYearStore } from '@/app/stores/use-selected-year-store';

export function ReportsTab() {
  const { selectedYear } = useSelectedYearStore();

  const { data: reports, isPending } = useReportsQuery({
    select: (data) => data.filter((report) => report.year === selectedYear),
  });

  const { push } = useRouter();

  if (isPending) {
    return <Loader />;
  }

  return (
    <>
      <div className="flex justify-between items-end">
        <YearSelect />
        <Button
          onClick={() => push('/report/create')}
          className="border border-emerald-500 py-1.5 hover:opacity-70 bg-white"
        >
          <PlusIcon className="size-[1.1rem]" />
        </Button>
      </div>

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
    </>
  );
}
