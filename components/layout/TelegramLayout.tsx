"use client";

import React, { useEffect, ReactNode } from 'react';
import { useTelegram } from '@/hooks/useTelegram';
import { SafeArea, ContentSafeArea } from '@/components/ui/SafeArea';

interface TelegramLayoutProps {
  children: ReactNode;
  expandApp?: boolean;
  fullscreen?: boolean;
  withSafeArea?: boolean;
  noTopSafeArea?: boolean;
  noBottomSafeArea?: boolean;
}

const TelegramLayout: React.FC<TelegramLayoutProps> = ({
  children,
  expandApp = true,
  fullscreen = true,
  withSafeArea = true,
  noTopSafeArea = false,
  noBottomSafeArea = false,
}) => {
  const { onExpand, onReady, webApp, requestFullscreen, exitFullscreen, isFullscreen } = useTelegram();

  useEffect(() => {
    // Инициализируем Telegram Web App
    onReady();

    // Если указан параметр expandApp, раскрываем приложение на весь экран Telegram
    if (expandApp && webApp) {
      onExpand();
    }

    // Управление полноэкранным режимом
    const handleFullscreen = async () => {
      if (fullscreen && !isFullscreen) {
        await requestFullscreen();
        console.log('Requested fullscreen mode');
      } else if (!fullscreen && isFullscreen) {
        await exitFullscreen();
        console.log('Exited fullscreen mode');
      }
    };

    // Пытаемся войти в полноэкранный режим сразу, а также при изменении состояния
    handleFullscreen();

    // При размонтировании компонента выходим из полноэкранного режима, если он был включен
    return () => {
      if (isFullscreen) {
        exitFullscreen();
      }
    };
  }, [onReady, onExpand, expandApp, webApp, fullscreen, isFullscreen, requestFullscreen, exitFullscreen]);

  // Если withSafeArea=true, оборачиваем контент в SafeArea
  if (withSafeArea) {
    return (
      <SafeArea top={!noTopSafeArea} bottom={!noBottomSafeArea}>
        <ContentSafeArea>
          {children}
        </ContentSafeArea>
      </SafeArea>
    );
  }

  // Иначе возвращаем контент без SafeArea
  return <>{children}</>;
};

export default TelegramLayout; 