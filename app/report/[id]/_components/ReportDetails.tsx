import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { LockClosedIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { MoonLoader } from 'react-spinners';
import { getMembers } from '@/utils/get-members';
import { useDeleteReportMutation } from '@/hooks/use-delete-report-mutation';
import { useLockReportMutation } from '@/hooks/use-lock-report-mutation';
import { Button } from '@/ui/atoms/Button';
import { Card } from '@/ui/atoms/Card';
import { PersonCard } from '@/ui/components/PersonCard';
import { getNetRoyalties, getTotalExpenses } from '@/utils/royalties-utils';
import { OverviewItem } from '@/app/report/[id]/_components/OverviewItem';
import { BackButton } from '@/ui/components/BackButton';
import { tabSearchString } from '@/hooks/use-selected-tab-query-param';
import { Report } from '@/types/types';

interface ReportDetailsProps {
  report: Report;
}

export function ReportDetails({ report }: ReportDetailsProps) {
  const from = useSearchParams().get('from');

  const { mutate: deleteReport, isPending: isDeleteLoading } = useDeleteReportMutation(report._id);

  const { mutate: lockReport, isPending: isLockLoading } = useLockReportMutation(report._id);

  const members = getMembers(report?.split ?? 'deal');

  const netRoyalties = getNetRoyalties(
    report.grossRoyalties ?? '',
    report.isThereBookingFee ?? false,
    report.expenses ?? [],
  );

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <BackButton link={from === 'gigs' ? `/?${tabSearchString}=gigs` : '/'} />
          <p className="font-semibold text-xl dark:text-white text-ellipsis">{report.name}</p>
        </div>
        {!report.isLocked && (
          <div className="flex gap-2 items-center">
            <Button
              className="border border-green-400 dark:border-green-800 bg-white dark:bg-green-500 px-2 py-1.5 hover:opacity-75"
              onClick={() => lockReport()}
            >
              {isLockLoading ? (
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
              onClick={() => deleteReport()}
            >
              {isDeleteLoading ? (
                <MoonLoader size={16} />
              ) : (
                <TrashIcon className="size-5 text-red-500 dark:text-black" />
              )}
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
              report.isThereBookingFee ? (parseFloat(report.grossRoyalties) * 0.1).toFixed(2) : '-'
            }
          />
          <OverviewItem
            label="podjela"
            value={report.split === 'deal' ? '45/27.5/27.5' : 'Svi isto'}
          />
          <OverviewItem
            label="troškovi"
            value={report.expenses.length > 0 ? getTotalExpenses(report.expenses).toFixed(2) : '-'}
          />
          <OverviewItem label="zarada" value={netRoyalties.toFixed(2)} />
        </div>
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
