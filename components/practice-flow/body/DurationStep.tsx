"use client";

import { usePracticeFlow } from '@/context/PracticeFlowContext';
import QuizLayout from '@/components/quiz/QuizLayout';
import QuizOption from '@/components/quiz/QuizOption';

type DurationOption = {
  id: 'short' | 'medium' | 'long';
  title: string;
  description: string;
};

const durationOptions: DurationOption[] = [
  {
    id: 'short',
    title: 'Короткая',
    description: '5-10 минут',
  },
  {
    id: 'medium',
    title: 'Средняя',
    description: '15-20 минут',
  },
  {
    id: 'long',
    title: 'Длинная',
    description: '30-45 минут',
  },
];

export default function DurationStep() {
  const { state, setBodyState, prevStep, nextStep } = usePracticeFlow();

  const handleDurationSelect = (duration: 'short' | 'medium' | 'long') => {
    setBodyState({ duration });
    nextStep();
  };

  return (
    <QuizLayout
      title="Выберите длительность практики"
      subtitle="Сколько времени вы готовы уделить своей практике?"
      backButton
      onBack={prevStep}
    >
      <div className="flex flex-col gap-6 w-full mt-8">
        {durationOptions.map((option) => (
          <QuizOption
            key={option.id}
            selected={state.bodyState.duration === option.id}
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