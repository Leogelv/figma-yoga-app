"use client";

import { usePracticeFlow } from '@/context/PracticeFlowContext';
import QuizLayout from '@/components/ui/layout/QuizLayout';
import Option from '@/components/quiz/core/Option';
import { Clock } from 'lucide-react';

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
        <Option
          selected={state.bodyState.duration === 'short'}
          onClick={() => handleDurationSelect('short')}
        >
          <div className="flex items-center gap-3">
            <Clock size={24} className="text-primary" />
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold">Короткая</h3>
              <p className="text-sm text-muted-foreground">До 15 минут</p>
            </div>
          </div>
        </Option>
        <Option
          selected={state.bodyState.duration === 'medium'}
          onClick={() => handleDurationSelect('medium')}
        >
          <div className="flex items-center gap-3">
            <Clock size={24} className="text-primary" />
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold">Средняя</h3>
              <p className="text-sm text-muted-foreground">15-30 минут</p>
            </div>
          </div>
        </Option>
        <Option
          selected={state.bodyState.duration === 'long'}
          onClick={() => handleDurationSelect('long')}
        >
          <div className="flex items-center gap-3">
            <Clock size={24} className="text-primary" />
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold">Длинная</h3>
              <p className="text-sm text-muted-foreground">30+ минут</p>
            </div>
          </div>
        </Option>
      </div>
    </QuizLayout>
  );
} 