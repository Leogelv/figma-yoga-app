"use client";

import { ReactNode, useState, useEffect } from 'react';
import QuizButton from './QuizButton';

interface QuizStepProps {
  title: string;
  description?: string;
  children: ReactNode;
  onNext?: () => void;
  onBack?: () => void;
  nextDisabled?: boolean;
  showNextButton?: boolean;
  nextButtonText?: string;
  autoAdvance?: boolean;
  selectedOption?: string | null;
}

export default function QuizStep({
  title,
  description,
  children,
  onNext,
  onBack,
  nextDisabled = false,
  showNextButton = true,
  nextButtonText = 'Продолжить',
  autoAdvance = false,
  selectedOption = null
}: QuizStepProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  // Эффект для автоматического перехода, если выбран вариант
  useEffect(() => {
    if (autoAdvance && selectedOption !== null && !nextDisabled) {
      const timer = setTimeout(() => {
        onNext && onNext();
      }, 300); // Небольшая задержка для анимации
      
      return () => clearTimeout(timer);
    }
  }, [selectedOption, autoAdvance, nextDisabled, onNext]);

  // Функция для анимации перехода
  const handleNext = () => {
    if (nextDisabled) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      onNext && onNext();
      setIsAnimating(false);
    }, 200);
  };

  const handleBack = () => {
    setIsAnimating(true);
    setTimeout(() => {
      onBack && onBack();
      setIsAnimating(false);
    }, 200);
  };

  return (
    <div className={`
      transition-opacity duration-200 ease-in-out
      ${isAnimating ? 'opacity-50' : 'opacity-100'}
    `}>
      {/* Заголовок и описание */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">{title}</h2>
        {description && (
          <p className="text-gray-600">{description}</p>
        )}
      </div>
      
      {/* Основной контент (варианты и т.д.) */}
      <div className="mb-8">
        {children}
      </div>
      
      {/* Кнопки Назад/Продолжить */}
      {showNextButton && (
        <div className="flex space-x-4">
          {onBack && (
            <QuizButton
              onClick={handleBack}
              variant="outline"
              fullWidth={false}
            >
              Назад
            </QuizButton>
          )}
          
          <QuizButton
            onClick={handleNext}
            variant="primary"
            disabled={nextDisabled}
            fullWidth={!onBack}
          >
            {nextButtonText}
          </QuizButton>
        </div>
      )}
    </div>
  );
} 