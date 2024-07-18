import NewReportButton from '@/app/_components/NewReportButton';
import Link from 'next/link';
import Card from '@/app/_atoms/Card';
import { ReportDB } from '@/types/types';

async function getReports() {
  const res = await fetch(`${process.env.CLIENT_URL}/api/reports`, {
    method: 'GET',
    next: {
      tags: ['reports'],
    },
  });
  return (await res.json()) as ReportDB[];
}

export default async function Home() {
  const reports = await getReports();

  return (
    <>
      <NewReportButton />
      <div className="flex flex-col gap-2">
        {reports.map((report) => (
          <Link key={report._id} href={`/report/${report._id}`}>
            <Card className="py-3 cursor-pointer shadow-md hover:opacity-65 transition-opacity duration-300 flex justify-between items-center">
              <p className="font-medium">{report.name}</p>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}
