"use client";

import { usePracticeFlow } from '@/context/PracticeFlowContext';
import QuizLayout from '@/components/quiz/QuizLayout';
import QuizOption from '@/components/quiz/QuizOption';

export default function DurationStep() {
  const { state, setBodyState, prevStep, nextStep } = usePracticeFlow();

  const handleDurationSelect = (duration: 'short' | 'medium' | 'long') => {
    setBodyState({ duration });
    nextStep();
  };

  return (
    <QuizLayout
      title="Выберите длительность практики"
      subtitle="Сколько времени вы хотите уделить практике?"
      backButton
      onBack={prevStep}
    >
      <div className="flex flex-col gap-6 w-full mt-8">
        {/* Placeholder for duration options */}
      </div>
    </QuizLayout>
  );
} 