"use client";

import { usePracticeFlow } from '@/context/PracticeFlowContext';
import QuizLayout from '@/components/quiz/QuizLayout';
import QuizOption from '@/components/quiz/QuizOption';
import { Hourglass, Headphones } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function PathSelectionStep() {
  const { state, setMeditationState, prevStep, nextStep } = usePracticeFlow();

  const handlePathSelect = (path: 'self_guided' | 'guided') => {
    setMeditationState({ path });
    nextStep();
  };

  return (
    <QuizLayout
      title="Выберите подход к медитации"
      subtitle="Как бы вы хотели практиковать медитацию?"
      backButton
      onBack={prevStep}
    >
      <div className="flex flex-col gap-4 w-full mt-6">
        <PathOption
          icon={<Hourglass size={20} />}
          title="Самостоятельная"
          description="Медитация без голосового сопровождения"
          onClick={() => handlePathSelect('self_guided')}
          selected={state.meditationState.path === 'self_guided'}
        />
        
        <PathOption
          icon={<Headphones size={20} />}
          title="С сопровождением"
          description="Медитация с инструкциями и подсказками"
          onClick={() => handlePathSelect('guided')}
          selected={state.meditationState.path === 'guided'}
        />
      </div>
    </QuizLayout>
  );
}

interface PathOptionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  selected: boolean;
}

function PathOption({ icon, title, description, onClick, selected }: PathOptionProps) {
  return (
    <QuizOption
      onClick={onClick}
      selected={selected}
      className="flex items-center gap-3"
    >
      <div className={cn(
        "w-10 h-10 rounded-full flex items-center justify-center",
        selected ? "bg-primary text-white" : "bg-secondary text-foreground"
      )}>
        {icon}
      </div>
      <div className="flex flex-col">
        <h3 className="text-base font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </QuizOption>
  );
} 