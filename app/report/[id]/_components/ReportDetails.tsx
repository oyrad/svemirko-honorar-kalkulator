import Link from 'next/link';
import Button from '@/app/_atoms/Button';
import Card from '@/app/_atoms/Card';
import OverviewItem from '@/app/report/[id]/_components/OverviewItem';
import { getNetRoyalties, getTotalExpenses } from '@/libs/utils';
import PersonCard from '@/app/_components/PersonCard';
import { ReportDB } from '@/types/types';
import { useRouter, useSearchParams } from 'next/navigation';
import useMembers from '@/hooks/useMembers';
import {
  LockClosedIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import { MoonLoader } from 'react-spinners';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

interface ReportDetailsProps {
  report: ReportDB;
  refetchReport: () => void;
}

export default function ReportDetails({
  report,
  refetchReport,
}: ReportDetailsProps) {
  const [isReportLockingLoading, setIsReportLockingLoading] = useState(false);

  const router = useRouter();
  const from = useSearchParams().get('from');

  const members = useMembers({ split: report?.split ?? 'deal' });

  const netRoyalties = getNetRoyalties(
    report?.grossRoyalties ?? '',
    report?.isThereBookingFee ?? false,
    report?.expenses ?? [],
  );

  function handleDelete() {
    fetch(`/api/reports/${report._id}`, {
      method: 'DELETE',
    }).then((res) => {
      if (res.status === 200) {
        router.push('/');
      }
    });
  }

  function handleLockReport() {
    setIsReportLockingLoading(true);
    fetch(`/api/reports/${report._id}/confirm`, {
      method: 'PUT',
    }).then(() => {
      refetchReport();
      setIsReportLockingLoading(false);
    });
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href={from === 'gigs' ? '/gigs' : '/'}>
            <Button className="border border-gray-500 bg-white dark:bg-gray-800 px-2 py-1.5 hover:opacity-75">
              <ArrowLeftIcon className="size-5 text-gray-700 dark:text-gray-100" />
            </Button>
          </Link>
          <p className="font-semibold text-xl dark:text-white">{report.name}</p>
        </div>
        {!report.isLocked && (
          <div className="flex gap-2 items-center">
            <Button
              className="border border-green-400 dark:border-green-800 bg-white dark:bg-green-500 px-2 py-1.5 hover:opacity-75"
              onClick={handleLockReport}
            >
              {isReportLockingLoading ? (
                <MoonLoader size={16} />
              ) : (
                <LockClosedIcon className="size-5 text-green-500 dark:text-black" />
              )}
            </Button>

            <Link href={`/report/${report._id}/edit`}>
              <Button className="border border-blue-400 dark:border-blue-800 bg-white dark:bg-blue-500 px-2 py-1.5 hover:opacity-75">
                <PencilSquareIcon className="size-5 text-blue-400 dark:text-black" />
              </Button>
            </Link>

            <Button
              className="border border-red-400 dark:border-red-800 bg-white dark:bg-red-500 px-2 py-1.5 hover:opacity-75"
              onClick={handleDelete}
            >
              <TrashIcon className="size-5 text-red-500 dark:text-black" />
            </Button>
          </div>
        )}
      </div>
      <Card className="flex flex-col gap-4">
        <div className="flex justify-between items-center font-semibold text-lg">
          <p>Honorar</p>
          <p>{report.grossRoyalties}</p>
        </div>

        <hr />

        <div className="text-sm grid grid-cols-2 gap-4 mb-2">
          <OverviewItem
            label="booking fee"
            value={
              report.isThereBookingFee
                ? (parseFloat(report.grossRoyalties) * 0.1).toFixed(2)
                : '-'
            }
          />
          <OverviewItem
            label="podjela"
            value={report.split === 'deal' ? '45/27.5/27.5' : 'Svi isto'}
          />
          <OverviewItem
            label="troškovi"
            value={
              report.expenses.length > 0
                ? getTotalExpenses(report.expenses).toFixed(2)
                : '-'
            }
          />
          <OverviewItem label="zarada" value={netRoyalties.toFixed(2)} />
        </div>
        {report.note && <OverviewItem label="bilješke" value={report.note} />}
        <div className="flex flex-col gap-2 mb-1">
          {members.map((member) => (
            <PersonCard
              key={member.index}
              personIndex={member.index}
              name={member.name}
              rate={member.rate}
              expenses={report.expenses}
              netRoyalties={netRoyalties}
              bgColor={member.bgColor}
              isExpandable={false}
            />
          ))}
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-gray-400 text-right text-xs">
            <span className="opacity-65">Kreirano:</span>{' '}
            {new Date(report.createdAt).toLocaleString('hr-HR')}
          </p>
          {report.createdAt !== report.updatedAt && (
            <p className="text-gray-400 text-right text-xs">
              <span className="opacity-65">Ureðeno:</span>{' '}
              {new Date(report.updatedAt).toLocaleString('hr-HR')}
            </p>
          )}
        </div>
      </Card>
    </>
  );
}
