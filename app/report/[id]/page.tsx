'use client';

import ArrowLeft from '@/app/_icons/ArrowLeft';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Report } from '@/types/types';
import Card from '@/app/_atoms/Card';
import PersonCard from '@/app/_components/PersonCard';
import OverviewItem from '@/app/report/[id]/_components/OverviewItem';
import Link from 'next/link';
import Loader from '@/app/_atoms/Loader';
import useMembers from '@/hooks/useMembers';
import { getNetRoyalties, getTotalExpenses } from '@/utils/utils';
import Button from '@/app/_atoms/Button';
import Delete from '@/app/_icons/Delete';
import { FLAGS } from '@/libs/flags';
import Edit from '@/app/_icons/Edit';

export default function ReportDetails() {
  const [report, setReport] = useState<Report>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const router = useRouter();

  const { id } = useParams();
  const members = useMembers({ split: report?.split ?? 'deal' });

  useEffect(() => {
    fetch(`/api/reports/${id}`)
      .then((res) => {
        if (res.status === 404) {
          throw new Error();
        }
        return res.json();
      })
      .then((data) => setReport(data))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, [id]);

  function handleDelete() {
    fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/reports/${id}`, {
      method: 'DELETE',
    }).then((res) => {
      if (res.status === 200) {
        router.push('/');
      }
    });
  }

  const netRoyalties = getNetRoyalties(
    report?.grossRoyalties ?? '',
    report?.isThereBookingFee ?? false,
    report?.expenses ?? [],
  );

  if (isLoading) return <Loader />;

  if (isError || !report) {
    return (
      <Card className="flex gap-4 items-center">
        <Link href="/">
          <ArrowLeft />
        </Link>
        <p>{id} ne postoji.</p>
      </Card>
    );
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
              <Button className="bg-blue-400 dark:bg-blue-600 px-2 py-1.5 hover:opacity-85">
                <Edit />
              </Button>
            </Link>
          )}
          {FLAGS.DELETE_REPORT && (
            <Button
              className="bg-red-400 dark:bg-red-600 px-2 py-1.5 hover:opacity-85"
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
                ? parseFloat(report.grossRoyalties) * 0.1
                : '-'
            }
          />
          <OverviewItem
            label="podjela"
            value={report.split === 'deal' ? '45/27.5/27.5' : 'Svi isto'}
          />
          <OverviewItem
            label="troškovi"
            value={getTotalExpenses(report.expenses) || '-'}
          />
          <OverviewItem label="zarada" value={netRoyalties} />
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
        <p className="text-gray-400 text-right text-xs">
          {new Date(report.createdAt).toLocaleString('hr-HR')}
        </p>
      </Card>
    </>
  );
}
