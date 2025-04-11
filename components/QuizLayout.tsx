import React, { ReactNode, useEffect } from 'react';
import QuizButton from './QuizButton';

interface QuizLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  onNext: () => void;
  onBack?: () => void;
  nextText?: string;
  backText?: string;
  nextDisabled?: boolean;
  autoAdvance?: boolean;
  selectedOption?: string | null;
}

export default function QuizLayout({
  title,
  subtitle,
  children,
  onNext,
  onBack,
  nextText = 'Продолжить',
  backText = 'Назад',
  nextDisabled = false,
  autoAdvance = false,
  selectedOption = null
}: QuizLayoutProps) {
  // Автоматический переход, если выбрана опция и включен autoAdvance
  useEffect(() => {
    if (autoAdvance && selectedOption !== null && !nextDisabled) {
      const timer = setTimeout(() => {
        onNext();
      }, 300); // Небольшая задержка для анимации
      
      return () => clearTimeout(timer);
    }
  }, [selectedOption, autoAdvance, nextDisabled, onNext]);

  return (
    <div style={{
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      minHeight: 'calc(100vh - 32px)',
      justifyContent: 'space-between'
    }}>
      <div>
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ 
            fontFamily: 'Montserrat', 
            fontWeight: 600, 
            fontSize: '24px',
            color: '#242424',
            margin: 0,
            marginBottom: subtitle ? '8px' : 0
          }}>
            {title}
          </h1>
          
          {subtitle && (
            <p style={{ 
              fontFamily: 'Inter', 
              fontWeight: 400, 
              fontSize: '16px',
              color: '#8C8C8C',
              margin: 0
            }}>
              {subtitle}
            </p>
          )}
        </div>
        
        <div style={{ marginBottom: '32px' }}>
          {children}
        </div>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {!autoAdvance && (
          <QuizButton 
            text={nextText} 
            onClick={onNext} 
            primary={true}
            disabled={nextDisabled}
          />
        )}
        
        {onBack && (
          <QuizButton 
            text={backText} 
            onClick={onBack} 
            primary={false}
          />
        )}
      </div>
    </div>
  );
} 