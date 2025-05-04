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
                    ready: function() { console.log('Telegram WebApp ready called'); },
                    expand: function() { console.log('Telegram WebApp expand called'); },
                    close: function() { console.log('Telegram WebApp close called'); },
                    showAlert: function(message) { console.log('TG Alert:', message); },
                    showPopup: function(params) { 
                      console.log('TG Popup:', params.title, params.message);
                      setTimeout(() => {
                        if (params.buttons && params.buttons.length > 0) {
                          const defaultButton = params.buttons.find(b => b.type === 'default') || params.buttons[0];
                          if (defaultButton.id) {
                            window.Telegram.WebApp.triggerEvent('popupClosed', {button_id: defaultButton.id});
                          }
                        }
                      }, 2000);
                    },
                    setHeaderColor: function(color) { console.log('TG setHeaderColor:', color); },
                    enableClosingConfirmation: function() { console.log('TG enableClosingConfirmation called'); },
                    disableClosingConfirmation: function() { console.log('TG disableClosingConfirmation called'); },
                    showProgress: function() { console.log('TG showProgress called'); },
                    stopProgress: function() { console.log('TG stopProgress called'); },
                    isVersionAtLeast: function(ver) { return true; },
                    triggerEvent: function(eventName, eventData) {
                      console.log('TG triggerEvent:', eventName, eventData);
                    },
                    BackButton: {
                      show: function() { console.log('TG BackButton show called'); },
                      hide: function() { console.log('TG BackButton hide called'); },
                      onClick: function(callback) { console.log('TG BackButton onClick set'); },
                      isVisible: false
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
          <PracticeFlowProvider>
            {children}
          </PracticeFlowProvider>
        </TelegramAuthProvider>
      </body>
    </html>
  );
}
