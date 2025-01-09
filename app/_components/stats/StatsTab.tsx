import { useSelectedYearStore } from '@/app/stores/use-selected-year-store';
import { useReportsQuery } from '@/hooks/use-reports-query';
import { useGigsQuery } from '@/hooks/use-gigs-query';
import { Loader } from '@/ui/atoms/Loader';
import { GigsPerMonth } from '@/app/_components/stats/GigsPerMonth';
import { RoyaltiesPerMonth } from '@/app/_components/stats/RoyaltiesPerMonth';
import { RoyaltiesPerPerson } from '@/app/_components/stats/RoyaltiesPerPerson';

export function StatsTab() {
  const { selectedYear } = useSelectedYearStore();

  const { data: reports } = useReportsQuery({
    select: (data) => data.filter((report) => report.isLocked),
  });

  const { data: gigs } = useGigsQuery({
    select: (data) => data.filter((gig) => gig.date.split('-')[0] === selectedYear),
  });

  if (!reports || !gigs) {
    return <Loader />;
  }

  return (
    <>
      <GigsPerMonth gigs={gigs.filter((gig) => gig.isPaidOut)} />
      <RoyaltiesPerMonth reports={reports} gigs={gigs} />
      <RoyaltiesPerPerson reports={reports} gigs={gigs} />

      {/*<hr />*/}

      {/*<RoyaltiesPerYear reports={reports} />*/}
    </>
  );
}
