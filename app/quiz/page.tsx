"use client";

import { useState, useEffect } from 'react';
import { PracticeFlowProvider, usePracticeFlow } from '@/context/PracticeFlowContext';
import { fetchPractices } from '@/lib/api';
import { ApiPractice } from '@/types/practice';

// Компоненты шагов
import TypeSelectionStep from '@/components/quiz/steps/TypeSelectionStep';
// Body
import BodyTypeStep from '@/components/quiz/steps/body/BodyTypeStep';
import DifficultyStep from '@/components/quiz/steps/body/DifficultyStep';
import DurationStep from '@/components/quiz/steps/body/DurationStep';
import GoalStep from '@/components/quiz/steps/body/GoalStep';
// Meditation
import PathSelectionStep from '@/components/quiz/steps/meditation/PathSelectionStep';
import MeditationGoalStep from '@/components/quiz/steps/meditation/GoalStep';
import MeditationDurationStep from '@/components/quiz/steps/meditation/DurationStep';
import ObjectSelectionStep from '@/components/quiz/steps/meditation/ObjectSelectionStep';
import ThemeSelectionStep from '@/components/quiz/steps/meditation/ThemeSelectionStep';
// Breathing
import BreathingGoalStep from '@/components/quiz/steps/breathing/GoalStep';
import IntensityStep from '@/components/quiz/steps/breathing/IntensityStep';
import BreathingDurationStep from '@/components/quiz/steps/breathing/DurationStep';
// Общие компоненты
import PracticeScreen from '@/components/practice/PracticeScreen';
import QuizLayout from '@/components/ui/layout/QuizLayout';
import Button from '@/components/ui/button/Button';
import Spinner from '@/components/ui/loading/Spinner'; 

// --- Маппинг значений квиза на значения API ---
const mapDifficultyToApi = (difficulty: string | null): string[] => {
  switch (difficulty) {
    case 'beginner': return ['Простая'];
    case 'intermediate': return ['Посложнее'];
    case 'advanced': return ['Сложная', 'Очень сложная']; // Пример, API может иметь другие значения
    default: return [];
  }
};

// TODO: Уточнить маппинг интенсивности дыхания на API, если там есть аналог
// const mapIntensityToApi = (intensity: string | null): string[] => { ... }

const mapDurationToApi = (duration: string | null): [number, number] | null => {
  switch (duration) {
    case 'short': return [0, 15]; // 0-15 минут
    case 'medium': return [15, 30]; // 15-30 минут
    case 'long': return [30, 999]; // 30+ минут
    default: return null;
  }
};

// Функция для парсинга времени MM:SS в минуты
const parseDurationToMinutes = (durationStr?: string): number | null => {
  if (!durationStr) return null;
  const parts = durationStr.split(':');
  if (parts.length !== 2) return null;
  const minutes = parseInt(parts[0], 10);
  const seconds = parseInt(parts[1], 10);
  if (isNaN(minutes) || isNaN(seconds)) return null;
  return minutes + seconds / 60;
};
// --- Конец Маппинга ---

function PracticeQuizContent() {
  const { state, resetFlow, prevStep, addExcludedPracticeId } = usePracticeFlow();
  const [allPractices, setAllPractices] = useState<ApiPractice[]>([]);
  const [recommendedPractice, setRecommendedPractice] = useState<ApiPractice | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [showPractice, setShowPractice] = useState(false);

  // Загрузка практик при монтировании
  useEffect(() => {
    const loadPractices = async () => {
      setIsLoading(true);
      setError(null);
      const practices = await fetchPractices();
      if (practices.length > 0) {
        setAllPractices(practices);
      } else {
        setError('Не удалось загрузить практики. Попробуйте позже.');
      }
      setIsLoading(false);
    };
    loadPractices();
  }, []);

  // Определение завершенности квиза и фильтрация практик
  useEffect(() => {
    let quizFinished = false;
    if (state.practiceType === 'body') {
      quizFinished = !!(state.bodyState.bodyType && state.bodyState.difficulty && state.bodyState.duration && state.bodyState.goal);
    } else if (state.practiceType === 'meditation' && state.meditationState.path === 'guided') {
      quizFinished = !!(state.meditationState.goal && state.meditationState.duration && state.meditationState.theme);
    } else if (state.practiceType === 'meditation' && state.meditationState.path === 'self_guided') {
      quizFinished = !!(state.meditationState.object);
    } else if (state.practiceType === 'breathing') { // Добавляем проверку для дыхания
      quizFinished = !!(state.breathingState.goal && state.breathingState.intensity && state.breathingState.duration);
    } // Добавить условия для других путей и типов
    
    setIsQuizComplete(quizFinished);

    if (quizFinished && allPractices.length > 0) {
      findRecommendedPractice();
    } else {
      setRecommendedPractice(null); // Сбрасываем рекомендацию, если квиз не завершен
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, allPractices]); // Зависимость от state и загруженных практик

  // Функция поиска и установки рекомендуемой практики
  const findRecommendedPractice = () => {
    setIsLoading(true);
    setError(null);
    console.log('Filtering practices with state:', state);
    console.log('Excluded IDs:', state.excludedPracticeIds);

    const filtered = allPractices.filter(p => {
      // 1. Исключаем уже показанные
      if (state.excludedPracticeIds.includes(p._id)) return false;

      // 2. Фильтр по типу практики
      let typeMatch = false;
      if (state.practiceType === 'body' && p["Yo.System"]?.includes('Yo.Body')) typeMatch = true;
      if (state.practiceType === 'meditation' && p["Yo.System"] === 'Yo.Meditation') typeMatch = true;
      if (state.practiceType === 'breathing' && p["Yo.System"]?.includes('Yo.Breath')) typeMatch = true; // Проверяем гипотезу
      if (!typeMatch && p.type === 'практика') { // Запасной вариант, если Yo.System не совпал
          if (state.practiceType === 'body' && (p.name.toLowerCase().includes('йог') || p.name.toLowerCase().includes('растяж'))) typeMatch = true;
          if (state.practiceType === 'meditation' && p.name.toLowerCase().includes('медитац')) typeMatch = true;
          if (state.practiceType === 'breathing' && p.name.toLowerCase().includes('дыхан')) typeMatch = true;
      }
      if (!typeMatch) return false;

      // 3. Специфичные фильтры для ТЕЛА
      if (state.practiceType === 'body') {
          if (state.bodyState.difficulty) {
              const apiDifficulties = mapDifficultyToApi(state.bodyState.difficulty);
              if (!apiDifficulties.includes(p.hard || '')) return false;
          }
          if (state.bodyState.duration) {
              const apiDurationRange = mapDurationToApi(state.bodyState.duration);
              const practiceMinutes = parseDurationToMinutes(p.duration);
              if (apiDurationRange && practiceMinutes !== null) {
                 if (practiceMinutes < apiDurationRange[0] || practiceMinutes > apiDurationRange[1]) return false;
              } else return false; // Не можем сравнить, если нет данных
          }
         // TODO: Добавить фильтр по state.bodyState.goal и state.bodyState.bodyType (йога/растяжка)
      }

      // 4. Специфичные фильтры для МЕДИТАЦИИ
      if (state.practiceType === 'meditation') {
          // Общие фильтры для всех путей медитации
          if (state.meditationState.path === 'guided') {
              if (state.meditationState.duration) {
                  const apiDurationRange = mapDurationToApi(state.meditationState.duration);
                  const practiceMinutes = parseDurationToMinutes(p.duration);
                  if (apiDurationRange && practiceMinutes !== null) {
                     if (practiceMinutes < apiDurationRange[0] || practiceMinutes > apiDurationRange[1]) return false;
                  } else return false; 
              }
              // TODO: Добавить фильтры по state.meditationState.goal и state.meditationState.theme
          }
          
          if (state.meditationState.path === 'self_guided') {
              // TODO: Добавить фильтры по state.meditationState.object
          }
      }

      // Фильтры для ДЫХАНИЯ
      if (state.practiceType === 'breathing') {
          if (state.breathingState.duration) {
              const apiDurationRange = mapDurationToApi(state.breathingState.duration);
              const practiceMinutes = parseDurationToMinutes(p.duration);
              // Для дыхания, возможно, нужны другие диапазоны в mapDurationToApi?
              // Пока используем общие
              if (apiDurationRange && practiceMinutes !== null) {
                 if (practiceMinutes < apiDurationRange[0] || practiceMinutes > apiDurationRange[1]) return false;
              } else return false;
          }
         // TODO: Фильтр по state.breathingState.goal и state.breathingState.intensity
      }
      
      return true; // Прошла все фильтры
    });

    console.log(`Found ${filtered.length} matching practices after filtering.`);

    if (filtered.length > 0) {
      // Выбираем случайную из отфильтрованных
      const randomIndex = Math.floor(Math.random() * filtered.length);
      setRecommendedPractice(filtered[randomIndex]);
      // Сразу показываем практику после завершения квиза
      setShowPractice(true);
    } else {
      setError('К сожалению, мы не нашли подходящих практик. Попробуйте изменить критерии.');
      setRecommendedPractice(null);
      setShowPractice(false);
    }
    setIsLoading(false);
  };

  // Логика для получения другой практики
  const handleAnotherPractice = () => {
    if (recommendedPractice) {
      console.log('Requesting another practice, excluding:', recommendedPractice._id);
      addExcludedPracticeId(recommendedPractice._id);
      // Перефильтруем практики с учетом нового исключенного ID
      findRecommendedPractice();
    } else {
      // Если рекомендаций не было, просто пробуем найти снова
      findRecommendedPractice();
    }
  };

  // Обработчики для экрана практики
  const handlePracticeComplete = () => {
    console.log('Practice completed:', recommendedPractice?.name);
    // Здесь можно добавить логику для сохранения статистики
    setShowPractice(false);
    resetFlow(); // Возврат к началу квиза
  };

  const handlePracticeCancel = () => {
    console.log('Practice cancelled:', recommendedPractice?.name);
    setShowPractice(false);
    prevStep(); // Возврат к последнему шагу квиза
  };
  
  // Отображаем экран практики, если есть рекомендация и квиз завершен
  if (showPractice && recommendedPractice && isQuizComplete) {
    return (
      <PracticeScreen
        practice={recommendedPractice}
        onComplete={handlePracticeComplete}
        onCancel={handlePracticeCancel}
        onAnotherPractice={handleAnotherPractice}
      />
    );
  }
  
  // Показываем загрузку, пока не загружены практики
  if (isLoading && allPractices.length === 0) {
    return (
      <QuizLayout title="Подбор практики">
        <div className="flex justify-center items-center h-full">
          <Spinner />
        </div>
      </QuizLayout>
    );
  }

  // Показываем ошибку загрузки
  if (error && !recommendedPractice && allPractices.length === 0) {
     return (
      <QuizLayout title="Ошибка" backButton onBack={resetFlow}>
        <div className="text-center mt-10">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={resetFlow}>Начать заново</Button>
        </div>
      </QuizLayout>
    );
  }
  
  // Если квиз завершен, практик не найдено (показываем ошибку фильтрации)
  if (isQuizComplete && !recommendedPractice && !isLoading) {
     return (
      <QuizLayout title="Ничего не найдено" backButton onBack={prevStep}> 
        <div className="text-center mt-10">
          <p className="text-gray-600 mb-4">{error || 'К сожалению, по вашим критериям ничего не найдено.'}</p>
          <Button onClick={handleAnotherPractice}>Попробовать другие критерии</Button>
        </div>
      </QuizLayout>
    );
  }

  // Если квиз завершен и загружается рекомендация
  if (isQuizComplete && isLoading) {
    return (
      <QuizLayout title="Подбираем практику...">
        <div className="flex justify-center items-center h-full">
          <Spinner />
        </div>
      </QuizLayout>
    );
  }

  // --- Рендеринг Шагов Квиза ---
  const renderQuizStep = () => {
    if (!state.practiceType) return <TypeSelectionStep />;
    
    if (state.practiceType === 'body') {
      if (!state.bodyState.bodyType) return <BodyTypeStep />;
      if (!state.bodyState.difficulty) return <DifficultyStep />;
      if (!state.bodyState.duration) return <DurationStep />;
      if (!state.bodyState.goal) return <GoalStep />; 
    }

    if (state.practiceType === 'meditation') {
      if (!state.meditationState.path) return <PathSelectionStep />;
      
      if (state.meditationState.path === 'guided') {
        if (!state.meditationState.goal) return <MeditationGoalStep />;
        if (!state.meditationState.theme) return <ThemeSelectionStep />;
        if (!state.meditationState.duration) return <MeditationDurationStep />;
      }
      
      if (state.meditationState.path === 'self_guided') {
        if (!state.meditationState.object) return <ObjectSelectionStep />;
      }
    }
    
    // Добавляем рендеринг шагов для дыхания
    if (state.practiceType === 'breathing') {
      if (!state.breathingState.goal) return <BreathingGoalStep />;
      if (!state.breathingState.intensity) return <IntensityStep />;
      if (!state.breathingState.duration) return <BreathingDurationStep />; 
    }

    return <TypeSelectionStep />; // Запасной вариант
  };
  
  return renderQuizStep();
}

export default function PracticeQuiz() {
  return (
    <PracticeFlowProvider>
      <PracticeQuizContent />
    </PracticeFlowProvider>
  );
} 