import NewReportButton from '@/app/_components/NewReportButton';
import ReportList from '@/app/_components/ReportList';

export default async function Home() {
  return (
    <>
      <NewReportButton />
      <ReportList />
    </>
  );
}
