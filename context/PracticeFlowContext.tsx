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
  // Добавляем историю навигации для корректной работы prevStep
  navigationHistory: { step: number; practiceType: 'body' | 'meditation' | 'breathing' | null }[];
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
  },
  // Инициализируем историю навигации
  navigationHistory: []
};

// Создаем контекст
const PracticeFlowContext = createContext<PracticeFlowContextType | undefined>(undefined);

// Провайдер контекста
export function PracticeFlowProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PracticeFlowState>(initialState);

  // Установка типа практики
  const setPracticeType = (type: 'body' | 'meditation' | 'breathing' | null) => {
    setState(prev => {
      console.log('setPracticeType:', type, 'previous state:', prev);
      return {
        ...prev,
        practiceType: type,
        // Сохраняем предыдущий шаг в истории
        navigationHistory: [...prev.navigationHistory, { step: prev.step, practiceType: prev.practiceType }]
      };
    });
  };

  // Обновление состояния телесной практики
  const setBodyState = (newState: Partial<BodyPracticeState>) => {
    setState(prev => {
      console.log('setBodyState:', newState, 'previous state:', prev.bodyState);
      const currentState = {
        ...prev,
        bodyState: {
          ...prev.bodyState,
          ...newState
        },
        // Сохраняем предыдущий шаг в истории
        navigationHistory: [...prev.navigationHistory, { step: prev.step, practiceType: prev.practiceType }]
      };
      console.log('New state:', currentState);
      return currentState;
    });
  };

  // Обновление состояния медитации
  const setMeditationState = (newState: Partial<MeditationPracticeState>) => {
    setState(prev => {
      console.log('setMeditationState:', newState, 'previous state:', prev.meditationState);
      return {
        ...prev,
        meditationState: {
          ...prev.meditationState,
          ...newState
        },
        // Сохраняем предыдущий шаг в истории
        navigationHistory: [...prev.navigationHistory, { step: prev.step, practiceType: prev.practiceType }]
      };
    });
  };

  // Обновление состояния дыхательной практики
  const setBreathingState = (newState: Partial<BreathingPracticeState>) => {
    setState(prev => {
      console.log('setBreathingState:', newState, 'previous state:', prev.breathingState);
      return {
        ...prev,
        breathingState: {
          ...prev.breathingState,
          ...newState
        },
        // Сохраняем предыдущий шаг в истории
        navigationHistory: [...prev.navigationHistory, { step: prev.step, practiceType: prev.practiceType }]
      };
    });
  };

  // Переход к следующему шагу
  const nextStep = () => {
    setState(prev => {
      console.log('nextStep: current step', prev.step, '-> new step', prev.step + 1);
      return {
        ...prev,
        step: prev.step + 1,
        // Сохраняем предыдущий шаг в истории
        navigationHistory: [...prev.navigationHistory, { step: prev.step, practiceType: prev.practiceType }]
      };
    });
  };

  // Возврат к предыдущему шагу
  // ИСПРАВЛЕНО: Реализована более надежная навигация назад с учетом истории
  const prevStep = () => {
    setState(prev => {
      console.log('prevStep called, current step:', prev.step, 'history:', prev.navigationHistory);
      
      if (prev.step <= 1) {
        console.log('Already at first step, cannot go back');
        return prev; // Уже на первом шаге, не меняем состояние
      }
      
      // Возвращаемся на один шаг назад
      // Если у нас есть история навигации, восстанавливаем последнее состояние
      if (prev.navigationHistory.length > 0) {
        const lastState = prev.navigationHistory[prev.navigationHistory.length - 1];
        const newHistory = prev.navigationHistory.slice(0, -1); // Убираем последний элемент
        
        console.log('Going back to previous state:', lastState);
        
        // В зависимости от текущего типа практики и шага, сбрасываем последний выбор
        let updatedState = { ...prev };
        
        if (prev.practiceType === 'body') {
          if (prev.bodyState.goal !== null) {
            updatedState.bodyState = { ...updatedState.bodyState, goal: null };
          } else if (prev.bodyState.duration !== null) {
            updatedState.bodyState = { ...updatedState.bodyState, duration: null };
          } else if (prev.bodyState.difficulty !== null) {
            updatedState.bodyState = { ...updatedState.bodyState, difficulty: null };
          } else if (prev.bodyState.bodyType !== null) {
            updatedState.bodyState = { ...updatedState.bodyState, bodyType: null };
          }
        } else if (prev.practiceType === 'meditation') {
          if (prev.meditationState.path === 'guided') {
            if (prev.meditationState.duration !== null) {
              updatedState.meditationState = { ...updatedState.meditationState, duration: null };
            } else if (prev.meditationState.theme !== null) {
              updatedState.meditationState = { ...updatedState.meditationState, theme: null };
            } else if (prev.meditationState.goal !== null) {
              updatedState.meditationState = { ...updatedState.meditationState, goal: null };
            } else {
              updatedState.meditationState = { ...updatedState.meditationState, path: null };
            }
          } else if (prev.meditationState.path === 'self_guided') {
            if (prev.meditationState.object !== null) {
              updatedState.meditationState = { ...updatedState.meditationState, object: null };
            } else {
              updatedState.meditationState = { ...updatedState.meditationState, path: null };
            }
          } else {
            // Если path еще не выбран, сбрасываем тип практики
            updatedState.practiceType = null;
          }
        } else if (prev.practiceType === 'breathing') {
          if (prev.breathingState.duration !== null) {
            updatedState.breathingState = { ...updatedState.breathingState, duration: null };
          } else if (prev.breathingState.intensity !== null) {
            updatedState.breathingState = { ...updatedState.breathingState, intensity: null };
          } else if (prev.breathingState.goal !== null) {
            updatedState.breathingState = { ...updatedState.breathingState, goal: null };
          } else {
            // Если уже все сброшено, возвращаемся к выбору типа практики
            updatedState.practiceType = null;
          }
        }
        
        console.log('Updated state after prevStep:', updatedState);
        
        return {
          ...updatedState,
          step: prev.step - 1,
          navigationHistory: newHistory
        };
      } else {
        // Если история пуста, просто уменьшаем шаг
        console.log('No history, just decrementing step');
        return {
          ...prev,
          step: Math.max(1, prev.step - 1)
        };
      }
    });
  };

  // Установка конкретного шага
  const setStep = (step: number) => {
    setState(prev => {
      console.log('setStep:', step, 'current step:', prev.step);
      return {
        ...prev,
        step,
        // Сохраняем предыдущий шаг в истории
        navigationHistory: [...prev.navigationHistory, { step: prev.step, practiceType: prev.practiceType }]
      };
    });
  };

  // Добавление ID практики в список исключенных
  const addExcludedPracticeId = (id: string) => {
    setState(prev => {
      console.log('addExcludedPracticeId:', id, 'current excluded:', prev.excludedPracticeIds);
      return {
        ...prev,
        excludedPracticeIds: [...prev.excludedPracticeIds, id]
      };
    });
  };

  // Сброс состояния квиза
  const resetFlow = () => {
    console.log('resetFlow: Resetting state to initial');
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