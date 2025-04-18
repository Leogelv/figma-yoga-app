"use client";

import { usePracticeFlow } from '@/context/PracticeFlowContext';
import QuizLayout from '@/components/quiz/QuizLayout';
import QuizOption from '@/components/quiz/QuizOption';
import Image from 'next/image';

type GoalOption = {
  id: 'relaxation' | 'concentration' | 'sleep' | 'emotions';
  title: string;
  description: string;
  iconSrc: string;
};

const goalOptions: GoalOption[] = [
  {
    id: 'relaxation',
    title: 'Расслабление',
    description: 'Снятие стресса и напряжения',
    iconSrc: '/icons/relax-icon.svg',
  },
  {
    id: 'concentration',
    title: 'Концентрация',
    description: 'Улучшение фокуса внимания',
    iconSrc: '/icons/focus-icon.svg',
  },
  {
    id: 'sleep',
    title: 'Сон',
    description: 'Подготовка к качественному сну',
    iconSrc: '/icons/sleep-icon.svg',
  },
  {
    id: 'emotions',
    title: 'Работа с эмоциями',
    description: 'Регуляция эмоционального состояния',
    iconSrc: '/icons/emotions-icon.svg',
  },
];

export default function MeditationGoalStep() {
  const { state, setMeditationState, prevStep, nextStep } = usePracticeFlow();

  const handleGoalSelect = (goal: 'relaxation' | 'concentration' | 'sleep' | 'emotions') => {
    setMeditationState({ goal });
    nextStep();
  };

  return (
    <QuizLayout
      title="Какая цель вашей медитации?"
      subtitle="Выберите, чего вы хотите достичь"
      backButton
      onBack={prevStep}
    >
      <div className="flex flex-col gap-6 w-full mt-8">
        {goalOptions.map((option) => (
          <QuizOption
            key={option.id}
            selected={state.meditationState.goal === option.id}
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