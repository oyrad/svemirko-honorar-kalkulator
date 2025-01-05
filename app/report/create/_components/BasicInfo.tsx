import { useGigsQuery } from '@/hooks/use-gigs-query';
import { Input } from '@/app/_atoms/Input';
import { Controller, useFormContext } from 'react-hook-form';
import { ReportFormData } from '@/app/report/create/page';
import Select from 'react-select';
import { SelectedGig } from '@/types/types';
import { Card } from '@/app/_atoms/Card';

export function BasicInfo() {
  const { data: gigs } = useGigsQuery();

  const { register, control } = useFormContext<ReportFormData>();

  const selectableGigs: Array<SelectedGig> = gigs
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
        <Input {...register('name')} type="text" />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="totalPay" className="font-semibold">
          Honorar
        </label>
        <Input {...register('grossRoyalties')} type="number" />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="selectedGigs" className="font-semibold">
          Svirka/e
        </label>
        <Controller
          control={control}
          name="selectedGigs"
          render={({ field }) => (
            <Select
              options={selectableGigs}
              isMulti
              isSearchable={false}
              placeholder=""
              isDisabled={selectableGigs.length === 0}
              noOptionsMessage={() => 'Sve svirke su odabrane'}
              className="text-black"
              {...field}
            />
          )}
        />
      </div>
    </Card>
  );
}
