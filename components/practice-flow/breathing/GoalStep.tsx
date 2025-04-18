"use client";

import { usePracticeFlow } from '@/context/PracticeFlowContext';
import QuizLayout from '@/components/quiz/QuizLayout';
import QuizOption from '@/components/quiz/QuizOption';
import Image from 'next/image';

type GoalOption = {
  id: 'energy' | 'relaxation' | 'focus' | 'recovery';
  title: string;
  description: string;
  iconSrc: string;
};

const goalOptions: GoalOption[] = [
  {
    id: 'energy',
    title: 'Энергия и бодрость',
    description: 'Зарядиться энергией, взбодриться',
    iconSrc: '/icons/energy-icon.svg', // Placeholder
  },
  {
    id: 'relaxation',
    title: 'Расслабление и спокойствие',
    description: 'Снять стресс, успокоить ум',
    iconSrc: '/icons/relax-icon.svg', // Reuse existing
  },
  {
    id: 'focus',
    title: 'Концентрация и фокус',
    description: 'Улучшить внимание, собраться',
    iconSrc: '/icons/focus-icon.svg', // Reuse existing
  },
  {
    id: 'recovery',
    title: 'Восстановление',
    description: 'Восстановиться после нагрузки',
    iconSrc: '/icons/recovery-icon.svg', // Placeholder
  },
];

export default function BreathingGoalStep() {
  const { state, setBreathingState, prevStep, nextStep } = usePracticeFlow();

  const handleGoalSelect = (goal: 'energy' | 'relaxation' | 'focus' | 'recovery') => {
    setBreathingState({ goal });
    nextStep();
  };

  return (
    <QuizLayout
      title="Какова цель вашей дыхательной практики?"
      subtitle="Выберите основное намерение"
      backButton
      onBack={prevStep} // Возврат к выбору типа практики
    >
      <div className="flex flex-col gap-6 w-full mt-8">
        {goalOptions.map((option) => (
          <QuizOption
            key={option.id}
            selected={state.breathingState.goal === option.id}
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