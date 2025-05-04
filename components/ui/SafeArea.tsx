"use client";

import React, { ReactNode } from 'react';
import { useTelegram } from '../../hooks/useTelegram';

interface SafeAreaProps {
  children: ReactNode;
  top?: boolean;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
  className?: string;
}

const SafeArea: React.FC<SafeAreaProps> = ({
  children,
  top = true,
  bottom = true,
  left = true,
  right = true,
  className = '',
}) => {
  const { isInTelegram } = useTelegram();
  
  // Default safe area values (can be adjusted based on device)
  const safeAreaInsets = {
    top: top ? 'env(safe-area-inset-top, 0px)' : '0px',
    bottom: bottom ? 'env(safe-area-inset-bottom, 0px)' : '0px',
    left: left ? 'env(safe-area-inset-left, 0px)' : '0px',
    right: right ? 'env(safe-area-inset-right, 0px)' : '0px',
  };

  // Extra padding for Telegram environment
  const telegramInsets = {
    // Telegram typically has a header bar that is 42-56px high
    top: isInTelegram && top ? '56px' : '0px',
    bottom: '0px',
    left: '0px',
    right: '0px',
  };

  return (
    <div 
      className={`safe-area ${className}`}
      style={{
        paddingTop: `calc(${safeAreaInsets.top} + ${telegramInsets.top})`,
        paddingBottom: `calc(${safeAreaInsets.bottom} + ${telegramInsets.bottom})`,
        paddingLeft: `calc(${safeAreaInsets.left} + ${telegramInsets.left})`,
        paddingRight: `calc(${safeAreaInsets.right} + ${telegramInsets.right})`,
      }}
    >
      {children}
    </div>
  );
};

export default SafeArea; 