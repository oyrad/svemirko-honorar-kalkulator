'use client';

import Loader from '@/app/_atoms/Loader';
import { useParams } from 'next/navigation';
import ReportDetails from '@/app/report/[id]/_components/ReportDetails';
import NotFound from '@/app/_components/NotFound';
import { useReportByIdQuery } from '@/hooks/useReportByIdQuery';

export default function ReportDetailsPage() {
  const { id } = useParams();
  const singleId = Array.isArray(id) ? id[0] : id;

  const { data: report, isPending, isError } = useReportByIdQuery(singleId);

  if (isPending) return <Loader />;

  if (isError || !report) {
    return <NotFound backLink="/" text="Izračun ne postoji." />;
  }

  return <ReportDetails report={report} />;
}
