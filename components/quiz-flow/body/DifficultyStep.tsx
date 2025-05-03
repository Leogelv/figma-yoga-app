"use client";

import { usePracticeFlow } from '@/context/PracticeFlowContext';
import QuizLayout from '@/components/quiz/QuizLayout';
import QuizOption from '@/components/quiz/QuizOption';

type DifficultyOption = {
  id: 'beginner' | 'intermediate' | 'advanced';
  title: string;
  description: string;
};

const difficultyOptions: DifficultyOption[] = [
  {
    id: 'beginner',
    title: 'Начальный',
    description: 'Подходит для новичков и тех, кто давно не практиковал',
  },
  {
    id: 'intermediate',
    title: 'Средний',
    description: 'Для регулярно практикующих с базовым опытом',
  },
  {
    id: 'advanced',
    title: 'Продвинутый',
    description: 'Для опытных практиков с хорошей физической подготовкой',
  },
];

export default function DifficultyStep() {
  const { state, setBodyState, prevStep, nextStep } = usePracticeFlow();

  const handleDifficultySelect = (difficulty: 'beginner' | 'intermediate' | 'advanced') => {
    setBodyState({ difficulty });
    nextStep();
  };

  return (
    <QuizLayout
      title="Выберите уровень сложности"
      subtitle="Мы подберем практику с учетом вашего уровня подготовки"
      backButton
      onBack={prevStep}
    >
      <div className="flex flex-col gap-6 w-full mt-8">
        {difficultyOptions.map((option) => (
          <QuizOption
            key={option.id}
            selected={state.bodyState.difficulty === option.id}
            onClick={() => handleDifficultySelect(option.id)}
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