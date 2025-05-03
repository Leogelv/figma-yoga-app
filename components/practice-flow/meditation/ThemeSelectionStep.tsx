"use client";

import { usePracticeFlow } from '@/context/PracticeFlowContext';
import QuizLayout from '@/components/quiz/QuizLayout';
import QuizOption from '@/components/quiz/QuizOption';
import { TreePine, Orbit, Waves, Music } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ThemeSelectionStep() {
  const { state, setMeditationState, prevStep, nextStep } = usePracticeFlow();

  const handleThemeSelect = (theme: 'nature' | 'space' | 'ocean' | 'music') => {
    setMeditationState({ theme });
    nextStep();
  };

  return (
    <QuizLayout
      title="Выберите тему медитации"
      subtitle="Какое сопровождение вы предпочитаете?"
      backButton
      onBack={prevStep}
    >
      <div className="flex flex-col gap-4 w-full mt-6">
        <ThemeOption
          icon={<TreePine size={20} />}
          title="Природа"
          description="Звуки леса, птиц, водопада"
          onClick={() => handleThemeSelect('nature')}
          selected={state.meditationState.theme === 'nature'}
        />
        
        <ThemeOption
          icon={<Orbit size={20} />}
          title="Космос"
          description="Глубокое созерцательное погружение"
          onClick={() => handleThemeSelect('space')}
          selected={state.meditationState.theme === 'space'}
        />
        
        <ThemeOption
          icon={<Waves size={20} />}
          title="Океан"
          description="Шум волн и морской бриз"
          onClick={() => handleThemeSelect('ocean')}
          selected={state.meditationState.theme === 'ocean'}
        />
        
        <ThemeOption
          icon={<Music size={20} />}
          title="Музыка"
          description="Специальная музыка для медитации"
          onClick={() => handleThemeSelect('music')}
          selected={state.meditationState.theme === 'music'}
        />
      </div>
    </QuizLayout>
  );
}

interface ThemeOptionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  selected: boolean;
}

function ThemeOption({ icon, title, description, onClick, selected }: ThemeOptionProps) {
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