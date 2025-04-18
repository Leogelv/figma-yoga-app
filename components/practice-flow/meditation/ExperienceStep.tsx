"use client";

import { usePracticeFlow } from '@/context/PracticeFlowContext';
import QuizLayout from '@/components/quiz/QuizLayout';
import QuizOption from '@/components/quiz/QuizOption';

type ExperienceOption = {
  id: 'beginner' | 'practitioner';
  title: string;
  description: string;
};

const experienceOptions: ExperienceOption[] = [
  {
    id: 'beginner',
    title: 'Начинающий',
    description: 'Никогда не медитировал или пробовал несколько раз',
  },
  {
    id: 'practitioner',
    title: 'Практикующий',
    description: 'Есть опыт регулярной медитации',
  },
];

export default function ExperienceStep() {
  const { state, setMeditationState, prevStep, nextStep } = usePracticeFlow();

  const handleExperienceSelect = (experience: 'beginner' | 'practitioner') => {
    setMeditationState({ experience });
    nextStep();
  };

  return (
    <QuizLayout
      title="Каков ваш опыт медитации?"
      subtitle="Этот выбор поможет подобрать подходящие инструкции"
      backButton
      onBack={prevStep}
    >
      <div className="flex flex-col gap-6 w-full mt-8">
        {experienceOptions.map((option) => (
          <QuizOption
            key={option.id}
            selected={state.meditationState.experience === option.id}
            onClick={() => handleExperienceSelect(option.id)}
          >
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold text-gray-800">{option.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{option.description}</p>
            </div>
          </QuizOption>
        ))}
      </div>
    </QuizLayout>
  );
} 