'use client';

import Card from '@/app/_atoms/Card';
import { useRoyaltiesStore } from '@/stores/royaltiesStore';
import PersonCard from '@/app/_components/PersonCard';
import useMembers from '@/hooks/useMembers';

export default function Earnings() {
  const { expenses, netBandPay, split } = useRoyaltiesStore();

  const members = useMembers({ split });

  return (
    <>
      <Card>
        <div className="flex justify-between items-center">
          <p className="font-semibold">Zarada</p>
          <p className="font-semibold">{netBandPay.toFixed(2)}</p>
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
            netBandPay={netBandPay}
            bgColor={member.bgColor}
          />
        ))}
      </Card>
    </>
  );
}
