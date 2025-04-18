"use client";

import { useState, useEffect } from 'react';
import { PracticeFlowProvider, usePracticeFlow } from '@/context/PracticeFlowContext';
import { fetchPractices } from '@/lib/api';
import { ApiPractice } from '@/types/practice';

// Компоненты шагов
import TypeSelectionStep from '@/components/practice-flow/TypeSelectionStep';
// Body
import BodyTypeStep from '@/components/practice-flow/body/BodyTypeStep';
import DifficultyStep from '@/components/practice-flow/body/DifficultyStep';
import DurationStep from '@/components/practice-flow/body/DurationStep';
import GoalStep from '@/components/practice-flow/body/GoalStep';
// Meditation
import PathSelectionStep from '@/components/practice-flow/meditation/PathSelectionStep';
import MeditationGoalStep from '@/components/practice-flow/meditation/GoalStep';
import MeditationDurationStep from '@/components/practice-flow/meditation/DurationStep';
import ExperienceStep from '@/components/practice-flow/meditation/ExperienceStep';
// Breathing
import BreathingGoalStep from '@/components/practice-flow/breathing/GoalStep';
import IntensityStep from '@/components/practice-flow/breathing/IntensityStep';
import BreathingDurationStep from '@/components/practice-flow/breathing/DurationStep';
// Экран рекомендации и общие компоненты
import RecommendationScreen from '@/components/practice-flow/RecommendationScreen';
import TimerScreen from '@/components/practice-flow/TimerScreen';
import QuizLayout from '@/components/quiz/QuizLayout';
import QuizButton from '@/components/quiz/QuizButton';
// Путь к LoadingSpinner теперь правильный
import LoadingSpinner from '@/components/ui/LoadingSpinner'; 

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
  const [activePractice, setActivePractice] = useState<ApiPractice | null>(null);
  const [showTimer, setShowTimer] = useState(false);

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
    } else if (state.practiceType === 'meditation' && state.meditationState.path === 'time_goal') {
      quizFinished = !!(state.meditationState.goal && state.meditationState.duration && state.meditationState.experience);
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
         // Нужна логика сопоставления цели квиза (relax, flexibility...) с тегами или описанием практики в API
      }

      // 4. Специфичные фильтры для МЕДИТАЦИИ (путь время/цель)
      if (state.practiceType === 'meditation' && state.meditationState.path === 'time_goal') {
          if (state.meditationState.duration) {
              const apiDurationRange = mapDurationToApi(state.meditationState.duration);
              const practiceMinutes = parseDurationToMinutes(p.duration);
              if (apiDurationRange && practiceMinutes !== null) {
                 if (practiceMinutes < apiDurationRange[0] || practiceMinutes > apiDurationRange[1]) return false;
              } else return false; 
          }
          // TODO: Добавить фильтры по state.meditationState.goal и state.meditationState.experience
          // Нужна логика сопоставления цели (relaxation...) и опыта (beginner...) с данными API
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
         // Нужна логика сопоставления цели (energy...) и интенсивности (mild...) с данными API
      }
      
      return true; // Прошла все фильтры
    });

    console.log(`Found ${filtered.length} matching practices after filtering.`);

    if (filtered.length > 0) {
      // Выбираем случайную из отфильтрованных
      const randomIndex = Math.floor(Math.random() * filtered.length);
      setRecommendedPractice(filtered[randomIndex]);
    } else {
      setError('К сожалению, мы не нашли подходящих практик. Попробуйте изменить критерии.');
      setRecommendedPractice(null);
    }
    setIsLoading(false);
  };

  // Логика для получения другой практики
  const handleAnother = () => {
    if (recommendedPractice) {
      console.log('Requesting another practice, excluding:', recommendedPractice._id);
      addExcludedPracticeId(recommendedPractice._id);
      // Перефильтруем практики с учетом нового исключенного ID
      // Так как useEffect зависит от state, он автоматически вызовет findRecommendedPractice()
    } else {
      // Если рекомендаций не было, просто пробуем найти снова (или сбрасываем?)
      findRecommendedPractice();
    }
  };

  // Логика старта практики
  const handleStart = (practice: ApiPractice) => {
    console.log('Starting practice:', practice.name);
    setActivePractice(practice);
    
    // Логика выбора: таймер или плеер
    // Если у практики есть kinescope, то мы уже показываем его в RecommendationScreen
    // Для других типов практик (без kinescope) показываем таймер
    if (!practice.kinescope) {
      setShowTimer(true);
    } else {
      // Для практик с kinescope действия уже выполнены в RecommendationScreen
      // Видео уже отображается через iframe
      console.log('Practice with video is started via Kinescope player');
    }
  };

  // Обработчики для таймера
  const handleTimerComplete = () => {
    console.log('Timer completed for practice:', activePractice?.name);
    // Здесь можно добавить логику для сохранения статистики
    setShowTimer(false);
    setActivePractice(null);
  };

  const handleTimerCancel = () => {
    console.log('Timer cancelled for practice:', activePractice?.name);
    setShowTimer(false);
    setActivePractice(null);
  };
  
  // Отображаем экран таймера, если он активен
  if (showTimer && activePractice) {
    // Получаем длительность в минутах из строки вида "MM:SS"
    const getDurationInMinutes = (durationStr?: string): number => {
      if (!durationStr) return 5; // По умолчанию 5 минут
      const parts = durationStr.split(':');
      if (parts.length !== 2) return 5;
      const minutes = parseInt(parts[0], 10);
      const seconds = parseInt(parts[1], 10);
      return isNaN(minutes) ? 5 : minutes + (seconds / 60);
    };

    return (
      <QuizLayout title={activePractice.name} backButton onBack={handleTimerCancel}>
        <TimerScreen
          title={activePractice.name}
          description={activePractice.descr || 'Следуйте инструкциям практики'}
          duration={getDurationInMinutes(activePractice.duration)}
          onComplete={handleTimerComplete}
          onCancel={handleTimerCancel}
        />
      </QuizLayout>
    );
  }
  
  // Показываем загрузку, пока не загружены практики
  if (isLoading && allPractices.length === 0) {
    return (
      <QuizLayout title="Подбор практики">
        <div className="flex justify-center items-center h-full">
          <LoadingSpinner />
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
          <QuizButton onClick={resetFlow}>Начать заново</QuizButton>
        </div>
      </QuizLayout>
    );
  }
  
  // Если квиз завершен и есть рекомендация
  if (isQuizComplete && recommendedPractice) {
    return (
       <RecommendationScreen 
          practice={recommendedPractice} 
          onStart={handleStart}
          onAnotherRecommendation={handleAnother}
        />
    );
  }

  // Если квиз завершен, но практик не найдено (показываем ошибку фильтрации)
  if (isQuizComplete && !recommendedPractice) {
     return (
      <QuizLayout title="Ничего не найдено" backButton onBack={prevStep}> 
        <div className="text-center mt-10">
          <p className="text-gray-600 mb-4">{error || 'К сожалению, по вашим критериям ничего не найдено.'}</p>
          <QuizButton onClick={handleAnother}>Попробовать другие критерии</QuizButton>
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
      if (state.meditationState.path === 'time_goal') {
        if (!state.meditationState.goal) return <MeditationGoalStep />;
        if (!state.meditationState.duration) return <MeditationDurationStep />;
        if (!state.meditationState.experience) return <ExperienceStep />;
      }
      if (state.meditationState.path === 'approach') {
         return (
          <QuizLayout title="Выбор по технике" subtitle="Эта функция пока в разработке" backButton onBack={prevStep}>
            <div className="mt-6 w-full"><QuizButton onClick={resetFlow}>Выбрать другой тип</QuizButton></div>
          </QuizLayout>
        );
      }
    }
    
    // Добавляем рендеринг шагов для дыхания
    if (state.practiceType === 'breathing') {
      if (!state.breathingState.goal) return <BreathingGoalStep />;
      if (!state.breathingState.intensity) return <IntensityStep />;
      if (!state.breathingState.duration) return <BreathingDurationStep />; 
    }

    // Если квиз завершен, но рекомендация еще не готова (показываем спиннер)
     if (isQuizComplete && isLoading) {
      return (
        <QuizLayout title="Подбираем практику...">
          <div className="flex justify-center items-center h-full">
            <LoadingSpinner />
          </div>
        </QuizLayout>
      );
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