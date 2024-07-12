'use client';

import ReportInfo from '@/app/_components/ReportInfo';
import { useEffect, useState } from 'react';
import { Report } from '@/types/types';
import { MoonLoader } from 'react-spinners';

export default function ReportList() {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/reports`)
      .then((res) => res.json())
      .then((data) => setReports(data))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <MoonLoader size={60} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {reports.map((report) => (
        <ReportInfo key={report._id} id={report._id} name={report.name} />
      ))}
    </div>
  );
}
