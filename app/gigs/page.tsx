'use client';

import { useQuery } from 'react-query';
import { GigDB } from '@/types/types';
import Loader from '@/app/_atoms/Loader';
import Gig from '@/app/gigs/_components/Gig';
import Button from '@/app/_atoms/Button';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

export default function Gigs() {
  const { data: gigs, isLoading } = useQuery('gigs', async () => {
    const res = await fetch('/api/gigs');
    return res.json();
  });

  const upcomingGigs = gigs
    ?.filter((gig: GigDB) => new Date(gig.date) >= new Date())
    .sort(
      (a: GigDB, b: GigDB) =>
        new Date(a.date).getTime() - new Date(b.date).getTime(),
    );

  const pastGigs = gigs
    ?.filter((gig: GigDB) => new Date(gig.date) < new Date())
    .sort(
      (a: GigDB, b: GigDB) =>
        new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

  if (isLoading) {
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
        <h1 className="font-semibold text-xl dark:text-white">SVIRKE</h1>
      </div>
      <div>
        <div className="flex gap-2 items-center mb-2">
          <p className="dark:text-white">Nadolazeće</p>
          <p className="bg-white rounded-xl px-3 py-0.5 border border-gray-400 text-xs">
            {upcomingGigs.length}
          </p>
        </div>

        <div className="flex flex-col gap-3 mb-4">
          {upcomingGigs.map((gig: GigDB) => (
            <Gig gig={gig} key={gig._id} isPast={false} />
          ))}
        </div>

        <hr className="mb-4" />

        <div className="flex flex-col gap-3">
          {pastGigs.map((gig: GigDB) => {
            if (gig.isPaidOut) {
              return (
                <Link href={`/report/${gig.reportId}`} key={gig._id}>
                  <Gig
                    gig={gig}
                    key={gig._id}
                    isPast={true}
                    className="hover:opacity-75 duration-300 ease-in-out"
                  />
                </Link>
              );
            } else {
              return <Gig gig={gig} key={gig._id} isPast={true} />;
            }
          })}
        </div>
      </div>
    </>
  );
}
