'use client';

import Card from '@/app/_atoms/Card';
import { useRoyaltiesStore } from '@/stores/royaltiesStore';
import PersonCard from '@/app/_components/PersonCard';
import useRates from '@/hooks/useRates';

export default function Earnings() {
  const { expenses, netBandPay, split } = useRoyaltiesStore();

  const rates = useRates({ split });

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

        <PersonCard
          personIndex="1"
          name="Marko"
          rate={rates.MARKO_RATE}
          expenses={expenses}
          netBandPay={netBandPay}
          bgColor="bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-300 dark:to-blue-300"
        />
        <PersonCard
          personIndex="2"
          name="Tali"
          rate={rates.TALI_RATE}
          expenses={expenses}
          netBandPay={netBandPay}
          bgColor="bg-gradient-to-r from-violet-100 to-fuchsia-100 dark:from-violet-300 dark:to-fuchsia-300"
        />
        <PersonCard
          personIndex="3"
          name="Dario"
          rate={rates.DARIO_RATE}
          expenses={expenses}
          netBandPay={netBandPay}
          bgColor="bg-gradient-to-r from-green-100 to-lime-100 dark:from-green-300 dark:to-lime-300"
        />
      </Card>
    </>
  );
}
