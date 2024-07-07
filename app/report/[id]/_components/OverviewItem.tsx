interface OverviewItemProps {
  label: string;
  value: string | number;
}

export default function OverviewItem({ label, value }: OverviewItemProps) {
  return (
    <div>
      <p className="text-xs uppercase font-semibold">{label}</p>
      <p className="text-gray-400">{value}</p>
    </div>
  );
}
