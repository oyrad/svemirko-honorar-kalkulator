import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ReactNode, Suspense } from 'react';
import NextTopLoader from 'nextjs-toploader';
import { Providers } from '@/ui/components/Providers';
import { Loader } from '@/ui/atoms/Loader';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'kalkulator by darac',
  description: 'calculate ur gains',
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextTopLoader showSpinner={false} />
        <Providers>
          <main className="space-y-4 xl:px-[24rem] lg:px-[18rem] md:px-[12rem] px-6 mt-8 max-w-[1280px] mx-auto mb-8">
            <Suspense fallback={<Loader />}>{children}</Suspense>
          </main>
        </Providers>
      </body>
    </html>
  );
}
