'use client';

import { BackButton } from '@/app/_components/BackButton';
import { useReportsQuery } from '@/hooks/use-reports-query';
import { useGigsQuery } from '@/hooks/use-gigs-query';
import { Loader } from '@/app/_atoms/Loader';
import { RoyaltiesPerMonth } from '@/app/stats/_components/RoyaltiesPerMonth';
import { GigsPerMonth } from '@/app/stats/_components/GigsPerMonth';
import { RoyaltiesPerPerson } from '@/app/stats/_components/RoyaltiesPerPerson';
import { useSelectedYearStore } from '@/app/stores/use-selected-year-store';

export default function Stats() {
  const { selectedYear, setSelectedYear } = useSelectedYearStore();

  const { data: reports } = useReportsQuery({
    select: (data) => data.filter((report) => report.isLocked),
  });

  const { data: gigs } = useGigsQuery({
    select: (data) => data.filter((gig) => gig.date.split('-')[0] === selectedYear.toString()),
  });

  if (!reports || !gigs) {
    return <Loader />;
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <BackButton link="/" />
          <h1 className="font-semibold text-xl dark:text-white uppercase">statistika</h1>
        </div>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(parseInt(e.target.value))}
          className="px-2 py-1 rounded-lg border border-gray-300 dark:border-gray-700"
        >
          <option value={2025}>2025</option>
          <option value={2024}>2024</option>
        </select>
      </div>
      <GigsPerMonth gigs={gigs.filter((gig) => gig.isPaidOut)} />
      <RoyaltiesPerMonth reports={reports} gigs={gigs} />
      <RoyaltiesPerPerson reports={reports} gigs={gigs} />
    </>
  );
}
