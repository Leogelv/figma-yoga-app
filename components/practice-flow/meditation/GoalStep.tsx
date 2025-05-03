"use client";

import { usePracticeFlow } from '@/context/PracticeFlowContext';
import QuizLayout from '@/components/quiz/QuizLayout';
import QuizOption from '@/components/quiz/QuizOption';

export default function GoalStep() {
  const { state, setMeditationState, prevStep, nextStep } = usePracticeFlow();

  const handleGoalSelect = (goal: 'relaxation' | 'concentration' | 'sleep' | 'emotions') => {
    setMeditationState({ goal });
    nextStep();
  };

  return (
    <QuizLayout
      title="Какова ваша цель медитации?"
      subtitle="Выберите, чего вы хотите достичь с помощью медитации"
      backButton
      onBack={prevStep}
    >
      <div className="flex flex-col gap-4 w-full">
        <QuizOption
          onClick={() => handleGoalSelect('relaxation')}
          selected={state.meditationState.goal === 'relaxation'}
        >
          <div className="flex flex-col">
            <h3 className="text-base font-medium">Расслабление</h3>
            <p className="text-sm text-muted-foreground">Снятие напряжения и достижение спокойствия</p>
          </div>
        </QuizOption>
        
        <QuizOption
          onClick={() => handleGoalSelect('concentration')}
          selected={state.meditationState.goal === 'concentration'}
        >
          <div className="flex flex-col">
            <h3 className="text-base font-medium">Концентрация</h3>
            <p className="text-sm text-muted-foreground">Улучшение фокуса и внимания</p>
          </div>
        </QuizOption>
        
        <QuizOption
          onClick={() => handleGoalSelect('sleep')}
          selected={state.meditationState.goal === 'sleep'}
        >
          <div className="flex flex-col">
            <h3 className="text-base font-medium">Сон</h3>
            <p className="text-sm text-muted-foreground">Улучшение качества сна</p>
          </div>
        </QuizOption>
        
        <QuizOption
          onClick={() => handleGoalSelect('emotions')}
          selected={state.meditationState.goal === 'emotions'}
        >
          <div className="flex flex-col">
            <h3 className="text-base font-medium">Эмоции</h3>
            <p className="text-sm text-muted-foreground">Управление эмоциями и снижение стресса</p>
          </div>
        </QuizOption>
      </div>
    </QuizLayout>
  );
} 