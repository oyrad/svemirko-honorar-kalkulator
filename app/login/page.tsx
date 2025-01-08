import Image from 'next/image';
import { Suspense } from 'react';
import { LoginForm } from '@/app/login/_components/LoginForm';
import { Card } from '@/ui/atoms/Card';

export default function Login() {
  return (
    <Card className="p-6">
      <Image src="/logo.png" alt="logo" width={800} height={200} className="mb-8 p-4" priority />
      <Suspense>
        <LoginForm />
      </Suspense>
    </Card>
  );
}
