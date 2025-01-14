import { useGigsQuery } from '@/hooks/use-gigs-query';
import { Loader } from '@/ui/atoms/Loader';
import Link from 'next/link';
import { Gig } from '@/app/_components/gigs/Gig';
import { useSelectedYearStore } from '@/app/stores/use-selected-year-store';
import { Card } from '@/ui/atoms/Card';

export function GigsTab() {
  const { selectedYear } = useSelectedYearStore();

  const { data: gigs, isPending } = useGigsQuery({
    select: (data) => data.filter((gig) => gig.date.split('-')[0] === selectedYear),
  });

  const upcomingGigs = gigs
    ? gigs
        .filter((gig) => new Date(gig.date) >= new Date())
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    : [];

  const pastGigs = gigs
    ? gigs
        .filter((gig) => new Date(gig.date) < new Date())
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    : [];

  if (isPending) {
    return <Loader />;
  }

  return (
    <>
      {!gigs?.length ? (
        <Card>Nema svirki za odabranu godinu.</Card>
      ) : (
        <div>
          {upcomingGigs.length > 0 && (
            <>
              <div className="flex gap-2 items-center mb-2">
                <p className="dark:text-white">Nadolazeće</p>
                <p className="bg-white rounded-xl px-3 py-0.5 border border-gray-400 text-xs">
                  {upcomingGigs.length}
                </p>
              </div>

              <div className="flex flex-col gap-2 mb-4">
                {upcomingGigs.map((gig) => (
                  <Gig key={gig._id} gig={gig} isPast={false} />
                ))}
              </div>
            </>
          )}

          {pastGigs.length !== 0 && upcomingGigs.length !== 0 && <hr className="mb-4" />}

          <div className="flex flex-col gap-2">
            {pastGigs.map((gig) => (
              <Link
                key={gig._id}
                href={
                  gig.reportId
                    ? `/report/${gig.reportId}?from=gigs`
                    : `/report/create?gigId=${gig._id}&from=gigs`
                }
              >
                <Gig
                  key={gig._id}
                  gig={gig}
                  isPast={true}
                  className="hover:opacity-75 duration-300 ease-in-out"
                />
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
