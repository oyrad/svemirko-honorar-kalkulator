import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ReactNode } from 'react';
import NextTopLoader from 'nextjs-toploader';
import Providers from '@/app/_components/Providers';

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
          <main className="space-y-4 xl:px-[24rem] lg:px-[20rem] md:px-[16rem] px-6 mt-8 max-w-[1280px] mx-auto mb-8">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
