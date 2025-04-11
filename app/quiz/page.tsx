"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import QuizLayout from '../../components/QuizLayout';
import QuizCard from '../../components/QuizCard';

export default function QuizPage() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [tg, setTg] = useState<any>(null);

  useEffect(() => {
    // Инициализация Telegram Mini App
    const telegram = window.Telegram?.WebApp;
    if (telegram) {
      telegram.ready();
      setTg(telegram);
      
      // Настраиваем цвет верхней панели
      telegram.setHeaderColor('#FFFFFF');
      
      // Показываем кнопку "Назад" в хедере
      telegram.BackButton.show();
      telegram.BackButton.onClick(() => {
        router.push('/');
      });
    }
  }, [router]);

  const handleSelectType = (type: string) => {
    setSelectedType(type);
  };

  const handleNext = () => {
    if (selectedType) {
      router.push(`/quiz/${selectedType}`);
    }
  };

  const handleBack = () => {
    router.push('/');
  };

  return (
    <QuizLayout
      title="Выберите тип практики"
      subtitle="Что бы вы хотели практиковать сегодня?"
      onNext={handleNext}
      onBack={handleBack}
      nextDisabled={!selectedType}
      autoAdvance={true}
      selectedOption={selectedType}
    >
      <QuizCard
        title="Телесная практика"
        description="Йога, осанка и физические упражнения"
        icon={
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.5 4C7.5 5.38071 8.61929 6.5 10 6.5C11.3807 6.5 12.5 5.38071 12.5 4C12.5 2.61929 11.3807 1.5 10 1.5C8.61929 1.5 7.5 2.61929 7.5 4Z" stroke="#337FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14.4998 3.5L16.4998 2.5V7.5L20.9998 11M16.9998 7L12.9998 9.5" stroke="#337FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3 15.8C5.14286 16.3333 9.9 17 12.5 15C15.1 13 15.1667 8.66667 15 7" stroke="#337FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7.5 12L5 22" stroke="#337FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 12L14.5 22" stroke="#337FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3 18H16" stroke="#337FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        }
        onClick={() => handleSelectType('body')}
        selected={selectedType === 'body'}
      />
      
      <QuizCard
        title="Медитативная практика"
        description="Техники медитации и работы с сознанием"
        icon={
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#337FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        }
        onClick={() => handleSelectType('meditation')}
        selected={selectedType === 'meditation'}
      />
      
      <QuizCard
        title="Дыхательная практика"
        description="Упражнения для улучшения дыхания"
        icon={
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 9C5.5 9 8 8 8 5C8 2 5.5 2 4 2C2.5 2 2 3 2 4" stroke="#337FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7 15C9.5 15 12 14 12 11C12 8 9.5 8 8 8C6.5 8 6 9 6 10" stroke="#337FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M11 22C13.5 22 16 21 16 18C16 15 13.5 15 12 15C10.5 15 10 16 10 17" stroke="#337FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3 5C6 5 18 5 21 5C18 5.5 14 8 14 12C14 16 18 18.5 21 19C18 19 6 19 3 19" stroke="#337FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        }
        onClick={() => handleSelectType('breathing')}
        selected={selectedType === 'breathing'}
      />
    </QuizLayout>
  );
} 