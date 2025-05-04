"use client";

import React, { ReactNode, useEffect, useRef } from 'react';
import { useTelegram } from '../../hooks/useTelegram';
import BottomNav from './BottomNav';

interface TelegramLayoutProps {
  children: ReactNode;
  noVerticalSwipe?: boolean;
  topPadding?: number;
  fullWidth?: boolean;
  className?: string;
  showBottomNav?: boolean;
}

const TelegramLayout: React.FC<TelegramLayoutProps> = ({
  children,
  noVerticalSwipe = true,
  topPadding = 0,
  fullWidth = true,
  className = '',
  showBottomNav = true,
}) => {
  const { isInTelegram, tg } = useTelegram();
  const containerRef = useRef<HTMLDivElement>(null);

  // Раскрываем приложение на весь экран при монтировании
  useEffect(() => {
    if (isInTelegram && tg.expand) {
      try {
        tg.expand();
      } catch (e) {
        console.log('Failed to expand app:', e);
      }
    }
  }, [isInTelegram, tg]);

  // Обработка вертикальных свайпов только на клиенте
  useEffect(() => {
    if (typeof window === 'undefined' || !noVerticalSwipe || !containerRef.current) return;

    const container = containerRef.current;
    const preventDefaultForScrollKeys = (e: KeyboardEvent) => {
      const keys: Record<number, number> = { 37: 1, 38: 1, 39: 1, 40: 1 };
      if (keys[e.keyCode]) {
        e.preventDefault();
        return false;
      }
      return true;
    };

    // Предотвращение вертикальных свайпов
    const preventVerticalSwipe = (e: TouchEvent) => {
      const touchStartY = e.touches[0].clientY;
      
      const handleTouchMove = (moveEvent: TouchEvent) => {
        const touchY = moveEvent.touches[0].clientY;
        const deltaY = touchY - touchStartY;
        
        // Если вертикальный свайп значительный, блокируем его
        if (Math.abs(deltaY) > 10) {
          moveEvent.preventDefault();
        }
      };
      
      const handleTouchEnd = () => {
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
      
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
    };
    
    // Применяем обработчики
    container.addEventListener('touchstart', preventVerticalSwipe, { passive: false });
    document.addEventListener('keydown', preventDefaultForScrollKeys, false);
    
    return () => {
      container.removeEventListener('touchstart', preventVerticalSwipe);
      document.removeEventListener('keydown', preventDefaultForScrollKeys);
    };
  }, [noVerticalSwipe]);

  return (
    <div 
      ref={containerRef}
      className={`telegram-layout ${fullWidth ? 'w-full' : 'max-w-md mx-auto'} ${className}`}
      style={{
        minHeight: '100vh',
        paddingTop: isInTelegram ? `${topPadding}px` : '0',
        paddingBottom: showBottomNav ? '4rem' : '0',
        overflowX: 'hidden',
        overflowY: noVerticalSwipe ? 'hidden' : 'auto',
        touchAction: noVerticalSwipe ? 'pan-x' : 'auto',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      <div className="h-full w-full animate-fadeIn">
        {children}
      </div>
      
      {showBottomNav && <BottomNav />}
    </div>
  );
};

export default TelegramLayout; 