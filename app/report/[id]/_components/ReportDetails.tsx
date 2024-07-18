import Link from 'next/link';
import ArrowLeft from '@/app/_icons/ArrowLeft';
import { FLAGS } from '@/libs/flags';
import Button from '@/app/_atoms/Button';
import Edit from '@/app/_icons/Edit';
import Delete from '@/app/_icons/Delete';
import Card from '@/app/_atoms/Card';
import OverviewItem from '@/app/report/[id]/_components/OverviewItem';
import { getNetRoyalties, getTotalExpenses } from '@/libs/utils';
import PersonCard from '@/app/_components/PersonCard';
import { ReportDB } from '@/types/types';
import { useRouter } from 'next/navigation';
import useMembers from '@/hooks/useMembers';
import { clearReportsCache } from '@/app/actions';

interface ReportDetailsProps {
  report: ReportDB;
}

export default function ReportDetails({ report }: ReportDetailsProps) {
  const router = useRouter();
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
        void clearReportsCache();
        router.push('/');
      }
    });
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/">
            <ArrowLeft />
          </Link>
          <p className="font-semibold text-lg dark:text-white">{report.name}</p>
        </div>
        <div className="flex gap-2 items-center">
          {FLAGS.EDIT_REPORT && (
            <Link href={`/report/${report._id}/edit`}>
              <Button className="bg-blue-400 dark:bg-blue-500 px-2 py-1.5 hover:opacity-85">
                <Edit />
              </Button>
            </Link>
          )}
          {FLAGS.DELETE_REPORT && (
            <Button
              className="bg-red-400 dark:bg-red-500 px-2 py-1.5 hover:opacity-85"
              onClick={handleDelete}
            >
              <Delete />
            </Button>
          )}
        </div>
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
        <div className="flex flex-col gap-2">
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
            {new Date(report.createdAt).toLocaleString('hr-HR')}
          </p>
          {FLAGS.EDIT_REPORT && (
            <p className="text-gray-400 text-right text-xs">
              <span className="opacity-65">Updated:</span>{' '}
              {new Date(report.updatedAt).toLocaleString('hr-HR')}
            </p>
          )}
        </div>
      </Card>
    </>
  );
}
