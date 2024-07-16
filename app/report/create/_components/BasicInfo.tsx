'use client';

import Card from '@/app/_atoms/Card';
import Input from '@/app/_atoms/Input';
import { ChangeEvent } from 'react';
import { ReportTextData } from '@/types/types';

interface BasicInfoProps {
  report: ReportTextData;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => void;
}

export default function BasicInfo({ report, handleChange }: BasicInfoProps) {
  return (
    <Card className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-1">
        <label htmlFor="totalPay" className="font-semibold">
          Naziv
        </label>
        <Input
          name="name"
          type="text"
          value={report.name}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col space-y-1">
        <label htmlFor="totalPay" className="font-semibold">
          Honorar
        </label>
        <Input
          name="grossRoyalties"
          type="number"
          value={report.grossRoyalties}
          onChange={handleChange}
        />
      </div>
    </Card>
  );
}
