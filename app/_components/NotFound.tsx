import Link from 'next/link';
import { Card } from '@/app/_atoms/Card';
import { ArrowLeft } from '@/app/_icons/ArrowLeft';

interface NotFoundProps {
  backLink: string;
  text: string;
}

export function NotFound({ backLink, text }: NotFoundProps) {
  return (
    <Card className="flex gap-4 items-center">
      <Link href={backLink}>
        <ArrowLeft />
      </Link>
      <p>{text}</p>
    </Card>
  );
}
