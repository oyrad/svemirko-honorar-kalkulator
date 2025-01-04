'use client';

import Card from '@/app/_atoms/Card';
import Input from '@/app/_atoms/Input';
import { ChangeEvent } from 'react';
import { ReportTextData, SelectedGig } from '@/types/types';
import Select from 'react-select';
import { useGigsQuery } from '@/hooks/useGigsQuery';

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
  const { data: gigs } = useGigsQuery();

  const selectOptions = gigs
    ? gigs
        .filter((gig) => !gig.reportId && new Date(gig.date) < new Date())
        .map((gig) => ({
          label: `${gig.city} - ${gig.venue}`,
          value: gig._id,
        }))
    : [];

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
          options={selectOptions}
          // @ts-ignore
          onChange={setSelectedGigs}
          value={selectedGigs}
          isMulti
          isSearchable={false}
          placeholder=""
          isDisabled={!selectOptions || selectOptions.length === 0}
          noOptionsMessage={() => 'Sve svirke su odabrane'}
          className="text-black"
        />
      </div>
    </Card>
  );
}
