"use client";

import { usePracticeFlow } from '@/context/PracticeFlowContext';
import QuizLayout from '@/components/quiz/QuizLayout';
import QuizOption from '@/components/quiz/QuizOption';

export default function IntensityStep() {
  const { state, setBreathingState, prevStep, nextStep } = usePracticeFlow();

  const handleIntensitySelect = (intensity: 'mild' | 'medium' | 'intense') => {
    setBreathingState({ intensity });
    nextStep();
  };

  return (
    <QuizLayout
      title="Выберите интенсивность дыхательной практики"
      subtitle="Насколько интенсивной должна быть практика?"
      backButton
      onBack={prevStep}
    >
      <div className="flex flex-col gap-6 w-full mt-8">
        {/* Placeholder for intensity options */}
      </div>
    </QuizLayout>
  );
} 