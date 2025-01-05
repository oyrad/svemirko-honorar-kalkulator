interface OverviewItemProps {
  label: string;
  value: string | number;
}

export function OverviewItem({ label, value }: OverviewItemProps) {
  return (
    <div>
      <p className="text-xs uppercase font-semibold">{label}</p>
      <p className="text-gray-600 dark:text-gray-300">{value}</p>
    </div>
  );
}
