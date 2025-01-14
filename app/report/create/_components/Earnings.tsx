import { Expense } from '@/types/types';
import { getMembers } from '@/utils/get-members';
import { useWatch } from 'react-hook-form';
import { Card } from '@/ui/atoms/Card';
import { getNetRoyalties } from '@/utils/royalties-utils';
import { PersonCard } from '@/ui/components/PersonCard';
import { useMemo } from 'react';
import { ReportFormData } from '@/app/report/create/page';

interface EarningsProps {
  expenses: Expense[];
}

export function Earnings({ expenses }: EarningsProps) {
  const { isThereBookingFee, grossRoyalties, split } = useWatch<ReportFormData>();

  const members = getMembers(split ?? 'deal');

  const netRoyalties = useMemo(
    () => getNetRoyalties(grossRoyalties ?? '', !!isThereBookingFee, expenses),
    [grossRoyalties, isThereBookingFee, expenses],
  );

  return (
    <>
      <Card>
        <div className="flex justify-between items-center">
          <p className="font-semibold">Zarada</p>
          <p className="font-semibold">{netRoyalties.toFixed(2)}</p>
        </div>
      </Card>
      <Card className="flex flex-col space-y-2">
        <p className="font-semibold">Isplata</p>
        {members.map((member) => (
          <PersonCard
            key={member.index}
            personIndex={member.index}
            name={member.name}
            rate={member.rate}
            expenses={expenses}
            netRoyalties={netRoyalties}
            bgColor={member.bgColor}
          />
        ))}
      </Card>
    </>
  );
}
