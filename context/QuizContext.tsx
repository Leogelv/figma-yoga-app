'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

// Типы для телесной практики
interface BodyQuizState {
  bodyType: 'yoga' | 'posture' | null;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | null;
  duration: 'short' | 'medium' | 'long' | null;
  goal: 'relax' | 'flexibility' | 'strength' | 'balance' | null;
}

// Типы для медитативной практики
interface MeditationQuizState {
  goal: 'relaxation' | 'concentration' | 'sleep' | 'emotions' | null;
  duration: 'short' | 'medium' | 'long' | null;
  experience: 'beginner' | 'experienced' | null;
}

// Типы для дыхательной практики
interface BreathingQuizState {
  goal: 'energy' | 'relaxation' | 'focus' | 'recovery' | null;
  intensity: 'mild' | 'medium' | 'intense' | null;
  duration: 'short' | 'medium' | 'long' | null;
}

// Общее состояние квиза
interface QuizState {
  practiceType: 'body' | 'meditation' | 'breathing' | null;
  bodyState: BodyQuizState;
  meditationState: MeditationQuizState;
  breathingState: BreathingQuizState;
}

// Тип для контекста
interface QuizContextType {
  quizState: QuizState;
  setPracticeType: (type: 'body' | 'meditation' | 'breathing') => void;
  setBodyState: (state: Partial<BodyQuizState>) => void;
  setMeditationState: (state: Partial<MeditationQuizState>) => void;
  setBreathingState: (state: Partial<BreathingQuizState>) => void;
  resetQuiz: () => void;
}

// Создаем контекст
const QuizContext = createContext<QuizContextType | undefined>(undefined);

// Начальное состояние
const initialState: QuizState = {
  practiceType: null,
  bodyState: {
    bodyType: null,
    difficulty: null,
    duration: null,
    goal: null
  },
  meditationState: {
    goal: null,
    duration: null,
    experience: null
  },
  breathingState: {
    goal: null,
    intensity: null,
    duration: null
  }
};

// Провайдер контекста
export function QuizProvider({ children }: { children: ReactNode }) {
  const [quizState, setQuizState] = useState<QuizState>(initialState);

  // Устанавливаем тип практики
  const setPracticeType = (type: 'body' | 'meditation' | 'breathing') => {
    setQuizState(prev => ({
      ...prev,
      practiceType: type
    }));
  };

  // Обновляем состояние телесной практики
  const setBodyState = (state: Partial<BodyQuizState>) => {
    setQuizState(prev => ({
      ...prev,
      bodyState: {
        ...prev.bodyState,
        ...state
      }
    }));
  };

  // Обновляем состояние медитативной практики
  const setMeditationState = (state: Partial<MeditationQuizState>) => {
    setQuizState(prev => ({
      ...prev,
      meditationState: {
        ...prev.meditationState,
        ...state
      }
    }));
  };

  // Обновляем состояние дыхательной практики
  const setBreathingState = (state: Partial<BreathingQuizState>) => {
    setQuizState(prev => ({
      ...prev,
      breathingState: {
        ...prev.breathingState,
        ...state
      }
    }));
  };

  // Сбрасываем состояние квиза
  const resetQuiz = () => {
    setQuizState(initialState);
  };

  return (
    <QuizContext.Provider
      value={{
        quizState,
        setPracticeType,
        setBodyState,
        setMeditationState,
        setBreathingState,
        resetQuiz
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

// Хук для использования контекста
export function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
} 