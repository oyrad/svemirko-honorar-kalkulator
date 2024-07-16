'use client';

import { ChangeEvent } from 'react';
import Card from '@/app/_atoms/Card';
import { ReportTextData } from '@/types/types';

interface SettingsProps {
  report: ReportTextData;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => void;
}

export default function Settings({ report, handleChange }: SettingsProps) {
  return (
    <Card className="flex flex-col py-3 space-y-1">
      <p className="font-semibold">Postavke</p>
      <div className="flex justify-between">
        <div className="flex items-center space-x-2">
          <input
            name="isThereBookingFee"
            type="checkbox"
            id="booking"
            checked={report.isThereBookingFee}
            onChange={handleChange}
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
            name="split"
            id="deal"
            checked={report.split === 'deal'}
            onChange={handleChange}
          />
          <label className="text-sm" htmlFor="deal">
            45/27.5/27.5
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="radio"
            value="equal"
            name="split"
            id="equal"
            checked={report.split === 'equal'}
            onChange={handleChange}
          />
          <label className="text-sm" htmlFor="equal">
            Svi isto
          </label>
        </div>
      </div>
    </Card>
  );
}
