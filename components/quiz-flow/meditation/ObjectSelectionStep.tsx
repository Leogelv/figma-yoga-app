"use client";

import { usePracticeFlow } from '@/context/PracticeFlowContext';
import QuizLayout from '@/components/quiz/QuizLayout';
import QuizOption from '@/components/quiz/QuizOption';
import { Wind, Heart, Radio, Brain } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ObjectSelectionStep() {
  const { state, setMeditationState, prevStep, nextStep } = usePracticeFlow();

  const handleObjectSelect = (object: 'breathing' | 'body' | 'sounds' | 'thoughts') => {
    setMeditationState({ object });
    nextStep();
  };

  return (
    <QuizLayout
      title="Выберите объект медитации"
      subtitle="На чём вы хотите сфокусировать внимание?"
      backButton
      onBack={prevStep}
    >
      <div className="flex flex-col gap-4 w-full mt-6">
        <ObjectOption
          icon={<Wind size={20} />}
          title="Дыхание"
          description="Фокус на вдохах и выдохах"
          onClick={() => handleObjectSelect('breathing')}
          selected={state.meditationState.object === 'breathing'}
        />
        
        <ObjectOption
          icon={<Heart size={20} />}
          title="Тело"
          description="Осознанность телесных ощущений"
          onClick={() => handleObjectSelect('body')}
          selected={state.meditationState.object === 'body'}
        />
        
        <ObjectOption
          icon={<Radio size={20} />}
          title="Звуки"
          description="Внимание к окружающим звукам"
          onClick={() => handleObjectSelect('sounds')}
          selected={state.meditationState.object === 'sounds'}
        />
        
        <ObjectOption
          icon={<Brain size={20} />}
          title="Мысли"
          description="Наблюдение за потоком мыслей"
          onClick={() => handleObjectSelect('thoughts')}
          selected={state.meditationState.object === 'thoughts'}
        />
      </div>
    </QuizLayout>
  );
}

interface ObjectOptionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  selected: boolean;
}

function ObjectOption({ icon, title, description, onClick, selected }: ObjectOptionProps) {
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