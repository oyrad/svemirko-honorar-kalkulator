'use client';

import React from 'react';
import Card from '@/app/_atoms/Card';
import { Split } from '@/types/types';

interface SettingsProps {
  isThereBookingFee: boolean;
  setIsThereBookingFee: (value: boolean) => void;
  split: string;
  setSplit: (value: Split) => void;
}

export default function Settings({
  isThereBookingFee,
  setIsThereBookingFee,
  split,
  setSplit,
}: SettingsProps) {
  return (
    <Card className="flex flex-col py-3 space-y-1">
      <p className="font-semibold">Postavke</p>
      <div className="flex justify-between">
        <div className="flex items-center space-x-2">
          <input
            name="isThereBookingFee"
            type="checkbox"
            id="booking"
            checked={isThereBookingFee}
            onChange={() => setIsThereBookingFee(!isThereBookingFee)}
          />
          <label htmlFor="booking" className="text-sm">
            Booking fee
          </label>
        </div>
      </div>
      <div className="grid grid-cols-2">
        <div className="flex items-center space-x-2">
          <input
            type="radio"
            value="deal"
            id="deal"
            checked={split === 'deal'}
            onChange={() => setSplit('deal')}
          />
          <label className="text-sm" htmlFor="deal">
            45/27.5/27.5
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="radio"
            value="equal"
            id="equal"
            checked={split === 'equal'}
            onChange={() => setSplit('equal')}
          />
          <label className="text-sm" htmlFor="equal">
            Svi isto
          </label>
        </div>
      </div>
    </Card>
  );
}
