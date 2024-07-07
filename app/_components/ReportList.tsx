'use client';

import ReportInfo from '@/app/_components/ReportInfo';
import { useEffect, useState } from 'react';
import { Report } from '@/types/types';

export default function ReportList() {
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/reports`)
      .then((res) => res.json())
      .then((data) => setReports(data));
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {reports.map((report) => (
        <ReportInfo key={report._id} id={report._id} name={report.name} />
      ))}
    </div>
  );
}
