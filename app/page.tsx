import NewReportButton from '@/app/_components/NewReportButton';
import ReportList from '@/app/_components/ReportList';
import GigsButton from '@/app/_components/GigsButton';

export default async function Home() {
  return (
    <div className="flex flex-col gap-4">
      <GigsButton />
      <hr />
      <NewReportButton />
      <ReportList />
    </div>
  );
}
