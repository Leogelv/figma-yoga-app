import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { PracticeFlowProvider } from '@/context/PracticeFlowContext';
import { TelegramAuthProvider } from '@/context/TelegramAuthContext';

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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Create a Telegram WebApp mock if it doesn't exist
              if (typeof window !== 'undefined' && !window.Telegram) {
                window.Telegram = {
                  WebApp: {
                    initData: '',
                    initDataUnsafe: { user: null },
                    ready: function() {},
                    expand: function() {},
                    close: function() {},
                    showAlert: function(message) { console.log('TG Alert:', message); },
                    showPopup: function() {},
                    setHeaderColor: function() {},
                    enableClosingConfirmation: function() {},
                    BackButton: {
                      show: function() {},
                      hide: function() {},
                      onClick: function() {}
                    }
                  }
                };
                console.log('Telegram WebApp mock created for non-Telegram environment');
              }
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <TelegramAuthProvider>
          {children}
        </TelegramAuthProvider>
      </body>
    </html>
  );
}
