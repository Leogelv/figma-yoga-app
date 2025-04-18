"use client";

import { usePracticeFlow } from '@/context/PracticeFlowContext';
import { formatDuration } from '@/lib/utils';
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
    title: 'Короткая медитация',
    description: formatDuration('short'),
  },
  {
    id: 'medium',
    title: 'Средняя медитация',
    description: formatDuration('medium'),
  },
  {
    id: 'long',
    title: 'Длинная медитация',
    description: formatDuration('long'),
  },
];

export default function MeditationDurationStep() {
  const { state, setMeditationState, prevStep, nextStep } = usePracticeFlow();

  const handleDurationSelect = (duration: 'short' | 'medium' | 'long') => {
    setMeditationState({ duration });
    nextStep();
  };

  return (
    <QuizLayout
      title="Какой длительности медитация вам подходит?"
      subtitle="Выберите комфортную для вас длительность"
      backButton
      onBack={prevStep}
    >
      <div className="flex flex-col gap-6 w-full mt-8">
        {durationOptions.map((option) => (
          <QuizOption
            key={option.id}
            selected={state.meditationState.duration === option.id}
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