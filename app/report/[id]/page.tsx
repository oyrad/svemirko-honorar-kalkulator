'use client';

import Loader from '@/app/_atoms/Loader';
import { useParams } from 'next/navigation';
import ReportDetails from '@/app/report/[id]/_components/ReportDetails';
import { useQuery } from 'react-query';
import NotFound from '@/app/_components/NotFound';

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
    return <NotFound backLink="/" text="Izračun ne postoji." />;
  }

  return <ReportDetails report={report} refetchReport={refetchReport} />;
}
