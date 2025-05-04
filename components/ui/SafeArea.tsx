"use client";

import React, { ReactNode } from 'react';
import { useTelegram } from '@/hooks/useTelegram';

interface SafeAreaProps {
  children: ReactNode;
  top?: boolean;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
  className?: string;
}

export const SafeArea: React.FC<SafeAreaProps> = ({
  children,
  top = true,
  bottom = true,
  left = true,
  right = true,
  className = "",
}) => {
  const { safeAreaInsets, isInTelegram } = useTelegram();

  // Если приложение не запущено в Telegram, используем стандартные отступы
  const insets = isInTelegram ? safeAreaInsets : { top: 0, bottom: 0, left: 0, right: 0 };

  // Создаем стили на основе переданных параметров и инсетов
  const style = {
    paddingTop: top ? `${insets.top}px` : 0,
    paddingBottom: bottom ? `${insets.bottom}px` : 0,
    paddingLeft: left ? `${insets.left}px` : 0,
    paddingRight: right ? `${insets.right}px` : 0,
  };

  return (
    <div style={style} className={`safe-area ${className}`}>
      {children}
    </div>
  );
};

// Также создаем компонент для контентной области, которая может иметь другие инсеты
export const ContentSafeArea: React.FC<SafeAreaProps> = ({
  children,
  top = true,
  bottom = true,
  left = true,
  right = true,
  className = "",
}) => {
  const { contentSafeAreaInsets, isInTelegram } = useTelegram();

  // Если приложение не запущено в Telegram, используем стандартные отступы
  const insets = isInTelegram ? contentSafeAreaInsets : { top: 0, bottom: 0, left: 0, right: 0 };

  // Создаем стили на основе переданных параметров и инсетов
  const style = {
    paddingTop: top ? `${insets.top}px` : 0,
    paddingBottom: bottom ? `${insets.bottom}px` : 0,
    paddingLeft: left ? `${insets.left}px` : 0,
    paddingRight: right ? `${insets.right}px` : 0,
  };

  return (
    <div style={style} className={`content-safe-area ${className}`}>
      {children}
    </div>
  );
}; 