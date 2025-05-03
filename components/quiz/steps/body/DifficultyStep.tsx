"use client";

import { usePracticeFlow } from '@/context/PracticeFlowContext';
import QuizLayout from '@/components/ui/layout/QuizLayout';
import Option from '@/components/quiz/core/Option';

export default function DifficultyStep() {
  const { state, setBodyState, prevStep, nextStep } = usePracticeFlow();

  const handleDifficultySelect = (difficulty: 'beginner' | 'intermediate' | 'advanced') => {
    setBodyState({ difficulty });
    nextStep();
  };

  return (
    <QuizLayout
      title="Выберите уровень сложности"
      subtitle="Какой уровень подготовки у вас сейчас?"
      backButton
      onBack={prevStep}
    >
      <div className="flex flex-col gap-6 w-full mt-8">
        <Option
          selected={state.bodyState.difficulty === 'beginner'}
          onClick={() => handleDifficultySelect('beginner')}
        >
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold">Начинающий</h3>
            <p className="text-sm text-muted-foreground">Новичок в практике</p>
          </div>
        </Option>
        <Option
          selected={state.bodyState.difficulty === 'intermediate'}
          onClick={() => handleDifficultySelect('intermediate')}
        >
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold">Средний</h3>
            <p className="text-sm text-muted-foreground">Имею некоторый опыт</p>
          </div>
        </Option>
        <Option
          selected={state.bodyState.difficulty === 'advanced'}
          onClick={() => handleDifficultySelect('advanced')}
        >
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold">Продвинутый</h3>
            <p className="text-sm text-muted-foreground">Регулярно практикую</p>
          </div>
        </Option>
      </div>
    </QuizLayout>
  );
} 