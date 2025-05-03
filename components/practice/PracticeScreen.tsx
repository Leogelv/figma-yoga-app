"use client";

import React, { useState, useEffect } from 'react';
import { formatTime } from '@/lib/utils';
import { ApiPractice } from '@/types/practice';
import { cn } from '@/lib/utils';
import { Play, Pause, X, RefreshCw } from 'lucide-react';
import Button from '@/components/ui/button/Button';
import QuizLayout from '@/components/ui/layout/QuizLayout';

interface PracticeScreenProps {
  practice: ApiPractice;
  onComplete: () => void;
  onCancel: () => void;
  onAnotherPractice: () => void;
}

export default function PracticeScreen({
  practice,
  onComplete,
  onCancel,
  onAnotherPractice
}: PracticeScreenProps) {
  // Определяем тип практики: медитация или телесная/дыхательная
  const isMeditation = practice['Yo.System'] === 'Yo.Meditation';
  const practiceDuration = parseDuration(practice.duration);

  // Состояние таймера
  const [timeLeft, setTimeLeft] = useState(practiceDuration || 300000); // 5 минут по умолчанию
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Рассчитываем процент прогресса
  const progressPercentage = 100 - (timeLeft / (practiceDuration || 300000)) * 100;

  // Эффект для запуска таймера автоматически после загрузки компонента
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRunning(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Эффект для управления таймером
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1000);
      }, 1000);
    } else if (timeLeft === 0) {
      onComplete();
    }
    
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, onComplete]);
  
  // Обработчики управления таймером
  const handlePauseResume = () => {
    setIsRunning(!isRunning);
    setIsPaused(!isPaused);
  };

  // Функция для парсинга строки длительности (MM:SS)
  function parseDuration(durationStr?: string): number | null {
    if (!durationStr) return null;
    const parts = durationStr.split(':');
    if (parts.length !== 2) return null;
    const minutes = parseInt(parts[0], 10);
    const seconds = parseInt(parts[1], 10);
    if (isNaN(minutes) || isNaN(seconds)) return null;
    return (minutes * 60 + seconds) * 1000; // в миллисекундах
  }

  return (
    <QuizLayout 
      title={practice.name} 
      subtitle={isMeditation ? "Медитативная практика" : "Практика"} 
      backButton
      onBack={onCancel}
    >
      <div className="flex flex-col items-center justify-center w-full h-full gap-6 pt-4">
        {isMeditation && practice.kinescope ? (
          // Видео-плеер для медитации
          <div className="w-full max-w-lg mx-auto aspect-video rounded-xl overflow-hidden shadow-lg">
            <iframe
              src={`https://kinescope.io/embed/${practice.kinescope}`}
              className="w-full h-full"
              allow="autoplay; fullscreen; picture-in-picture; encrypted-media;"
              allowFullScreen
              title={practice.name}
            ></iframe>
          </div>
        ) : (
          // Круговой таймер для телесных и дыхательных практик
          <div className="relative mx-auto w-64 h-64 mb-2">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              {/* Фоновый круг */}
              <circle 
                cx="50" 
                cy="50" 
                r="45" 
                fill="none" 
                strokeWidth="6" 
                stroke="hsl(var(--accent))" 
              />
              {/* Прогресс-круг */}
              <circle 
                cx="50" 
                cy="50" 
                r="45" 
                fill="none" 
                strokeWidth="6" 
                stroke="hsl(var(--primary))" 
                strokeLinecap="round"
                strokeDasharray="282.74"
                strokeDashoffset={282.74 - (282.74 * progressPercentage) / 100}
                className="transition-all duration-300"
              />
            </svg>
            
            {/* Отображение времени внутри круга */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-medium text-foreground mb-2">{formatTime(timeLeft)}</span>
              <span className="text-sm text-muted-foreground">{practice.descr && practice.descr.substring(0, 50)}...</span>
            </div>
          </div>
        )}

        {/* Описание практики */}
        <div className="w-full max-w-md mx-auto bg-card rounded-lg shadow-sm p-4 text-center">
          <p className="text-sm text-muted-foreground">{practice.descr || 'Нет описания'}</p>
          <div className="flex flex-row justify-between text-xs text-muted-foreground mt-4">
            <span>Длительность: {practice.duration || '5:00'}</span>
            <span>Сложность: {practice.hard || 'Средняя'}</span>
          </div>
        </div>
        
        {/* Кнопки управления */}
        <div className="flex flex-col gap-3 w-full max-w-md mx-auto mt-auto">
          {!isMeditation && (
            <Button
              onClick={handlePauseResume}
              fullWidth
              variant="primary"
              size="lg"
            >
              <div className="flex items-center justify-center gap-2">
                {isRunning ? (
                  <>
                    <Pause size={18} /> Пауза
                  </>
                ) : (
                  <>
                    <Play size={18} /> {isPaused ? 'Продолжить' : 'Начать'}
                  </>
                )}
              </div>
            </Button>
          )}
          
          <Button
            onClick={onAnotherPractice}
            fullWidth
            variant="secondary"
          >
            <div className="flex items-center justify-center gap-2">
              <RefreshCw size={18} /> Другая практика
            </div>
          </Button>
          
          <Button
            onClick={onCancel}
            fullWidth
            variant="outline"
          >
            <div className="flex items-center justify-center gap-2">
              <X size={18} /> Закончить
            </div>
          </Button>
        </div>
      </div>
    </QuizLayout>
  );
} 