import '../styles/globals.css';

import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Netflix Modal',
  description: 'Netflix modal built with Next.js',
};

type RootLayoutProps = {
  children: ReactNode;
  modal: ReactNode;
};

export default function RootLayout({ children, modal }: RootLayoutProps) {
  return (
    <html lang='en' className='dark' style={{ colorScheme: 'dark' }}>
      <body
        className={cn(
          `${inter.className} dark relative flex min-h-dvh flex-col items-center justify-center overflow-x-hidden bg-black p-10`
        )}
      >
        {children}
        {modal}
      </body>
    </html>
  );
}
