"use client";

import { useEffect, useState, useCallback } from 'react';
import { WebAppProvider, useWebApp } from '@vkruglikov/react-telegram-web-app';

interface UserInfo {
  id: number | string;
  first_name?: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  is_guest?: boolean;
}

export const useTelegram = () => {
  // Используем хук из официальной библиотеки
  const webApp = useWebApp();
  
  const [safeAreaInsets, setSafeAreaInsets] = useState({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  });
  
  const [contentSafeAreaInsets, setContentSafeAreaInsets] = useState({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  });
  
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (webApp) {
      // Инициализация
      webApp.ready();
      
      // Инициализация safe area insets, если доступны
      if ('safeAreaInset' in webApp) {
        setSafeAreaInsets(webApp.safeAreaInset as any);
      }
      
      if ('contentSafeAreaInset' in webApp) {
        setContentSafeAreaInsets(webApp.contentSafeAreaInset as any);
      }
      
      if ('isFullscreen' in webApp) {
        setIsFullscreen(webApp.isFullscreen as boolean);
      }
      
      // Обработчики событий
      const handleSafeAreaChanged = () => {
        if ('safeAreaInset' in webApp) {
          setSafeAreaInsets(webApp.safeAreaInset as any);
        }
      };
      
      const handleContentSafeAreaChanged = () => {
        if ('contentSafeAreaInset' in webApp) {
          setContentSafeAreaInsets(webApp.contentSafeAreaInset as any);
        }
      };
      
      const handleFullscreenChanged = () => {
        if ('isFullscreen' in webApp) {
          setIsFullscreen(webApp.isFullscreen as boolean);
        }
      };
      
      webApp.onEvent('safeAreaChanged', handleSafeAreaChanged);
      webApp.onEvent('contentSafeAreaChanged', handleContentSafeAreaChanged);
      webApp.onEvent('fullscreenChanged', handleFullscreenChanged);
      
      return () => {
        webApp.offEvent('safeAreaChanged', handleSafeAreaChanged);
        webApp.offEvent('contentSafeAreaChanged', handleContentSafeAreaChanged);
        webApp.offEvent('fullscreenChanged', handleFullscreenChanged);
      };
    }
  }, [webApp]);

  const onClose = useCallback(() => {
    if (webApp) {
      webApp.close();
    }
  }, [webApp]);

  const onExpand = useCallback(() => {
    if (webApp) {
      webApp.expand();
    }
  }, [webApp]);

  const onReady = useCallback(() => {
    if (webApp) {
      webApp.ready();
    }
  }, [webApp]);
  
  const requestFullscreen = useCallback(async () => {
    if (webApp && 'requestFullscreen' in webApp) {
      try {
        await (webApp as any).requestFullscreen();
        return true;
      } catch (error) {
        console.error('Fullscreen request failed:', error);
        return false;
      }
    }
    return false;
  }, [webApp]);
  
  const exitFullscreen = useCallback(async () => {
    if (webApp && 'exitFullscreen' in webApp) {
      try {
        await (webApp as any).exitFullscreen();
        return true;
      } catch (error) {
        console.error('Exit fullscreen failed:', error);
        return false;
      }
    }
    return false;
  }, [webApp]);
  
  const toggleFullscreen = useCallback(async () => {
    if (webApp) {
      if (isFullscreen) {
        return exitFullscreen();
      } else {
        return requestFullscreen();
      }
    }
    return false;
  }, [webApp, isFullscreen, requestFullscreen, exitFullscreen]);

  // Получение информации о пользователе
  const getUserInfo = (): UserInfo => {
    try {
      if (!webApp || !webApp.initDataUnsafe || !('user' in webApp.initDataUnsafe) || !webApp.initDataUnsafe.user) {
        return {
          id: 'guest_' + Date.now().toString().slice(0, -3),
          is_guest: true
        };
      }
      
      // В этом месте мы уже знаем, что user существует
      const user = webApp.initDataUnsafe.user;
      const { id, username, first_name, last_name, ...restUserData } = user;
      return {
        id,
        username,
        first_name,
        last_name,
        ...restUserData
      };
    } catch (e) {
      console.error('Error getting user info:', e);
      return {
        id: 'guest_' + Date.now().toString().slice(0, -3),
        is_guest: true
      };
    }
  };

  // Проверка, запущено ли приложение внутри Telegram
  const isInTelegram = Boolean(webApp?.initData);

  // Показать уведомление Telegram
  const showAlert = (message: string) => {
    try {
      if (webApp) {
        webApp.showAlert(message);
      } else {
        alert(message);
      }
    } catch (error) {
      console.log('Error showing alert:', error);
      alert(message);
    }
  };

  // Показать всплывающее окно Telegram
  const showPopup = (title: string, message: string, buttons: { type: 'default' | 'ok' | 'close' | 'cancel' | 'destructive', text: string }[]) => {
    try {
      if (webApp) {
        webApp.showPopup({
          title,
          message,
          buttons
        });
      } else {
        alert(`${title}\n${message}`);
      }
    } catch (error) {
      console.log('Error showing popup:', error);
      alert(`${title}\n${message}`);
    }
  };

  // Показать кнопку назад
  const showBackButton = () => {
    try {
      if (webApp?.BackButton) {
        webApp.BackButton.show();
      }
    } catch (error) {
      console.log('Error showing back button:', error);
    }
  };

  // Скрыть кнопку назад
  const hideBackButton = () => {
    try {
      if (webApp?.BackButton) {
        webApp.BackButton.hide();
      }
    } catch (error) {
      console.log('Error hiding back button:', error);
    }
  };

  // Добавить обработчик нажатия на кнопку назад
  const onBackButtonClick = (callback: () => void) => {
    try {
      if (webApp?.BackButton) {
        webApp.BackButton.onClick(callback);
      }
    } catch (error) {
      console.log('Error setting back button click handler:', error);
    }
  };

  // Показать индикатор загрузки
  const showLoader = () => {
    try {
      if (webApp) {
        webApp.showProgress();
      }
    } catch (error) {
      console.log('Error showing loader:', error);
    }
  };

  // Скрыть индикатор загрузки
  const hideLoader = () => {
    try {
      if (webApp) {
        webApp.stopProgress();
      }
    } catch (error) {
      console.log('Error hiding loader:', error);
    }
  };

  const setHeaderColor = (color: string) => {
    try {
      if (webApp) {
        webApp.setHeaderColor(color);
      }
    } catch (error) {
      console.log('Error setting header color:', error);
    }
  };

  const updateBackButton = (show: boolean, callback?: () => void) => {
    try {
      if (!webApp?.BackButton) return;
      
      if (show) {
        webApp.BackButton.show();
        if (callback) {
          webApp.BackButton.onClick(callback);
        }
      } else {
        webApp.BackButton.hide();
      }
    } catch (error) {
      console.log('Error updating back button:', error);
    }
  };

  return {
    webApp,
    onClose,
    onExpand,
    onReady,
    platform: webApp?.platform || 'unknown',
    user: webApp?.initDataUnsafe && 'user' in webApp.initDataUnsafe ? webApp.initDataUnsafe.user : undefined,
    queryId: webApp?.initDataUnsafe?.query_id,
    safeAreaInsets,
    contentSafeAreaInsets,
    isFullscreen,
    requestFullscreen,
    exitFullscreen,
    toggleFullscreen,
    isInTelegram,
    getUserInfo,
    showAlert,
    showPopup,
    showBackButton,
    hideBackButton,
    onBackButtonClick,
    showLoader,
    hideLoader,
    setHeaderColor,
    updateBackButton
  };
}; 