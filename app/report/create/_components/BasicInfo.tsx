'use client';

import Card from '@/app/_atoms/Card';
import Input from '@/app/_atoms/Input';
import { ChangeEvent } from 'react';
import { GigDB, ReportTextData, SelectedGig } from '@/types/types';
import { useQuery } from 'react-query';
import Select from 'react-select';

interface BasicInfoProps {
  report: ReportTextData;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => void;
  selectedGigs: SelectedGig[];
  setSelectedGigs: (selectedGigs: SelectedGig[]) => void;
}

export default function BasicInfo({
  report,
  handleChange,
  selectedGigs,
  setSelectedGigs,
}: BasicInfoProps) {
  const { data: gigs } = useQuery(
    'gigs',
    async () => {
      const res = await fetch('/api/gigs');
      return res.json();
    },
    {
      select: (data: GigDB[]) =>
        data
          .filter((gig) => !gig.isPaidOut && new Date(gig.date) < new Date())
          .map((gig) => ({
            label: `${gig.city} - ${gig.venue}`,
            value: gig._id,
          })),
    },
  );

  return (
    <Card className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
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
      <div className="flex flex-col gap-1">
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
      <div className="flex flex-col gap-1">
        <label htmlFor="selectedGigs" className="font-semibold">
          Svirka/e
        </label>
        <Select
          options={gigs}
          // @ts-ignore
          onChange={setSelectedGigs}
          value={selectedGigs}
          // @ts-ignore
          isMulti={true}
          isSearchable={false}
          placeholder=""
          isDisabled={!gigs || gigs.length === 0}
          noOptionsMessage={() => 'Sve svirke su odabrane'}
          className="text-black"
        />
      </div>
    </Card>
  );
}
