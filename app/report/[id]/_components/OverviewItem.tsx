interface OverviewItemProps {
  label: string;
  value: string | number;
  className?: string;
}

export function OverviewItem({ label, value, className = '' }: OverviewItemProps) {
  return (
    <div className={className}>
      <p className="text-xs uppercase font-semibold">{label}</p>
      <p className="text-gray-600 dark:text-gray-300">{value}</p>
    </div>
  );
}
