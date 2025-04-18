"use client";

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface QuizLayoutProps {
  children: ReactNode;
  title?: string;
  showBackButton?: boolean;
  backPath?: string;
  className?: string;
}

export default function QuizLayout({
  children,
  title,
  showBackButton = true,
  backPath,
  className = ''
}: QuizLayoutProps) {
  const router = useRouter();

  useEffect(() => {
    // Инициализация Telegram Mini App
    const tg = window.Telegram?.WebApp;
    if (tg) {
      tg.ready();
      
      // Настраиваем цвет верхней панели
      tg.setHeaderColor('#FFFFFF');
      
      // Показываем кнопку "Назад" в хедере, если нужно
      if (showBackButton) {
        tg.BackButton.show();
        tg.BackButton.onClick(() => {
          if (backPath) {
            router.push(backPath);
          } else {
            router.back();
          }
        });
      } else {
        tg.BackButton.hide();
      }
    }
  }, [router, showBackButton, backPath]);

  const handleBackClick = () => {
    if (backPath) {
      router.push(backPath);
    } else {
      router.back();
    }
  };

  return (
    <div 
      className={`min-h-screen flex flex-col bg-white ${className}`}
    >
      {/* Верхний блок с заголовком и кнопкой "Назад" */}
      <div className="p-4 flex items-center">
        {showBackButton && (
          <button
            onClick={handleBackClick}
            className="flex items-center mr-4"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
        
        {title && (
          <h1 className="text-xl font-semibold">{title}</h1>
        )}
      </div>
      
      {/* Радиальный градиент на фоне */}
      <div className="absolute inset-0 bg-gradient-radial from-blue-50/20 to-transparent pointer-events-none" />
      
      {/* Основной контент */}
      <div className="flex-1 px-4 z-10">
        {children}
      </div>
    </div>
  );
} 