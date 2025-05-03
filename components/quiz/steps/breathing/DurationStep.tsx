"use client";

import { usePracticeFlow } from '@/context/PracticeFlowContext';
import QuizLayout from '@/components/quiz/QuizLayout';
import QuizOption from '@/components/quiz/QuizOption';

export default function DurationStep() {
  const { state, setBreathingState, prevStep, nextStep } = usePracticeFlow();

  const handleDurationSelect = (duration: 'short' | 'medium' | 'long') => {
    setBreathingState({ duration });
    nextStep();
  };

  return (
    <QuizLayout
      title="Выберите длительность дыхательной практики"
      subtitle="Сколько времени вы хотите уделить дыхательной практике?"
      backButton
      onBack={prevStep}
    >
      <div className="flex flex-col gap-6 w-full mt-8">
        {/* Placeholder for duration options */}
      </div>
    </QuizLayout>
  );
} 