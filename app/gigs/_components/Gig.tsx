import Card from '@/app/_atoms/Card';
import { GigDB } from '@/types/types';
import { cn } from '@/libs/utils';

interface GigProps {
  gig: GigDB;
  isPast: boolean;
  className?: string;
}

export default function Gig({ gig, isPast, className }: GigProps) {
  return (
    <Card
      className={cn(
        isPast &&
          gig.isPaidOut &&
          'border-2 border-green-500 bg-green-50 dark:bg-green-200 dark:text-black',
        isPast &&
          !gig.isPaidOut &&
          gig.reportId &&
          'border-2 border-yellow-400 bg-yellow-50 dark:bg-yellow-200 dark:text-black',
        isPast &&
          !gig.isPaidOut &&
          !gig.reportId &&
          'border-2 border-red-400 bg-red-50 dark:bg-red-200 dark:text-black',
        !isPast &&
          'border-2 border-blue-500 bg-blue-50 dark:bg-blue-200 dark:text-black',
        className,
      )}
    >
      <div className="flex justify-between items-start">
        <div className="leading-5">
          <p className="uppercase font-semibold text-base">{gig.city}</p>
          <p className="text-gray-500 uppercase text-sm">
            {gig.venue
              ? `${new Date(gig.date).toLocaleDateString('hr-HR')} - ${gig.venue}`
              : new Date(gig.date).toLocaleDateString('hr-HR')}
          </p>
        </div>
        {process.env.NEXT_PUBLIC_SHOW_GIG_ROYALTIES === 'true' && (
          <p className="font-medium">{gig.royalties}</p>
        )}
      </div>
    </Card>
  );
}
