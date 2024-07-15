'use client';

import Card from '@/app/_atoms/Card';
import PersonCard from '@/app/_components/PersonCard';
import useMembers from '@/hooks/useMembers';
import { Expense, Split } from '@/types/types';

interface EarningsProps {
  expenses: Expense[];
  netRoyalties: number;
  split: Split;
}

export default function Earnings({
  expenses,
  netRoyalties,
  split,
}: EarningsProps) {
  const members = useMembers({ split });

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
