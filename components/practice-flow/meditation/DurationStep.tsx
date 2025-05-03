"use client";

import { usePracticeFlow } from '@/context/PracticeFlowContext';
import QuizLayout from '@/components/quiz/QuizLayout';
import QuizOption from '@/components/quiz/QuizOption';
import { Clock3, Clock, Clock9 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function DurationStep() {
  const { state, setMeditationState, prevStep, nextStep } = usePracticeFlow();

  const handleDurationSelect = (duration: 'short' | 'medium' | 'long') => {
    setMeditationState({ duration });
    nextStep();
  };

  return (
    <QuizLayout
      title="Выберите длительность медитации"
      subtitle="Сколько времени вы хотите уделить медитации?"
      backButton
      onBack={prevStep}
    >
      <div className="flex flex-col gap-4 w-full mt-6">
        <DurationOption
          icon={<Clock3 size={20} />}
          title="Короткая"
          description="5-10 минут"
          onClick={() => handleDurationSelect('short')}
          selected={state.meditationState.duration === 'short'}
        />
        
        <DurationOption
          icon={<Clock size={20} />}
          title="Средняя"
          description="15-20 минут"
          onClick={() => handleDurationSelect('medium')}
          selected={state.meditationState.duration === 'medium'}
        />
        
        <DurationOption
          icon={<Clock9 size={20} />}
          title="Длинная"
          description="30-45 минут"
          onClick={() => handleDurationSelect('long')}
          selected={state.meditationState.duration === 'long'}
        />
      </div>
    </QuizLayout>
  );
}

interface DurationOptionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  selected: boolean;
}

function DurationOption({ icon, title, description, onClick, selected }: DurationOptionProps) {
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