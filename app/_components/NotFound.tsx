import Link from 'next/link';
import ArrowLeft from '@/app/_icons/ArrowLeft';
import Card from '@/app/_atoms/Card';

interface NotFoundProps {
  backLink: string;
  text: string;
}

export default function NotFound({ backLink, text }: NotFoundProps) {
  return (
    <Card className="flex gap-4 items-center">
      <Link href={backLink}>
        <ArrowLeft />
      </Link>
      <p>{text}</p>
    </Card>
  );
}
