import { Button } from '@/app/_atoms/Button';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

export function BackButton({ link }: { link: string }) {
  return (
    <Link href={link}>
      <Button className="border border-gray-500 bg-white dark:bg-gray-800 px-2 py-1.5 hover:opacity-75">
        <ArrowLeftIcon className="size-5 text-gray-700 dark:text-gray-100" />
      </Button>
    </Link>
  );
}
