import { YearSelect } from '@/app/_components/YearSelect';
import { Tabs } from '@/app/_components/Tabs';

export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <p className="uppercase font-bold font-mono text-2xl text-slate-700 dark:text-slate-100">
          svmrk_kalkulator
        </p>
        <YearSelect />
      </div>

      <Tabs />
    </div>
  );
}
