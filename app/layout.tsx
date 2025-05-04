import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { PracticeFlowProvider } from '@/context/PracticeFlowContext';
import { TelegramAuthProvider } from '@/context/TelegramAuthContext';
import Script from 'next/script';
import { WebAppProvider } from '@vkruglikov/react-telegram-web-app';

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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        {/* Официальный скрипт Telegram Web App */}
        <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
      </head>
      <body className={inter.className}>
        <WebAppProvider>
          <TelegramAuthProvider>
            <PracticeFlowProvider>
              {children}
            </PracticeFlowProvider>
          </TelegramAuthProvider>
        </WebAppProvider>
      </body>
    </html>
  );
}
