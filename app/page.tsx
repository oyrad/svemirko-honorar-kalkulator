'use client';

import { Header } from '@/app/_components/Header';
import { TABS, useSelectedTabQueryParam } from '@/hooks/use-selected-tab-query-param';
import { ReportsTab } from '@/app/_components/reports/ReportsTab';
import { GigsTab } from '@/app/_components/gigs/GigsTab';
import { StatsTab } from '@/app/_components/stats/StatsTab';

export default function Home() {
  const [selectedTabQueryParam] = useSelectedTabQueryParam();

  return (
    <div className="flex flex-col gap-4">
      <Header />

      {selectedTabQueryParam === TABS.REPORTS && <ReportsTab />}
      {selectedTabQueryParam === TABS.GIGS && <GigsTab />}
      {selectedTabQueryParam === TABS.STATS && <StatsTab />}
    </div>
  );
}
