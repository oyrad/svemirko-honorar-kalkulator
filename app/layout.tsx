import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'kalkulator by darac',
  description: 'calculate ur gains',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="space-y-4 xl:px-[26rem] lg:px-[22rem] md:px-[18rem] px-8 mt-8 max-w-[1280px] mx-auto">
          {children}
        </div>
      </body>
    </html>
  );
}
