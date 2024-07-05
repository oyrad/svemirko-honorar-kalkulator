'use client';

import Card from '@/app/_atoms/Card';
import { useRouter } from 'next/navigation';

interface ReportInfoProps {
  name: string;
}

export default function ReportInfo({ name }: ReportInfoProps) {
  const router = useRouter();
  return (
    <Card
      className="py-3 cursor-pointer shadow-md"
      onClick={() => router.push(`/report/${name}`)}
    >
      <p className="font-medium">{name}</p>
    </Card>
  );
}
