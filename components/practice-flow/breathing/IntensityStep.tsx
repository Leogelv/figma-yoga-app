"use client";

import { usePracticeFlow } from '@/context/PracticeFlowContext';
import QuizLayout from '@/components/quiz/QuizLayout';
import QuizOption from '@/components/quiz/QuizOption';
import Image from 'next/image';

type IntensityOption = {
  id: 'mild' | 'medium' | 'intense';
  title: string;
  description: string;
  iconSrc: string;
};

const intensityOptions: IntensityOption[] = [
  {
    id: 'mild',
    title: 'Мягкая',
    description: 'Легкая и успокаивающая практика',
    iconSrc: '/icons/intensity-mild.svg', // Placeholder
  },
  {
    id: 'medium',
    title: 'Средняя',
    description: 'Умеренная интенсивность для баланса',
    iconSrc: '/icons/intensity-medium.svg', // Placeholder
  },
  {
    id: 'intense',
    title: 'Интенсивная',
    description: 'Активная практика для энергии или глубокой работы',
    iconSrc: '/icons/intensity-intense.svg', // Placeholder
  },
];

export default function IntensityStep() {
  const { state, setBreathingState, prevStep, nextStep } = usePracticeFlow();

  const handleIntensitySelect = (intensity: 'mild' | 'medium' | 'intense') => {
    setBreathingState({ intensity });
    nextStep();
  };

  return (
    <QuizLayout
      title="Выберите интенсивность практики"
      subtitle="Какой уровень нагрузки вам комфортен?"
      backButton
      onBack={prevStep}
    >
      <div className="flex flex-col gap-6 w-full mt-8">
        {intensityOptions.map((option) => (
          <QuizOption
            key={option.id}
            selected={state.breathingState.intensity === option.id}
            onClick={() => handleIntensitySelect(option.id)}
          >
             <div className="flex items-center gap-5">
              <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center bg-blue-50 rounded-lg">
                <Image 
                  src={option.iconSrc} 
                  alt={option.title} 
                  width={36}
                  height={36}
                  className="object-contain text-blue-600"
                  onError={(e) => (e.currentTarget.src = '/icons/breathing-icon.svg')}
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