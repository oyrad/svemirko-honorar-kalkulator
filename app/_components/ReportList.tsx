'use client';

import { useEffect, useState } from 'react';
import { ReportDB } from '@/types/types';
import Link from 'next/link';
import Card from '@/app/_atoms/Card';
import Loader from '@/app/_atoms/Loader';

export default function ReportList() {
  const [reports, setReports] = useState<ReportDB[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/reports`)
      .then((res) => res.json())
      .then((data) => setReports(data))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col gap-2">
      {reports.map((report) => (
        <Link key={report._id} href={`/report/${report._id}`}>
          <Card className="py-3 cursor-pointer shadow-md hover:opacity-65 transition-opacity duration-300 flex justify-between items-center">
            <p className="font-medium">{report.name}</p>
          </Card>
        </Link>
      ))}
    </div>
  );
}
