import { useFormContext } from 'react-hook-form';
import { ReportFormData } from '@/app/report/create/page';
import { Card } from '@/ui/atoms/Card';

export function Settings() {
  const { register } = useFormContext<ReportFormData>();

  return (
    <Card className="flex flex-col py-3 space-y-1">
      <p className="font-semibold">Postavke</p>
      <div className="flex justify-between">
        <div className="flex items-center space-x-2">
          <input type="checkbox" id="booking" {...register('isThereBookingFee')} />
          <label htmlFor="booking" className="text-sm">
            Booking fee
          </label>
        </div>
      </div>
      <div className="grid grid-cols-2">
        <div className="flex items-center space-x-2">
          <input type="radio" value="deal" id="deal" {...register('split')} />
          <label htmlFor="deal" className="text-sm">
            45/27.5/27.5
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <input type="radio" value="equal" id="equal" {...register('split')} />
          <label htmlFor="equal" className="text-sm">
            Svi isto
          </label>
        </div>
      </div>
    </Card>
  );
}
