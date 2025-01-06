'use client';

import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useGigsQuery } from '@/hooks/use-gigs-query';
import { Loader } from '@/app/_atoms/Loader';
import { Button } from '@/app/_atoms/Button';
import { Gig } from '@/app/gigs/_components/Gig';

export default function Gigs() {
  const { data: gigs, isPending } = useGigsQuery();

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
      <div className="flex items-center gap-4 mb-4">
        <Link href="/">
          <Button className="border border-gray-500 bg-white dark:bg-gray-800 px-2 py-1.5 hover:opacity-75">
            <ArrowLeftIcon className="size-5 text-gray-700 dark:text-gray-100" />
          </Button>
        </Link>
        <h1 className="font-semibold text-xl dark:text-white uppercase">svirke</h1>
      </div>
      <div>
        <div className="flex gap-2 items-center mb-2">
          <p className="dark:text-white">Nadolazeće</p>
          <p className="bg-white rounded-xl px-3 py-0.5 border border-gray-400 text-xs">
            {upcomingGigs.length}
          </p>
        </div>

        <div className="flex flex-col gap-3 mb-4">
          {upcomingGigs.map((gig) => (
            <Gig key={gig._id} gig={gig} isPast={false} />
          ))}
        </div>

        <hr className="mb-4" />

        <div className="flex flex-col gap-3">
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
    </>
  );
}
