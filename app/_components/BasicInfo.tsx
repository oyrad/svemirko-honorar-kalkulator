'use client';

import Card from '@/app/_atoms/Card';
import Input from '@/app/_atoms/Input';
import { useRoyaltiesStore } from '@/stores/royaltiesStore';
import { useEffect } from 'react';

export default function BasicInfo() {
  const {
    grossRoyalties,
    setGrossRoyalties,
    setNetBandPay,
    expenses,
    isThereBookingFee,
  } = useRoyaltiesStore();

  useEffect(() => {
    let totalBandFee = parseFloat(grossRoyalties) || 0;
    if (isThereBookingFee) {
      totalBandFee = parseFloat(grossRoyalties) * 0.9;
    }

    expenses.forEach(
      (expense) => (totalBandFee -= parseInt(expense.amount || '0')),
    );

    setNetBandPay(totalBandFee);
  }, [expenses, grossRoyalties, isThereBookingFee, setNetBandPay]);

  return (
    <Card className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-1">
        <label htmlFor="totalPay" className="font-semibold">
          Honorar
        </label>
        <Input
          name="totalPay"
          type="number"
          value={grossRoyalties}
          onChange={(e) => setGrossRoyalties(e.target.value)}
        />
      </div>
    </Card>
  );
}
