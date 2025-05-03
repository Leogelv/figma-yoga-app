"use client";

import { createContext, useState, ReactNode, useContext } from 'react';

// Типы для различных видов практик
type BodyPracticeState = {
  bodyType: 'yoga' | 'stretching' | null;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | null;
  duration: 'short' | 'medium' | 'long' | null;
  goal: 'relax' | 'flexibility' | 'strength' | 'balance' | null;
};

type MeditationPracticeState = {
  path: 'self_guided' | 'guided' | null;
  goal: 'relaxation' | 'concentration' | 'sleep' | 'emotions' | null;
  duration: 'short' | 'medium' | 'long' | null;
  experience: 'beginner' | 'practitioner' | null;
  object: 'breathing' | 'body' | 'sounds' | 'thoughts' | null;
  theme: 'nature' | 'space' | 'ocean' | 'music' | null;
};

type BreathingPracticeState = {
  goal: 'energy' | 'relaxation' | 'focus' | 'recovery' | null;
  intensity: 'mild' | 'medium' | 'intense' | null;
  duration: 'short' | 'medium' | 'long' | null;
};

// Общее состояние квиза
type PracticeFlowState = {
  step: number;
  practiceType: 'body' | 'meditation' | 'breathing' | null;
  excludedPracticeIds: string[];
  bodyState: BodyPracticeState;
  meditationState: MeditationPracticeState;
  breathingState: BreathingPracticeState;
};

// Контекстные данные и методы
type PracticeFlowContextType = {
  state: PracticeFlowState;
  setPracticeType: (type: 'body' | 'meditation' | 'breathing' | null) => void;
  setBodyState: (state: Partial<BodyPracticeState>) => void;
  setMeditationState: (state: Partial<MeditationPracticeState>) => void;
  setBreathingState: (state: Partial<BreathingPracticeState>) => void;
  nextStep: () => void;
  prevStep: () => void;
  setStep: (step: number) => void;
  addExcludedPracticeId: (id: string) => void;
  resetFlow: () => void;
};

// Начальное состояние
const initialState: PracticeFlowState = {
  step: 1,
  practiceType: null,
  excludedPracticeIds: [],
  bodyState: {
    bodyType: null,
    difficulty: null,
    duration: null,
    goal: null
  },
  meditationState: {
    path: null,
    goal: null,
    duration: null,
    experience: null,
    object: null,
    theme: null
  },
  breathingState: {
    goal: null,
    intensity: null,
    duration: null
  }
};

// Создаем контекст
const PracticeFlowContext = createContext<PracticeFlowContextType | undefined>(undefined);

// Провайдер контекста
export function PracticeFlowProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PracticeFlowState>(initialState);

  // Установка типа практики
  const setPracticeType = (type: 'body' | 'meditation' | 'breathing' | null) => {
    setState(prev => ({
      ...prev,
      practiceType: type
    }));
  };

  // Обновление состояния телесной практики
  const setBodyState = (newState: Partial<BodyPracticeState>) => {
    setState(prev => ({
      ...prev,
      bodyState: {
        ...prev.bodyState,
        ...newState
      }
    }));
  };

  // Обновление состояния медитации
  const setMeditationState = (newState: Partial<MeditationPracticeState>) => {
    setState(prev => ({
      ...prev,
      meditationState: {
        ...prev.meditationState,
        ...newState
      }
    }));
  };

  // Обновление состояния дыхательной практики
  const setBreathingState = (newState: Partial<BreathingPracticeState>) => {
    setState(prev => ({
      ...prev,
      breathingState: {
        ...prev.breathingState,
        ...newState
      }
    }));
  };

  // Переход к следующему шагу
  const nextStep = () => {
    setState(prev => ({
      ...prev,
      step: prev.step + 1
    }));
  };

  // Возврат к предыдущему шагу
  const prevStep = () => {
    setState(prev => ({
      ...prev,
      step: Math.max(1, prev.step - 1)
    }));
  };

  // Установка конкретного шага
  const setStep = (step: number) => {
    setState(prev => ({
      ...prev,
      step
    }));
  };

  // Добавление ID практики в список исключенных
  const addExcludedPracticeId = (id: string) => {
    setState(prev => ({
      ...prev,
      excludedPracticeIds: [...prev.excludedPracticeIds, id]
    }));
  };

  // Сброс состояния квиза
  const resetFlow = () => {
    setState(initialState);
  };

  // Значение контекста, которое будет предоставляться компонентам
  const contextValue: PracticeFlowContextType = {
    state,
    setPracticeType,
    setBodyState,
    setMeditationState,
    setBreathingState,
    nextStep,
    prevStep,
    setStep,
    addExcludedPracticeId,
    resetFlow
  };

  return (
    <PracticeFlowContext.Provider value={contextValue}>
      {children}
    </PracticeFlowContext.Provider>
  );
}

// Хук для использования контекста
export function usePracticeFlow() {
  const context = useContext(PracticeFlowContext);
  
  if (context === undefined) {
    throw new Error('usePracticeFlow must be used within a PracticeFlowProvider');
  }
  
  return context;
} 