import { ReactNode, Suspense } from 'react';
import { Loader } from '@/app/_atoms/Loader';

export default function CreateReportLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <Suspense fallback={<Loader />}>{children}</Suspense>;
}
