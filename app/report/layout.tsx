import { PropsWithChildren } from 'react';

export default function ReportLayout({ children }: PropsWithChildren) {
  return <div className="mt-8 flex flex-col gap-4">{children}</div>;
}
