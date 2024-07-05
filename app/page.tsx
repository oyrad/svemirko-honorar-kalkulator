import NewReportButton from '@/app/_components/NewReportButton';
import ReportInfo from '@/app/_components/ReportInfo';

export default async function Home() {
  fetch('/api/reports')
    .then((res) => res.json())
    .then((data) => console.log(data));

  return (
    <>
      <NewReportButton />
      <ReportInfo name="sarajevo" />
      <ReportInfo name="kragujevac" />
      <ReportInfo name="beer fest" />
    </>
  );
}
