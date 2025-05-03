"use client";

import { usePracticeFlow } from '@/context/PracticeFlowContext';
import QuizLayout from '@/components/quiz/QuizLayout';
import QuizOption from '@/components/quiz/QuizOption';

export default function GoalStep() {
  const { state, setBreathingState, prevStep, nextStep } = usePracticeFlow();

  const handleGoalSelect = (goal: 'energy' | 'relaxation' | 'focus' | 'recovery') => {
    setBreathingState({ goal });
    nextStep();
  };

  return (
    <QuizLayout
      title="Выберите цель дыхательной практики"
      subtitle="Что вы хотите получить от дыхательной практики?"
      backButton
      onBack={prevStep}
    >
      <div className="flex flex-col gap-4 w-full">
        <QuizOption
          onClick={() => handleGoalSelect('energy')}
          selected={state.breathingState.goal === 'energy'}
        >
          <div className="flex flex-col">
            <h3 className="text-base font-medium">Энергия</h3>
            <p className="text-sm text-muted-foreground">Повышение энергии и бодрости</p>
          </div>
        </QuizOption>
        
        <QuizOption
          onClick={() => handleGoalSelect('relaxation')}
          selected={state.breathingState.goal === 'relaxation'}
        >
          <div className="flex flex-col">
            <h3 className="text-base font-medium">Расслабление</h3>
            <p className="text-sm text-muted-foreground">Снятие напряжения и стресса</p>
          </div>
        </QuizOption>
        
        <QuizOption
          onClick={() => handleGoalSelect('focus')}
          selected={state.breathingState.goal === 'focus'}
        >
          <div className="flex flex-col">
            <h3 className="text-base font-medium">Концентрация</h3>
            <p className="text-sm text-muted-foreground">Улучшение сосредоточенности</p>
          </div>
        </QuizOption>
        
        <QuizOption
          onClick={() => handleGoalSelect('recovery')}
          selected={state.breathingState.goal === 'recovery'}
        >
          <div className="flex flex-col">
            <h3 className="text-base font-medium">Восстановление</h3>
            <p className="text-sm text-muted-foreground">Восстановление после нагрузок</p>
          </div>
        </QuizOption>
      </div>
    </QuizLayout>
  );
} 