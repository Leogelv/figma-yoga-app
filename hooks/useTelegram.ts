"use client";

import { useEffect, useState } from 'react';

// Create a mock WebApp that will be used outside of Telegram
const createMockWebApp = () => {
  return {
    initData: '',
    initDataUnsafe: { user: null },
    ready: () => {},
    setHeaderColor: (color: string) => {
      console.log('Mock setHeaderColor:', color);
    },
    enableClosingConfirmation: () => {},
    BackButton: {
      show: () => {},
      hide: () => {},
      onClick: (callback: () => void) => {
        console.log('Mock BackButton onClick set');
      },
      isVisible: false
    },
    expand: () => {},
    showAlert: (message: string) => { console.log('TG Alert:', message); },
    showPopup: () => {},
    close: () => {},
    showProgress: () => {},
    stopProgress: () => {},
    isVersionAtLeast: () => true
  };
};

// Check WebApp availability and use mock if it's not available
const getWebApp = () => {
  if (typeof window !== 'undefined') {
    // @ts-ignore - в глобальном объекте window может быть объект Telegram
    const telegramApp = window.Telegram?.WebApp;
    if (telegramApp) {
      return telegramApp;
    }
  }
  return createMockWebApp();
};

// Interface for getUserInfo function return
interface UserInfo {
  id: string | number;
  username?: string;
  firstName?: string;
  lastName?: string;
  [key: string]: any;
}

// Hook to interact with Telegram WebApp
export const useTelegram = () => {
  const [isReady, setIsReady] = useState(false);
  const webApp = getWebApp();
  const tg = webApp;

  // Determine if we are in Telegram or not
  const isInTelegram = Boolean(typeof window !== 'undefined' && window.Telegram);

  // Function to get user info from Telegram
  const getUserInfo = (): UserInfo | null => {
    if (!isInTelegram || !webApp.initDataUnsafe.user) {
      // Return mock user for development
      return {
        id: 'guest_' + Date.now().toString().slice(0, -3), // Use timestamp as a unique ID
        firstName: 'Guest',
        lastName: 'User',
        username: 'guest_user'
      };
    }

    const { id, username, first_name, last_name, ...restUserData } = webApp.initDataUnsafe.user;
    return {
      id,
      username,
      firstName: first_name,
      lastName: last_name,
      ...restUserData
    };
  };

  // Function to show alert in Telegram
  const showAlert = (message: string) => {
    webApp.showAlert(message);
  };

  // Function to show popup in Telegram
  const showPopup = (
    title: string,
    message: string,
    buttons: { type: 'default' | 'ok' | 'close' | 'cancel' | 'destructive'; text: string }[]
  ) => {
    webApp.showPopup({ title, message, buttons });
  };

  // Function to close the app
  const closeApp = () => {
    webApp.close();
  };

  // Function to set header color
  const setHeaderColor = (color: string) => {
    try {
      if (webApp && webApp.setHeaderColor) {
        webApp.setHeaderColor(color);
      }
    } catch (error) {
      console.error('Error setting header color:', error);
    }
  };

  // Function to update back button
  const updateBackButton = (show: boolean, callback?: () => void) => {
    try {
      if (!webApp || !webApp.BackButton) return;
      
      if (show) {
        webApp.BackButton.show();
        if (callback) {
          webApp.BackButton.onClick(callback);
        }
      } else {
        webApp.BackButton.hide();
      }
    } catch (error) {
      console.error('Error updating back button:', error);
    }
  };

  // Function to toggle closing confirmation
  const toggleClosingConfirmation = (enabled: boolean) => {
    if (enabled) {
      webApp.enableClosingConfirmation();
    } else {
      // Note: there's no disableClosingConfirmation method,
      // so to disable it, we need to implement workaround if needed
    }
  };

  // Initialize app on mount
  useEffect(() => {
    if (isInTelegram && webApp.ready) {
      webApp.ready();
    }
    setIsReady(true);
  }, [webApp, isInTelegram]);

  return {
    isReady,
    isInTelegram,
    getUserInfo,
    showAlert,
    showPopup,
    closeApp,
    setHeaderColor,
    updateBackButton,
    toggleClosingConfirmation,
    expand: webApp.expand,
    tg
  };
}; 