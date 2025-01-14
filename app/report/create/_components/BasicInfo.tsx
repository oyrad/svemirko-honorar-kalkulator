import { useGigsQuery } from '@/hooks/use-gigs-query';
import { Input } from '@/ui/atoms/Input';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { ReportFormData } from '@/app/report/create/page';
import Select from 'react-select';
import { Card } from '@/ui/atoms/Card';
import { SelectedGig } from '@/types/types';

export function BasicInfo() {
  const { register, control } = useFormContext<ReportFormData>();

  const { gigIds } = useWatch();

  const { data: gigs } = useGigsQuery();

  const gigOptions: Array<SelectedGig> = gigs
    ? gigs
        .filter(
          (gig) => (!gig.reportId || gigIds?.includes(gig._id)) && new Date(gig.date) < new Date(),
        )
        .map((gig) => ({
          label: `${gig.city} - ${gig.venue}`,
          value: gig._id,
        }))
    : [];

  return (
    <Card className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label className="font-semibold">Naziv</label>
        <Input {...register('name')} type="text" />
      </div>
      <div className="flex flex-col gap-1">
        <label className="font-semibold">Honorar</label>
        <Input {...register('grossRoyalties')} type="number" />
      </div>
      <div className="flex flex-col gap-1">
        <label className="font-semibold">Svirka/e</label>
        <Controller
          control={control}
          name="gigIds"
          render={({ field }) => (
            <Select
              options={gigOptions}
              isMulti
              isSearchable={false}
              placeholder=""
              isDisabled={gigOptions.length === 0}
              noOptionsMessage={() => 'Sve svirke su odabrane'}
              className="text-black"
              {...field}
              value={gigOptions.filter((option) => gigIds?.includes(option.value))}
              onChange={(selected) => {
                field.onChange(selected.map((option) => option.value));
              }}
            />
          )}
        />
      </div>
    </Card>
  );
}
