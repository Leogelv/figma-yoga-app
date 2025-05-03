"use client";

import React, { useState } from 'react';
import { ApiPractice } from '@/types/practice';
import TimerScreen from './timer/TimerScreen';
import QuizLayout from '@/components/quiz/QuizLayout';

interface PracticePlayerProps {
  practice: ApiPractice;
  onClose: () => void;
  onComplete: () => void;
}

export default function PracticePlayer({
  practice,
  onClose,
  onComplete
}: PracticePlayerProps) {
  const [isCompleted, setIsCompleted] = useState(false);
  
  const handleComplete = () => {
    setIsCompleted(true);
    onComplete();
  };
  
  // Если у практики есть видео (kinescope), используем встроенный плеер
  if (practice.kinescope) {
    return (
      <QuizLayout title={practice.name} backButton onBack={onClose}>
        <div className="w-full h-full flex flex-col">
          <div className="aspect-video w-full mb-4 bg-black rounded-lg overflow-hidden">
            <iframe
              title={practice.name}
              src={`https://kinescope.io/embed/${practice.kinescope}`}
              className="w-full h-full"
              allow="autoplay; fullscreen; picture-in-picture; encrypted-media;"
              allowFullScreen
            ></iframe>
          </div>
          
          <div className="flex-1 text-sm text-muted-foreground">
            <h2 className="font-medium text-base text-foreground mb-2">Описание:</h2>
            <p>{practice.descr || 'Описание отсутствует'}</p>
          </div>
        </div>
      </QuizLayout>
    );
  }
  
  // Если у практики нет видео, используем таймер
  return (
    <TimerScreen
      practice={practice}
      onComplete={handleComplete}
      onCancel={onClose}
    />
  );
} 