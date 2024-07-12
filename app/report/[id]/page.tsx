'use client';

import ArrowLeft from '@/app/_icons/ArrowLeft';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Report } from '@/types/types';
import Card from '@/app/_atoms/Card';
import PersonCard from '@/app/_components/PersonCard';
import OverviewItem from '@/app/report/[id]/_components/OverviewItem';
import Link from 'next/link';
import Loader from '@/app/_atoms/Loader';
import useMembers from '@/hooks/useMembers';

export default function ReportDetails() {
  const [report, setReport] = useState<Report>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

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

  if (isLoading) return <Loader />;

  if (isError || !report)
    return (
      <Card className="flex gap-4 items-center">
        <Link href="/">
          <ArrowLeft />
        </Link>
        <p>{id} ne postoji.</p>
      </Card>
    );

  return (
    <>
      <div className="flex gap-4 items-center">
        <Link href="/">
          <ArrowLeft />
        </Link>
        <p className="font-semibold text-lg dark:text-white">{report.name}</p>
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
            value={report.expenses.reduce(
              (sum, expense) => sum + parseFloat(expense.amount),
              0,
            )}
          />
          <OverviewItem label="zarada" value={report.netBandPay} />
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
              netBandPay={report.netBandPay}
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
