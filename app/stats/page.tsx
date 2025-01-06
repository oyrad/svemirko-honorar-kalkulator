'use client';

import { BackButton } from '@/app/_components/BackButton';
import { useReportsQuery } from '@/hooks/use-reports-query';
import { useGigsQuery } from '@/hooks/use-gigs-query';
import { Loader } from '@/app/_atoms/Loader';
import { useState } from 'react';
import { RoyaltiesPerMonth } from '@/app/stats/_components/RoyaltiesPerMonth';
import { GigsPerMonth } from '@/app/stats/_components/GigsPerMonth';
import { RoyaltiesPerPerson } from '@/app/stats/_components/RoyaltiesPerPerson';

export default function Stats() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());

  const { data: reports } = useReportsQuery({
    select: (data) => data.filter((report) => report.isLocked),
  });

  const { data: gigs } = useGigsQuery();

  if (!reports || !gigs) {
    return <Loader />;
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <BackButton link="/" />
          <h1 className="font-semibold text-xl dark:text-white">Statistika</h1>
        </div>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-700"
        >
          <option value="2025">2025</option>
          <option value="2024">2024</option>
        </select>
      </div>
      <RoyaltiesPerMonth reports={reports} gigs={gigs} selectedYear={selectedYear} />
      <RoyaltiesPerPerson reports={reports} gigs={gigs} selectedYear={selectedYear} />
      <GigsPerMonth gigs={gigs} selectedYear={selectedYear} />
    </>
  );
}
