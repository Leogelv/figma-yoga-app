"use client";

import { usePracticeFlow } from '@/context/PracticeFlowContext';
import QuizLayout from '@/components/quiz/QuizLayout';
import QuizOption from '@/components/quiz/QuizOption';

export default function GoalStep() {
  const { state, setBodyState, prevStep, nextStep } = usePracticeFlow();

  const handleGoalSelect = (goal: 'relax' | 'flexibility' | 'strength' | 'balance') => {
    setBodyState({ goal });
    nextStep();
  };

  return (
    <QuizLayout
      title="Выберите цель практики"
      subtitle="Чего вы хотите достичь с помощью практики?"
      backButton
      onBack={prevStep}
    >
      <div className="flex flex-col gap-4 w-full">
        <QuizOption
          onClick={() => handleGoalSelect('relax')}
          selected={state.bodyState.goal === 'relax'}
        >
          <div className="flex flex-col">
            <h3 className="text-base font-medium text-foreground">Расслабление</h3>
            <p className="text-sm text-muted-foreground">Снятие напряжения и стресса</p>
          </div>
        </QuizOption>
        
        <QuizOption
          onClick={() => handleGoalSelect('flexibility')}
          selected={state.bodyState.goal === 'flexibility'}
        >
          <div className="flex flex-col">
            <h3 className="text-base font-medium text-foreground">Гибкость</h3>
            <p className="text-sm text-muted-foreground">Растяжка и улучшение подвижности</p>
          </div>
        </QuizOption>
        
        <QuizOption
          onClick={() => handleGoalSelect('strength')}
          selected={state.bodyState.goal === 'strength'}
        >
          <div className="flex flex-col">
            <h3 className="text-base font-medium text-foreground">Сила</h3>
            <p className="text-sm text-muted-foreground">Укрепление мышц и тонус</p>
          </div>
        </QuizOption>
        
        <QuizOption
          onClick={() => handleGoalSelect('balance')}
          selected={state.bodyState.goal === 'balance'}
        >
          <div className="flex flex-col">
            <h3 className="text-base font-medium text-foreground">Баланс</h3>
            <p className="text-sm text-muted-foreground">Улучшение координации и равновесия</p>
          </div>
        </QuizOption>
      </div>
    </QuizLayout>
  );
} 