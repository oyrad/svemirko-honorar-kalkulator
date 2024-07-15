'use client';

import Card from '@/app/_atoms/Card';
import Input from '@/app/_atoms/Input';

interface BasicInfoProps {
  name: string;
  setName: (value: string) => void;
  grossRoyalties: string;
  setGrossRoyalties: (value: string) => void;
}

export default function BasicInfo({
  name,
  setName,
  grossRoyalties,
  setGrossRoyalties,
}: BasicInfoProps) {
  return (
    <Card className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-1">
        <label htmlFor="totalPay" className="font-semibold">
          Naziv
        </label>
        <Input
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
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
