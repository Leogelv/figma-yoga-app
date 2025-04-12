"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import QuizButton from './QuizButton';
import AnimatedCircles from './AnimatedCircles';

interface QuizLayoutProps {
  children: React.ReactNode;
  questionText: string;
  onNext?: (selectedOption?: string) => void;
  backUrl?: string;
  showContinueButton?: boolean;
  showBackButton?: boolean;
  autoAdvance?: boolean;
  selectedOption?: string;
  onOptionSelect?: (option: string) => void;
}

export default function QuizLayout({
  children,
  questionText,
  onNext,
  backUrl,
  showContinueButton = true,
  showBackButton = true,
  autoAdvance = true,
  selectedOption = '',
  onOptionSelect,
}: QuizLayoutProps) {
  const router = useRouter();
  const [tg, setTg] = useState<any>(null);
  
  useEffect(() => {
    // Инициализация Telegram Mini App
    const telegram = window.Telegram?.WebApp;
    if (telegram) {
      telegram.ready();
      setTg(telegram);
      
      // Настраиваем цвет верхней панели
      telegram.setHeaderColor('#FFFFFF');
      
      // Показываем кнопку "Назад" в шапке Telegram
      telegram.BackButton.show();
      
      // При нажатии на кнопку "Назад" в шапке
      telegram.BackButton.onClick(() => {
        handleBack();
      });
    }
    
    return () => {
      // Скрываем кнопку при размонтировании компонента
      if (tg) {
        tg.BackButton.hide();
      }
    };
  }, []);

  const handleBack = useCallback(() => {
    if (backUrl) {
      router.push(backUrl);
    } else {
      router.back();
    }
  }, [backUrl, router]);
  
  const handleNext = useCallback(() => {
    if (onNext) {
      onNext(selectedOption);
    }
  }, [onNext, selectedOption]);

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      background: '#FFFFFF',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Анимированные круги */}
      <AnimatedCircles gradientColors="#4880FF, #76A6FF" showHumanIcon={false} />
      
      <div style={{ 
        padding: '16px', 
        display: 'flex', 
        flexDirection: 'column',
        flex: 1,
        position: 'relative',
        zIndex: 5
      }}>
        {/* Кнопка "Назад" */}
        {showBackButton && (
          <button 
            onClick={handleBack}
            style={{
              background: 'none',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              padding: '8px 0',
              cursor: 'pointer',
              marginBottom: '16px'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 19L5 12L12 5" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={{ 
              marginLeft: '8px',
              fontFamily: 'Inter',
              fontWeight: 500,
              fontSize: '16px'
            }}>Назад</span>
          </button>
        )}
        
        {/* Вопрос */}
        <h2 style={{
          fontFamily: 'Montserrat',
          fontWeight: 600,
          fontSize: '24px',
          color: '#000000',
          marginBottom: '24px'
        }}>
          {questionText}
        </h2>
        
        {/* Дочерние компоненты (опции) */}
        <div style={{ flex: 1 }}>
          {children}
        </div>
        
        {/* Кнопка "Продолжить" */}
        {showContinueButton && !autoAdvance && (
          <div style={{ marginTop: '24px' }}>
            <QuizButton
              text="Продолжить"
              onClick={handleNext}
              disabled={!selectedOption}
            />
          </div>
        )}
      </div>
    </div>
  );
} 