import { useSelectedYearStore } from '@/app/stores/use-selected-year-store';
import { useReportsQuery } from '@/hooks/use-reports-query';
import { useGigsQuery } from '@/hooks/use-gigs-query';
import { Loader } from '@/ui/atoms/Loader';
import { GigsPerMonth } from '@/app/_components/stats/GigsPerMonth';
import { RoyaltiesPerMonth } from '@/app/_components/stats/RoyaltiesPerMonth';
import { RoyaltiesPerPerson } from '@/app/_components/stats/RoyaltiesPerPerson';
import { Card } from '@/ui/atoms/Card';
import { OverviewItem } from '@/app/report/[id]/_components/OverviewItem';

export function StatsTab() {
  const { selectedYear } = useSelectedYearStore();

  const { data: reports } = useReportsQuery({
    select: (data) => data.filter((report) => report.year === selectedYear && report.isLocked),
  });

  const { data: gigs } = useGigsQuery({
    select: (data) =>
      data.filter((gig) => gig.date.split('-')[0] === selectedYear && gig.isPaidOut),
  });

  if (!reports || !gigs) {
    return <Loader />;
  }

  return (
    <>
      <Card className="grid grid-cols-5 justify-between">
        <OverviewItem label="svirke" value={gigs.length} />
        <OverviewItem
          label="zarada"
          value={reports.reduce((acc, report) => acc + parseInt(report.netRoyalties), 0)}
        />
        <OverviewItem
          label="marko"
          value={reports.reduce(
            (acc, report) => acc + parseInt(report.netRoyaltiesPerPerson[0]),
            0,
          )}
        />
        <OverviewItem
          label="tali"
          value={reports.reduce(
            (acc, report) => acc + parseInt(report.netRoyaltiesPerPerson[1]),
            0,
          )}
        />
        <OverviewItem
          label="dario"
          value={reports.reduce(
            (acc, report) => acc + parseInt(report.netRoyaltiesPerPerson[2]),
            0,
          )}
        />
      </Card>

      <GigsPerMonth gigs={gigs} />
      <RoyaltiesPerMonth reports={reports} gigs={gigs} />
      <RoyaltiesPerPerson reports={reports} gigs={gigs} />

      {/*<hr />*/}

      {/*<RoyaltiesPerYear reports={reports} />*/}
    </>
  );
}
