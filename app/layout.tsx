import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { PracticeFlowProvider } from '@/context/PracticeFlowContext';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  title: 'Yoga & Meditation App',
  description: 'Yoga and meditation practices for your wellbeing',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
