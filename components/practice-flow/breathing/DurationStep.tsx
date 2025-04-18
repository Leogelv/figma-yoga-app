"use client";

import { usePracticeFlow } from '@/context/PracticeFlowContext';
import QuizLayout from '@/components/quiz/QuizLayout';
import QuizOption from '@/components/quiz/QuizOption';
import { formatDuration } from '@/lib/utils'; // Используем ту же утилиту

type DurationOption = {
  id: 'short' | 'medium' | 'long';
  title: string;
  description: string;
};

// Те же опции длительности
const durationOptions: DurationOption[] = [
  {
    id: 'short',
    title: 'Короткая (до 5 мин)', // Немного уточним для дыхания
    description: formatDuration('short'), // Отобразит 5-10, но название главнее
  },
  {
    id: 'medium',
    title: 'Средняя (5-10 мин)',
    description: formatDuration('medium'), // Отобразит 15-20
  },
  {
    id: 'long',
    title: 'Длинная (10+ мин)',
    description: formatDuration('long'), // Отобразит 30-45
  },
];

export default function BreathingDurationStep() {
  // Важно: используем setBreathingState
  const { state, setBreathingState, prevStep, nextStep } = usePracticeFlow();

  const handleDurationSelect = (duration: 'short' | 'medium' | 'long') => {
    setBreathingState({ duration });
    nextStep(); // Переход к экрану рекомендаций
  };

  return (
    <QuizLayout
      title="Выберите длительность дыхательной практики"
      subtitle="Сколько времени вы готовы уделить дыханию?"
      backButton
      onBack={prevStep}
    >
      <div className="flex flex-col gap-6 w-full mt-8">
        {durationOptions.map((option) => (
          <QuizOption
            key={option.id}
            selected={state.breathingState.duration === option.id}
            onClick={() => handleDurationSelect(option.id)}
          >
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold text-gray-800">{option.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{option.description}</p>
            </div>
          </QuizOption>
        ))}
      </div>
    </QuizLayout>
  );
} 