"use client";

import React from 'react';
import QuizLayout from '@/components/quiz/QuizLayout';
import { ApiPractice } from '@/types/practice';
import QuizButton from '@/components/quiz/QuizButton';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface RecommendationScreenProps {
  practice: ApiPractice | null;
  onStart: (practice: ApiPractice) => void;
  onBack: () => void;
  onAnotherPractice: () => void;
  isLoading: boolean;
  error: string | null;
}

export default function RecommendationScreen({
  practice,
  onStart,
  onBack,
  onAnotherPractice,
  isLoading,
  error
}: RecommendationScreenProps) {
  
  return (
    <QuizLayout
      title="Рекомендуемая практика"
      subtitle="На основе ваших предпочтений мы подобрали эту практику"
      backButton
      onBack={onBack}
    >
      <div className="flex flex-col gap-6 w-full">
        {isLoading ? (
          <div className="flex justify-center py-8">
            <LoadingSpinner size="md" />
          </div>
        ) : error ? (
          <div className="p-4 rounded-lg bg-destructive/10 text-destructive border border-destructive/20">
            <p>{error}</p>
          </div>
        ) : practice ? (
          <div className="flex flex-col items-center gap-4">
            <div className="w-full p-6 bg-card rounded-lg border shadow-sm">
              <h3 className="text-xl font-medium text-card-foreground mb-2">{practice.name}</h3>
              <p className="text-muted-foreground text-sm">{practice.descr || 'Нет описания'}</p>
              
              <div className="flex flex-row justify-between text-xs text-muted-foreground mt-4">
                <span>Длительность: {practice.duration || '20:00'} мин</span>
                <span>Сложность: {practice.hard || 'Средняя'}</span>
              </div>
            </div>
            
            <div className="flex flex-col w-full gap-3 mt-4">
              <QuizButton
                onClick={() => practice && onStart(practice)}
                fullWidth
                variant="primary"
                size="lg"
              >
                Начать практику
              </QuizButton>
              <QuizButton
                onClick={onAnotherPractice}
                fullWidth
                variant="outline"
              >
                Подобрать другую
              </QuizButton>
            </div>
          </div>
        ) : (
          <div className="text-center text-muted-foreground">
            Практики не найдены. Попробуйте изменить параметры поиска.
          </div>
        )}
      </div>
    </QuizLayout>
  );
} 