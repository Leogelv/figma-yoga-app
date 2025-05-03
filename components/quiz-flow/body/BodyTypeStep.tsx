"use client";

import { usePracticeFlow } from '@/context/PracticeFlowContext';
import QuizLayout from '@/components/quiz/QuizLayout';
import QuizOption from '@/components/quiz/QuizOption';
import Image from 'next/image';

type BodyTypeOption = {
  id: 'yoga' | 'stretching';
  title: string;
  description: string;
  iconSrc: string;
};

const bodyTypes: BodyTypeOption[] = [
  {
    id: 'yoga',
    title: 'Йога',
    description: 'Комплексная практика для тела и ума',
    iconSrc: '/icons/yoga-icon.svg',
  },
  {
    id: 'stretching',
    title: 'Растяжка',
    description: 'Фокус на развитие гибкости и подвижности',
    iconSrc: '/icons/stretching-icon.svg',
  }
];

export default function BodyTypeStep() {
  const { state, setBodyState, prevStep, nextStep } = usePracticeFlow();

  const handleBodyTypeSelect = (type: 'yoga' | 'stretching') => {
    setBodyState({ bodyType: type });
    nextStep();
  };

  return (
    <QuizLayout
      title="Какая телесная практика вас интересует?"
      subtitle="Выберите тип практики, который вы хотели бы выполнить"
      backButton
      onBack={prevStep}
    >
      <div className="flex flex-col gap-6 w-full mt-8">
        {bodyTypes.map((type) => (
          <QuizOption
            key={type.id}
            selected={state.bodyState.bodyType === type.id}
            onClick={() => handleBodyTypeSelect(type.id)}
          >
            <div className="flex items-center gap-5">
              <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center bg-blue-50 rounded-lg">
                <Image 
                  src={type.iconSrc} 
                  alt={type.title} 
                  width={36}
                  height={36}
                  className="object-contain text-blue-600"
                />
              </div>
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold text-gray-800">{type.title}</h3>
                <p className="text-sm text-gray-500">{type.description}</p>
              </div>
            </div>
          </QuizOption>
        ))}
      </div>
    </QuizLayout>
  );
} 