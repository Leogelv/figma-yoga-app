"use client";

import { useEffect, useState } from 'react';
import QuizButton from '@/components/quiz/QuizButton';

interface TimerScreenProps {
  title: string;
  description: string;
  duration: number; // в минутах
  onComplete: () => void;
  onCancel: () => void;
}

export default function TimerScreen({
  title,
  description,
  duration,
  onComplete,
  onCancel
}: TimerScreenProps) {
  const [seconds, setSeconds] = useState(duration * 60);
  const [isActive, setIsActive] = useState(false);
  const [isDone, setIsDone] = useState(false);

  // Запуск/остановка таймера
  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  // Сброс таймера
  const resetTimer = () => {
    setSeconds(duration * 60);
    setIsActive(false);
    setIsDone(false);
  };

  // Обработчик завершения таймера
  const handleComplete = () => {
    resetTimer();
    setIsDone(true);
    onComplete();
  };

  // Форматирование времени
  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  // Процент прогресса для кругового индикатора
  const calculateProgress = () => {
    const totalSeconds = duration * 60;
    const remaining = seconds;
    const progress = ((totalSeconds - remaining) / totalSeconds) * 100;
    return progress;
  };

  // Обновление таймера каждую секунду
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);
    } else if (isActive && seconds === 0) {
      if (interval) clearInterval(interval);
      handleComplete();
    } else if (!isActive && interval) {
      clearInterval(interval);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, seconds]);

  // Расчет параметров для SVG круга прогресса
  const circleRadius = 120;
  const circleCircumference = 2 * Math.PI * circleRadius;
  const progressOffset = circleCircumference - (calculateProgress() / 100) * circleCircumference;

  return (
    <div className="flex flex-col h-full p-4 bg-gradient-to-b from-blue-50 to-white rounded-xl">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-blue-900">{title}</h2>
        <p className="text-gray-600 mb-6">{description}</p>
      </div>
      
      {/* Круговой таймер */}
      <div className="flex justify-center items-center my-8">
        <div className="relative">
          {/* Фоновый круг */}
          <svg width="260" height="260" className="transform -rotate-90 drop-shadow-lg">
            <circle
              cx="130"
              cy="130"
              r={circleRadius}
              stroke="#f1f1f1"
              strokeWidth="12"
              fill="none"
            />
            {/* Прогресс круг */}
            <circle
              cx="130"
              cy="130"
              r={circleRadius}
              stroke="url(#blue-gradient)"
              strokeWidth="12"
              fill="none"
              strokeDasharray={circleCircumference}
              strokeDashoffset={progressOffset}
              strokeLinecap="round"
            />
            {/* Определение градиента */}
            <defs>
              <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Время в центре */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-5xl font-bold text-blue-900">{formatTime(seconds)}</div>
            {!isActive && seconds < duration * 60 && seconds > 0 && (
              <div className="text-sm text-gray-500 mt-2">Пауза</div>
            )}
          </div>
        </div>
      </div>
      
      {/* Кнопки управления */}
      <div className="mt-auto space-y-3">
        {!isDone ? (
          <>
            <QuizButton 
              onClick={toggleTimer}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-md"
            >
              {isActive ? 'Пауза' : seconds === duration * 60 ? 'Начать' : 'Продолжить'}
            </QuizButton>
            
            {seconds < duration * 60 && (
              <QuizButton 
                onClick={resetTimer}
                variant="secondary"
                className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Сбросить
              </QuizButton>
            )}
          </>
        ) : (
          <QuizButton 
            onClick={resetTimer}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-md"
          >
            Начать заново
          </QuizButton>
        )}
        
        <QuizButton 
          onClick={onCancel}
          variant="outline"
          className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          Вернуться к выбору
        </QuizButton>
      </div>
    </div>
  );
} 