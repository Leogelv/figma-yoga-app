"use client";

import { usePracticeFlow } from '@/context/PracticeFlowContext';
import QuizLayout from '@/components/quiz/QuizLayout';
import QuizOption from '@/components/quiz/QuizOption';
import Image from 'next/image';

type GoalOption = {
  id: 'relax' | 'flexibility' | 'strength' | 'balance';
  title: string;
  description: string;
  iconSrc: string;
};

const goalOptions: GoalOption[] = [
  {
    id: 'relax',
    title: 'Расслабление',
    description: 'Снять напряжение и стресс',
    iconSrc: '/icons/relax-icon.svg',
  },
  {
    id: 'flexibility',
    title: 'Гибкость',
    description: 'Улучшить подвижность и растяжку',
    iconSrc: '/icons/flexibility-icon.svg',
  },
  {
    id: 'strength',
    title: 'Сила',
    description: 'Укрепить мышцы и выносливость',
    iconSrc: '/icons/strength-icon.svg',
  },
  {
    id: 'balance',
    title: 'Баланс',
    description: 'Развить равновесие и координацию',
    iconSrc: '/icons/balance-icon.svg',
  },
];

export default function GoalStep() {
  const { state, setBodyState, prevStep, nextStep } = usePracticeFlow();

  const handleGoalSelect = (goal: 'relax' | 'flexibility' | 'strength' | 'balance') => {
    setBodyState({ goal });
    nextStep();
  };

  return (
    <QuizLayout
      title="Какая ваша основная цель?"
      subtitle="Выберите, чего вы хотите достичь с помощью практики"
      backButton
      onBack={prevStep}
    >
      <div className="flex flex-col gap-6 w-full mt-8">
        {goalOptions.map((option) => (
          <QuizOption
            key={option.id}
            selected={state.bodyState.goal === option.id}
            onClick={() => handleGoalSelect(option.id)}
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