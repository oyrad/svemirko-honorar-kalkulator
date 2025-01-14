'use client';

import { TABS, useSelectedTabQueryParam } from '@/hooks/use-selected-tab-query-param';
import { ReportsTab } from '@/app/_components/reports/ReportsTab';
import { GigsTab } from '@/app/_components/gigs/GigsTab';
import { StatsTab } from '@/app/_components/stats/StatsTab';
import { cn } from '@/utils/cn';

interface TabProps {
  title: string;
  onClick: () => void;
  className?: string;
}

function Tab({ title, onClick, className = '' }: TabProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'w-full text-center py-2 cursor-pointer text-gray-500 transition-[font-size] duration-500 ease-in-out rounded-lg dark:text-slate-400',
        className,
      )}
    >
      {title}
    </div>
  );
}

export function Tabs() {
  const [selectedTabQueryParam, setSelectedTabQueryParam] = useSelectedTabQueryParam();

  return (
    <>
      <div className="bg-gray-200 grid grid-cols-3 place-items-center uppercase text-xs rounded-lg dark:bg-gray-800">
        <Tab
          title="Izračuni"
          onClick={() => setSelectedTabQueryParam(TABS.REPORTS)}
          className={
            selectedTabQueryParam === TABS.REPORTS
              ? 'bg-gradient-to-r from-green-600 to-cyan-600 font-semibold text-white dark:text-white text-sm sm:text-base'
              : ''
          }
        />
        <Tab
          title="Svirke"
          onClick={() => setSelectedTabQueryParam(TABS.GIGS)}
          className={
            selectedTabQueryParam === TABS.GIGS
              ? 'bg-gradient-to-r from-sky-600 to-violet-600 font-semibold text-white dark:text-white text-sm sm:text-base'
              : ''
          }
        />
        <Tab
          title="Statistika"
          onClick={() => setSelectedTabQueryParam(TABS.STATS)}
          className={
            selectedTabQueryParam === TABS.STATS
              ? 'bg-gradient-to-r from-fuchsia-600 to-rose-600 font-semibold text-white dark:text-white text-sm sm:text-base'
              : ''
          }
        />
      </div>

      <hr />

      {selectedTabQueryParam === TABS.REPORTS && <ReportsTab />}
      {selectedTabQueryParam === TABS.GIGS && <GigsTab />}
      {selectedTabQueryParam === TABS.STATS && <StatsTab />}
    </>
  );
}
