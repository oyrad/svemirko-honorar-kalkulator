'use client';

import Card from '@/app/_atoms/Card';
import { useRouter } from 'next/navigation';

interface ReportInfoProps {
  id: string;
  name: string;
}

export default function ReportInfo({ id, name }: ReportInfoProps) {
  const router = useRouter();
  return (
    <Card
      className="py-3 cursor-pointer shadow-md hover:opacity-65 transition-opacity duration-300 flex justify-between items-center"
      onClick={() => router.push(`/report/${id}`)}
    >
      <p className="font-medium">{name}</p>
    </Card>
  );
}
