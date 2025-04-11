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

  // Обработчик выбора типа практики
  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
  };

  // Переход к следующему шагу в зависимости от выбранного типа
  const handleContinue = () => {
    if (selectedType === 'body') {
      router.push('/quiz/body');
    } else if (selectedType === 'mind') {
      router.push('/quiz/mind');
    }
  };

  // Обработчик нажатия кнопки "Назад"
  const handleBack = () => {
    router.push('/');
  };

  return (
    <QuizLayout 
      title="Выберите тип практики"
      onContinueClick={handleContinue}
      onBackClick={handleBack}
      showContinueButton={!selectedType} // Скрываем кнопку "Продолжить" если есть выбор, так как сработает автопереход
      continueDisabled={!selectedType}
      autoAdvance={true}
      selectedOption={selectedType}
    >
      <QuizCard 
        title="Телесная практика"
        description="Йога, растяжка и работа с телом"
        onClick={() => handleTypeSelect('body')}
        selected={selectedType === 'body'}
      />
      
      <QuizCard 
        title="Ментальная практика"
        description="Медитация, дыхание и практики осознанности"
        onClick={() => handleTypeSelect('mind')}
        selected={selectedType === 'mind'}
      />
    </QuizLayout>
  );
} 