'use client';

import ArrowLeft from '@/app/_icons/ArrowLeft';
import { useEffect, useState } from 'react';
import { ReportDB } from '@/types/types';
import Card from '@/app/_atoms/Card';
import Link from 'next/link';
import Loader from '@/app/_atoms/Loader';
import { useParams } from 'next/navigation';
import ReportDetails from '@/app/report/[id]/_components/ReportDetails';

export default function ReportDetailsPage() {
  const [report, setReport] = useState<ReportDB>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const { id } = useParams();

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

  return <ReportDetails report={report} />;
}
