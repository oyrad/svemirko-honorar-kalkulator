import { ReactNode, Suspense } from 'react';
import { Loader } from '@/ui/atoms/Loader';

export default function CreateReportLayout({ children }: { children: ReactNode }) {
  return <Suspense fallback={<Loader />}>{children}</Suspense>;
}
