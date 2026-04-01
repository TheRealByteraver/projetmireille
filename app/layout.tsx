import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import ReactQueryClientProvider from '@/components/system/ReactQueryClientProvider';
import { classNames } from '@/utils/classNames';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Droites numériques',
  description: 'Educational platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return (
    <ReactQueryClientProvider>
      <html lang="en" className="h-full w-full">
        <body className={classNames(`${geistSans.variable} ${geistMono.variable} antialiased`, 'h-full w-full')}>
          {children}
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
