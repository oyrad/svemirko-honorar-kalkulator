import { GigsButton } from '@/app/_components/GigsButton';
import { NewReportButton } from '@/app/_components/NewReportButton';
import { Reports } from '@/app/_components/Reports';
import { StatsButton } from '@/app/_components/StatsButton';

export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <div className="flex-1">
          <GigsButton />
        </div>
        <StatsButton />
      </div>
      <hr />
      <NewReportButton />
      <Reports />
    </div>
  );
}
