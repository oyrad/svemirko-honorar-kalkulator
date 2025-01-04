'use client';

import Card from '@/app/_atoms/Card';
import PersonCard from '@/app/_components/PersonCard';
import { Expense, ReportTextData } from '@/types/types';
import { useMemo } from 'react';
import { getNetRoyalties } from '@/libs/utils';
import { getMembers } from '@/utils/getMembers';

interface EarningsProps {
  report: ReportTextData;
  expenses: Expense[];
}

export default function Earnings({ report, expenses }: EarningsProps) {
  const members = getMembers(report.split);

  const netRoyalties = useMemo(
    () =>
      getNetRoyalties(
        report.grossRoyalties,
        report.isThereBookingFee,
        expenses,
      ),
    [report.grossRoyalties, report.isThereBookingFee, expenses],
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
