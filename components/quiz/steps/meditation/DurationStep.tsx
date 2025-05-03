"use client";

import { usePracticeFlow } from '@/context/PracticeFlowContext';
import QuizLayout from '@/components/ui/layout/QuizLayout';
import Option from '@/components/quiz/core/Option';
import { Clock3, Clock, Clock9 } from 'lucide-react';

export default function DurationStep() {
  const { state, setMeditationState, prevStep, nextStep } = usePracticeFlow();

  const handleDurationSelect = (duration: 'short' | 'medium' | 'long') => {
    setMeditationState({ duration });
    nextStep();
  };

  return (
    <QuizLayout
      title="Выберите длительность медитации"
      subtitle="Сколько времени вы хотите уделить медитации?"
      backButton
      onBack={prevStep}
    >
      <div className="flex flex-col gap-6 w-full mt-8">
        <Option
          selected={state.meditationState.duration === 'short'}
          onClick={() => handleDurationSelect('short')}
        >
          <div className="flex items-center gap-3">
            <Clock3 size={24} className="text-primary" />
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold">Короткая</h3>
              <p className="text-sm text-muted-foreground">5-10 минут</p>
            </div>
          </div>
        </Option>
        
        <Option
          selected={state.meditationState.duration === 'medium'}
          onClick={() => handleDurationSelect('medium')}
        >
          <div className="flex items-center gap-3">
            <Clock size={24} className="text-primary" />
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold">Средняя</h3>
              <p className="text-sm text-muted-foreground">15-20 минут</p>
            </div>
          </div>
        </Option>
        
        <Option
          selected={state.meditationState.duration === 'long'}
          onClick={() => handleDurationSelect('long')}
        >
          <div className="flex items-center gap-3">
            <Clock9 size={24} className="text-primary" />
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold">Длинная</h3>
              <p className="text-sm text-muted-foreground">30-45 минут</p>
            </div>
          </div>
        </Option>
      </div>
    </QuizLayout>
  );
} 