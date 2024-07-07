'use client';

import ArrowLeft from '@/app/_icons/ArrowLeft';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Report } from '@/types/types';
import Card from '@/app/_atoms/Card';
import PersonCard from '@/app/_components/PersonCard';
import useRates from '@/hooks/useRates';

export default function ReportDetails() {
  const [report, setReport] = useState<Report>();
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const { id } = useParams();
  const rates = useRates({ split: report?.split ?? 'deal' });

  useEffect(() => {
    fetch(`/api/reports/${id}`)
      .then((res) => res.json())
      .then((data) => setReport(data))
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, [id]);

  if (isLoading) return <p>Loading...</p>;

  if (!report) return <p>Report not found!</p>;

  return (
    <>
      <div className="flex gap-4 items-center">
        <ArrowLeft onClick={() => router.push('/')} />
        <p className="font-semibold text-lg dark:text-white">{report.name}</p>
      </div>
      <Card className="flex flex-col gap-4">
        <div className="flex justify-between items-center font-semibold">
          <p>Honorar</p>
          <p>{report.grossRoyalties}</p>
        </div>
        <div className="flex flex-col gap-2">
          <PersonCard
            personIndex="1"
            name="Marko"
            rate={rates.MARKO_RATE}
            expenses={report.expenses}
            netBandPay={report.netBandPay}
            bgColor="bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-300 dark:to-blue-300"
            isExpandable={false}
          />
          <PersonCard
            personIndex="2"
            name="Tali"
            rate={rates.TALI_RATE}
            expenses={report.expenses}
            netBandPay={report.netBandPay}
            bgColor="bg-gradient-to-r from-violet-100 to-fuchsia-100 dark:from-violet-300 dark:to-fuchsia-300"
            isExpandable={false}
          />
          <PersonCard
            personIndex="3"
            name="Dario"
            rate={rates.DARIO_RATE}
            expenses={report.expenses}
            netBandPay={report.netBandPay}
            bgColor="bg-gradient-to-r from-green-100 to-lime-100 dark:from-green-300 dark:to-lime-300"
            isExpandable={false}
          />
        </div>
      </Card>
    </>
  );
}
