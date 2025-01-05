import Card from '@/app/_atoms/Card';
import Image from 'next/image';
import { Suspense } from 'react';
import { LoginForm } from '@/app/login/_components/LoginForm';

export default function Login() {
  return (
    <Card className="p-6">
      <Image
        src="/logo.png"
        alt="logo"
        width={800}
        height={200}
        className="mb-8 p-4"
      />
      <Suspense>
        <LoginForm />
      </Suspense>
    </Card>
  );
}
