import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ReactNode } from 'react';

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
        <div className="space-y-4 xl:px-[24rem] lg:px-[20rem] md:px-[16rem] px-8 mt-8 max-w-[1280px] mx-auto">
          {children}
        </div>
      </body>
    </html>
  );
}
