import { useSelectedYearStore } from '@/app/stores/use-selected-year-store';
import { cn } from '@/utils/cn';

interface YearSelectProps {
  className?: string;
}

export function YearSelect({ className = '' }: YearSelectProps) {
  const { selectedYear, setSelectedYear } = useSelectedYearStore();

  return (
    <select
      value={selectedYear}
      onChange={(e) => setSelectedYear(e.target.value)}
      className={cn(
        'px-2 py-1 rounded-lg border border-gray-300 dark:border-gray-700 outline-none text-sm sm:text-base',
        className,
      )}
    >
      <option value="2025">2025</option>
      <option value="2024">2024</option>
      {/*<option value="2023">2023</option>*/}
    </select>
  );
}
