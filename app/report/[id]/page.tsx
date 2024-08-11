'use client';

import Card from '@/app/_atoms/Card';
import Link from 'next/link';
import Loader from '@/app/_atoms/Loader';
import { useParams } from 'next/navigation';
import ReportDetails from '@/app/report/[id]/_components/ReportDetails';
import ArrowLeft from '@/app/_icons/ArrowLeft';
import { useQuery } from 'react-query';

export default function ReportDetailsPage() {
  const { id } = useParams();

  const {
    data: report,
    isLoading,
    isError,
    refetch: refetchReport,
  } = useQuery(
    `report-${id}`,
    async () => {
      const res = await fetch(`/api/reports/${id}`);

      if (res.status === 404) return;
      return res.json();
    },
    {
      retry: false,
    },
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

  return <ReportDetails report={report} refetchReport={refetchReport} />;
}
