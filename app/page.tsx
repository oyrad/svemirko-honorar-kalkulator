'use client';

import { ReportsTab } from '@/app/_components/ReportsTab';
import { GigsTab } from '@/app/_components/GigsTab';
import { StatsTab } from '@/app/_components/StatsTab';
import { cn } from '@/utils/cn';
import { TABS, useSelectedTabQueryParam } from '@/hooks/use-selected-tab-query-param';
import { YearSelect } from '@/app/_components/YearSelect';

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

export default function Home() {
  const [selectedTabQueryParam, setSelectedTabQueryParam] = useSelectedTabQueryParam();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <p className="uppercase font-bold font-mono text-2xl text-slate-700 dark:text-slate-100">
          svmrk_kalkulator
        </p>
        <YearSelect />
      </div>

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
    </div>
  );
}
