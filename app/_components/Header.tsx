'use client';

import { YearSelect } from '@/app/_components/YearSelect';
import { TABS, useSelectedTabQueryParam } from '@/hooks/use-selected-tab-query-param';
import { cn } from '@/utils/cn';

interface TabProps {
  title: string;
  onClick: VoidFunction;
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

export function Header() {
  const [selectedTabQueryParam, setSelectedTabQueryParam] = useSelectedTabQueryParam();

  return (
    <header
      className={cn(
        'sticky top-0 pt-8 z-10 -mx-6 md:-mx-[12rem] lg:-mx-[18rem] xl:-mx-[24rem] px-6 md:px-[12rem] lg:px-[18rem] xl:px-[24rem]',
        'bg-gradient-to-r from-[rgb(253,255,251)] to-[rgb(245,249,255)]  dark:from-[rgb(13,13,13)] dark:to-[rgb(13,13,13)]',
      )}
    >
      <div className="flex justify-between items-center mb-2">
        <p className="uppercase font-bold font-mono text-2xl text-slate-700 dark:text-slate-100">
          svmrk_kalkulator
        </p>

        <YearSelect />
      </div>

      <div className="bg-gray-200 grid grid-cols-3 place-items-center uppercase text-xs rounded-lg dark:bg-gray-800 mb-4">
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
    </header>
  );
}
