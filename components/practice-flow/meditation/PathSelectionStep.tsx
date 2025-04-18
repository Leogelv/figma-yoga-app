"use client";

import { usePracticeFlow } from '@/context/PracticeFlowContext';
import QuizLayout from '@/components/quiz/QuizLayout';
import QuizOption from '@/components/quiz/QuizOption';
import Image from 'next/image';

type PathOption = {
  id: 'time_goal' | 'approach';
  title: string;
  description: string;
  iconSrc: string;
};

const pathOptions: PathOption[] = [
  {
    id: 'time_goal',
    title: 'По времени и цели',
    description: 'Подберите медитацию на основе длительности и задачи',
    iconSrc: '/icons/time-icon.svg',
  },
  {
    id: 'approach',
    title: 'По подходу',
    description: 'Выберите технику медитации, которую хотите практиковать',
    iconSrc: '/icons/approach-icon.svg',
  }
];

export default function PathSelectionStep() {
  const { state, setMeditationState, prevStep, nextStep } = usePracticeFlow();

  const handlePathSelect = (path: 'time_goal' | 'approach') => {
    setMeditationState({ path });
    nextStep();
  };

  return (
    <QuizLayout
      title="Как подобрать медитацию?"
      subtitle="Выберите подход к выбору медитации"
      backButton
      onBack={prevStep}
    >
      <div className="flex flex-col gap-6 w-full mt-8">
        {pathOptions.map((option) => (
          <QuizOption
            key={option.id}
            selected={state.meditationState.path === option.id}
            onClick={() => handlePathSelect(option.id)}
          >
            <div className="flex items-center gap-5">
              <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center bg-blue-50 rounded-lg">
                <Image 
                  src={option.iconSrc} 
                  alt={option.title} 
                  width={36}
                  height={36}
                  className="object-contain text-blue-600"
                />
              </div>
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold text-gray-800">{option.title}</h3>
                <p className="text-sm text-gray-500">{option.description}</p>
              </div>
            </div>
          </QuizOption>
        ))}
      </div>
    </QuizLayout>
  );
} 