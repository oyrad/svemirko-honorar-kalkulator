import { GigsButton } from '@/app/_components/GigsButton';
import { NewReportButton } from '@/app/_components/NewReportButton';
import { Reports } from '@/app/_components/Reports';

export default async function Home() {
  return (
    <div className="flex flex-col gap-4">
      <GigsButton />
      <hr />
      <NewReportButton />
      <Reports />
    </div>
  );
}
