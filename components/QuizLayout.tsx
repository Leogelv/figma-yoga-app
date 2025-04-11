import React, { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import QuizButton from './QuizButton';
import AnimatedBackground from './AnimatedBackground';

interface QuizLayoutProps {
  children: ReactNode;
  title: string;
  showBackButton?: boolean;
  showContinueButton?: boolean;
  onBackClick?: () => void;
  onContinueClick?: () => void;
  continueDisabled?: boolean;
  autoAdvance?: boolean;
  selectedOption?: string | null;
}

export default function QuizLayout({
  children,
  title,
  showBackButton = true,
  showContinueButton = true,
  onBackClick,
  onContinueClick,
  continueDisabled = false,
  autoAdvance = false,
  selectedOption = null,
}: QuizLayoutProps) {
  const router = useRouter();

  // Если выбран вариант и включен автоматический переход, запускаем таймер для перехода
  useEffect(() => {
    if (autoAdvance && selectedOption && onContinueClick) {
      const timer = setTimeout(() => {
        onContinueClick();
      }, 400); // Задержка для анимации
      
      return () => clearTimeout(timer);
    }
  }, [autoAdvance, selectedOption, onContinueClick]);

  // Обработчик нажатия кнопки "Назад" в интерфейсе
  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      router.back();
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      maxWidth: '375px',
      margin: '0 auto',
      backgroundColor: '#FFFFFF',
      position: 'relative'
    }}>
      {/* Анимированный фон с кругами */}
      <AnimatedBackground opacity={0.2} showHumanIcon={false} />
      
      {/* Заголовок */}
      <div style={{
        padding: '24px 16px 16px 16px',
        zIndex: 2,
        position: 'relative'
      }}>
        <h1 style={{
          fontFamily: 'Montserrat',
          fontWeight: 600,
          fontSize: '24px',
          color: '#242424',
          margin: 0,
          marginBottom: '8px'
        }}>
          {title}
        </h1>
      </div>

      {/* Основной контент */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '0 16px 24px 16px',
        zIndex: 2,
        position: 'relative'
      }}>
        {children}
      </div>

      {/* Кнопки навигации */}
      <div style={{
        padding: '16px',
        borderTop: '1px solid #F5F5F5',
        display: 'flex',
        justifyContent: 'space-between',
        gap: '12px',
        zIndex: 3,
        position: 'relative',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(5px)'
      }}>
        {showBackButton && (
          <QuizButton 
            text="Назад" 
            onClick={handleBackClick} 
            primary={false}
          />
        )}
        
        {showContinueButton && (
          <QuizButton 
            text="Продолжить" 
            onClick={onContinueClick || (() => {})} 
            disabled={continueDisabled}
          />
        )}
      </div>
    </div>
  );
} 