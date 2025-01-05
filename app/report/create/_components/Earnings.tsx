import Card from '@/app/_atoms/Card';
import PersonCard from '@/app/_components/PersonCard';
import { Expense, ReportTextData } from '@/types/types';
import { useMemo } from 'react';
import { getNetRoyalties } from '@/libs/utils';
import { getMembers } from '@/utils/getMembers';
import { useFormContext } from 'react-hook-form';

interface EarningsProps {
  expenses: Expense[];
}

export function Earnings({ expenses }: EarningsProps) {
  const { watch } = useFormContext<ReportTextData>();

  const { isThereBookingFee, grossRoyalties, split } = watch();

  const members = getMembers(split);

  const netRoyalties = useMemo(
    () => getNetRoyalties(grossRoyalties, isThereBookingFee, expenses),
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
