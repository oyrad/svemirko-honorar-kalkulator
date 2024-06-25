'use client';

import Card from '@/app/_atoms/Card';
import { useRoyaltiesStore } from '@/stores/royaltiesStore';
import PersonCard from '@/app/_components/PersonCard';
import useRates from '@/hooks/useRates';

export default function Earnings() {
  const { netBandPay } = useRoyaltiesStore();

  const rates = useRates();

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
          bgColor="bg-gradient-to-r from-cyan-100 to-blue-100"
        />
        <PersonCard
          personIndex="2"
          name="Tali"
          rate={rates.TALI_RATE}
          bgColor="bg-gradient-to-r from-violet-100 to-fuchsia-100"
        />
        <PersonCard
          personIndex="3"
          name="Dario"
          rate={rates.DARIO_RATE}
          bgColor="bg-gradient-to-r from-green-100 to-lime-100"
        />
      </Card>
    </>
  );
}
