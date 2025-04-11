"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import QuizLayout from '../../../components/QuizLayout';
import QuizCard from '../../../components/QuizCard';

// Типы для телесной практики
interface BodyQuizState {
  bodyType: 'yoga' | 'posture' | null;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | null;
  duration: 'short' | 'medium' | 'long' | null;
  goal: 'relax' | 'flexibility' | 'strength' | 'balance' | null;
}

// Этапы квиза телесной практики
type BodyQuizStep = 'bodyType' | 'difficulty' | 'duration' | 'goal';

export default function BodyQuizPage() {
  const router = useRouter();
  const [tg, setTg] = useState<any>(null);
  
  // Состояние для телесной практики
  const [quizState, setQuizState] = useState<BodyQuizState>({
    bodyType: null,
    difficulty: null,
    duration: null,
    goal: null,
  });
  
  // Текущий шаг квиза
  const [currentStep, setCurrentStep] = useState<BodyQuizStep>('bodyType');
  
  // Для отслеживания выбора и автоматического перехода
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  useEffect(() => {
    // Инициализация Telegram Mini App
    const telegram = window.Telegram?.WebApp;
    if (telegram) {
      telegram.ready();
      setTg(telegram);
      
      // Настраиваем цвет верхней панели
      telegram.setHeaderColor('#FFFFFF');
      
      // Показываем кнопку "Назад" в хедере
      telegram.BackButton.show();
      telegram.BackButton.onClick(() => handleBack());
    }
  }, []);

  // Обработчик для кнопки "Назад"
  const handleBack = () => {
    // Возвращаемся к предыдущему шагу, если возможно
    if (currentStep === 'bodyType') {
      router.push('/quiz');
    } else if (currentStep === 'difficulty') {
      setCurrentStep('bodyType');
      setSelectedOption(null);
    } else if (currentStep === 'duration') {
      setCurrentStep('difficulty');
      setSelectedOption(null);
    } else if (currentStep === 'goal') {
      setCurrentStep('duration');
      setSelectedOption(null);
    }
  };

  // Обработчик для кнопки "Продолжить"
  const handleContinue = () => {
    if (currentStep === 'bodyType' && quizState.bodyType) {
      setCurrentStep('difficulty');
      setSelectedOption(null);
    } else if (currentStep === 'difficulty' && quizState.difficulty) {
      setCurrentStep('duration');
      setSelectedOption(null);
    } else if (currentStep === 'duration' && quizState.duration) {
      setCurrentStep('goal');
      setSelectedOption(null);
    } else if (currentStep === 'goal' && quizState.goal) {
      // Переходим к результатам
      router.push('/quiz/results');
    }
  };

  // Обработчики выбора опций
  const handleBodyTypeSelect = (type: 'yoga' | 'posture') => {
    setQuizState({...quizState, bodyType: type});
    setSelectedOption(type);
  };

  const handleDifficultySelect = (level: 'beginner' | 'intermediate' | 'advanced') => {
    setQuizState({...quizState, difficulty: level});
    setSelectedOption(level);
  };

  const handleDurationSelect = (time: 'short' | 'medium' | 'long') => {
    setQuizState({...quizState, duration: time});
    setSelectedOption(time);
  };

  const handleGoalSelect = (goal: 'relax' | 'flexibility' | 'strength' | 'balance') => {
    setQuizState({...quizState, goal: goal});
    setSelectedOption(goal);
  };

  // Определяем заголовок и содержимое на основе текущего шага
  let stepTitle = '';
  let stepContent = null;

  if (currentStep === 'bodyType') {
    stepTitle = 'Тип практики';
    stepContent = (
      <>
        <QuizCard 
          title="Йога"
          description="Последовательности асан для развития тела"
          onClick={() => handleBodyTypeSelect('yoga')}
          selected={quizState.bodyType === 'yoga'}
        />
        <QuizCard 
          title="Осанка и позвоночник"
          description="Упражнения для улучшения осанки"
          onClick={() => handleBodyTypeSelect('posture')}
          selected={quizState.bodyType === 'posture'}
        />
      </>
    );
  } else if (currentStep === 'difficulty') {
    stepTitle = 'Уровень сложности';
    stepContent = (
      <>
        <QuizCard 
          title="Начинающий"
          description="Подходит для всех уровней"
          onClick={() => handleDifficultySelect('beginner')}
          selected={quizState.difficulty === 'beginner'}
        />
        <QuizCard 
          title="Средний"
          description="Требуется некоторый опыт"
          onClick={() => handleDifficultySelect('intermediate')}
          selected={quizState.difficulty === 'intermediate'}
        />
        <QuizCard 
          title="Продвинутый"
          description="Для опытных практикующих"
          onClick={() => handleDifficultySelect('advanced')}
          selected={quizState.difficulty === 'advanced'}
        />
      </>
    );
  } else if (currentStep === 'duration') {
    stepTitle = 'Длительность';
    stepContent = (
      <>
        <QuizCard 
          title="Короткая (10-15 мин)"
          onClick={() => handleDurationSelect('short')}
          selected={quizState.duration === 'short'}
        />
        <QuizCard 
          title="Средняя (20-30 мин)"
          onClick={() => handleDurationSelect('medium')}
          selected={quizState.duration === 'medium'}
        />
        <QuizCard 
          title="Длинная (40-60 мин)"
          onClick={() => handleDurationSelect('long')}
          selected={quizState.duration === 'long'}
        />
      </>
    );
  } else if (currentStep === 'goal') {
    stepTitle = 'Цель практики';
    stepContent = (
      <>
        <QuizCard 
          title="Расслабление"
          onClick={() => handleGoalSelect('relax')}
          selected={quizState.goal === 'relax'}
        />
        <QuizCard 
          title="Гибкость"
          onClick={() => handleGoalSelect('flexibility')}
          selected={quizState.goal === 'flexibility'}
        />
        <QuizCard 
          title="Сила"
          onClick={() => handleGoalSelect('strength')}
          selected={quizState.goal === 'strength'}
        />
        <QuizCard 
          title="Баланс"
          onClick={() => handleGoalSelect('balance')}
          selected={quizState.goal === 'balance'}
        />
      </>
    );
  }

  // Определяем доступность кнопки "Продолжить" в зависимости от текущего шага
  const isContinueDisabled = 
    (currentStep === 'bodyType' && !quizState.bodyType) ||
    (currentStep === 'difficulty' && !quizState.difficulty) ||
    (currentStep === 'duration' && !quizState.duration) ||
    (currentStep === 'goal' && !quizState.goal);

  return (
    <QuizLayout 
      title={stepTitle}
      onBackClick={handleBack}
      onContinueClick={handleContinue}
      showContinueButton={true}
      continueDisabled={isContinueDisabled}
      autoAdvance={true}
      selectedOption={selectedOption}
    >
      {stepContent}
    </QuizLayout>
  );
} 