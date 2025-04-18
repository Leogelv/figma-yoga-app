"use client";

import { usePracticeFlow } from '@/context/PracticeFlowContext';
import QuizLayout from '@/components/quiz/QuizLayout';
import QuizOption from '@/components/quiz/QuizOption';
import Image from 'next/image';

type PracticeTypeOption = {
  id: 'body' | 'meditation' | 'breathing';
  title: string;
  description: string;
  iconSrc: string;
};

const practiceTypes: PracticeTypeOption[] = [
  {
    id: 'body',
    title: 'Телесные практики',
    description: 'Йога, растяжка и другие физические практики',
    iconSrc: '/icons/yoga-icon.svg',
  },
  {
    id: 'meditation',
    title: 'Медитация',
    description: 'Практики для ума и внимания',
    iconSrc: '/icons/meditation-icon.svg',
  },
  {
    id: 'breathing',
    title: 'Дыхательные практики',
    description: 'Управление энергией через дыхание',
    iconSrc: '/icons/breathing-icon.svg',
  },
];

export default function TypeSelectionStep() {
  const { state, setPracticeType, nextStep } = usePracticeFlow();

  const handleTypeSelect = (type: 'body' | 'meditation' | 'breathing') => {
    setPracticeType(type);
    nextStep();
  };

  return (
    <QuizLayout
      title="Какой тип практики вас интересует?"
      subtitle="Выберите одну из опций, чтобы мы могли подобрать подходящую практику"
    >
      <div className="flex flex-col gap-6 w-full mt-8">
        {practiceTypes.map((type) => (
          <QuizOption
            key={type.id}
            selected={state.practiceType === type.id}
            onClick={() => handleTypeSelect(type.id)}
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