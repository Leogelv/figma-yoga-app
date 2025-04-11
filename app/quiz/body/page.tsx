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
    goal: null
  });
  
  // Текущий шаг квиза
  const [currentStep, setCurrentStep] = useState<BodyQuizStep>('bodyType');
  // Выбранное значение для текущего шага
  const [currentSelection, setCurrentSelection] = useState<string | null>(null);

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
      telegram.BackButton.onClick(() => {
        handleBack();
      });
    }
  }, []);

  // Обновление текущего выбора при смене шага
  useEffect(() => {
    switch (currentStep) {
      case 'bodyType':
        setCurrentSelection(quizState.bodyType);
        break;
      case 'difficulty':
        setCurrentSelection(quizState.difficulty);
        break;
      case 'duration':
        setCurrentSelection(quizState.duration);
        break;
      case 'goal':
        setCurrentSelection(quizState.goal);
        break;
    }
  }, [currentStep, quizState]);

  // Обработчик выбора типа телесной практики
  const handleSelectBodyType = (bodyType: 'yoga' | 'posture') => {
    setQuizState(prev => ({ ...prev, bodyType }));
    setCurrentSelection(bodyType);
  };

  // Обработчик выбора сложности
  const handleSelectDifficulty = (difficulty: 'beginner' | 'intermediate' | 'advanced') => {
    setQuizState(prev => ({ ...prev, difficulty }));
    setCurrentSelection(difficulty);
  };

  // Обработчик выбора длительности
  const handleSelectDuration = (duration: 'short' | 'medium' | 'long') => {
    setQuizState(prev => ({ ...prev, duration }));
    setCurrentSelection(duration);
  };

  // Обработчик выбора цели
  const handleSelectGoal = (goal: 'relax' | 'flexibility' | 'strength' | 'balance') => {
    setQuizState(prev => ({ ...prev, goal }));
    setCurrentSelection(goal);
  };

  // Обработчик нажатия кнопки "Продолжить"
  const handleNext = () => {
    const steps: BodyQuizStep[] = ['bodyType', 'difficulty', 'duration', 'goal'];
    const currentIndex = steps.indexOf(currentStep);
    
    // Если это последний шаг, переходим к результатам
    if (currentIndex === steps.length - 1) {
      // Сохраняем состояние квиза в localStorage или sessionStorage
      sessionStorage.setItem('bodyQuizState', JSON.stringify(quizState));
      router.push('/quiz/results');
    } else {
      // Иначе переходим к следующему шагу
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  // Обработчик нажатия кнопки "Назад"
  const handleBack = () => {
    const steps: BodyQuizStep[] = ['bodyType', 'difficulty', 'duration', 'goal'];
    const currentIndex = steps.indexOf(currentStep);
    
    // Если это первый шаг, возвращаемся на страницу выбора типа практики
    if (currentIndex === 0) {
      router.push('/quiz');
    } else {
      // Иначе возвращаемся к предыдущему шагу
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  // Проверяем, выбран ли текущий шаг
  const isCurrentStepSelected = () => {
    switch (currentStep) {
      case 'bodyType':
        return quizState.bodyType !== null;
      case 'difficulty':
        return quizState.difficulty !== null;
      case 'duration':
        return quizState.duration !== null;
      case 'goal':
        return quizState.goal !== null;
      default:
        return false;
    }
  };

  // Рендерим содержимое в зависимости от текущего шага
  const renderStepContent = () => {
    switch (currentStep) {
      case 'bodyType':
        return (
          <>
            <QuizCard
              title="Йога"
              description="Асаны йоги для тела и ума"
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.5714 15.0036C15.8807 15.0036 16.9464 13.938 16.9464 12.6286C16.9464 11.3193 15.8807 10.2536 14.5714 10.2536C13.2621 10.2536 12.1964 11.3193 12.1964 12.6286C12.1964 13.938 13.2621 15.0036 14.5714 15.0036Z" stroke="#337FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9.42857 22.5036C10.7379 22.5036 11.8036 21.438 11.8036 20.1286C11.8036 18.8193 10.7379 17.7536 9.42857 17.7536C8.11929 17.7536 7.05357 18.8193 7.05357 20.1286C7.05357 21.438 8.11929 22.5036 9.42857 22.5036Z" stroke="#337FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14.5714 6.25357C15.8807 6.25357 16.9464 5.18786 16.9464 3.87857C16.9464 2.56929 15.8807 1.50357 14.5714 1.50357C13.2621 1.50357 12.1964 2.56929 12.1964 3.87857C12.1964 5.18786 13.2621 6.25357 14.5714 6.25357Z" stroke="#337FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14.5714 10.2536V6.25357" stroke="#337FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M11.3839 16.9214L12.6089 15.6964" stroke="#337FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9.42857 17.7536V13.6821" stroke="#337FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              }
              onClick={() => handleSelectBodyType('yoga')}
              selected={quizState.bodyType === 'yoga'}
            />
            
            <QuizCard
              title="Осанка"
              description="Упражнения для правильной осанки"
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 3V4M12 4V5M12 4H7M17 4H16" stroke="#337FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7 4.5V11.9835C7 12.7507 7.34495 13.4736 7.93552 13.9418L11.454 16.8251C11.7815 17.0992 12.2185 17.0992 12.546 16.8251L16.0645 13.9418C16.655 13.4736 17 12.7507 17 11.9835V4.5" stroke="#337FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 17L12 22" stroke="#337FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 20L9 22" stroke="#337FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15 20L15 22" stroke="#337FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              }
              onClick={() => handleSelectBodyType('posture')}
              selected={quizState.bodyType === 'posture'}
            />
          </>
        );
      case 'difficulty':
        return (
          <>
            <QuizCard
              title="Начинающий"
              description="Базовые упражнения для новичков"
              onClick={() => handleSelectDifficulty('beginner')}
              selected={quizState.difficulty === 'beginner'}
            />
            
            <QuizCard
              title="Средний"
              description="Для тех, кто уже знаком с практикой"
              onClick={() => handleSelectDifficulty('intermediate')}
              selected={quizState.difficulty === 'intermediate'}
            />
            
            <QuizCard
              title="Продвинутый"
              description="Сложные упражнения для опытных практиков"
              onClick={() => handleSelectDifficulty('advanced')}
              selected={quizState.difficulty === 'advanced'}
            />
          </>
        );
      case 'duration':
        return (
          <>
            <QuizCard
              title="5-15 минут"
              description="Короткая, но эффективная практика"
              onClick={() => handleSelectDuration('short')}
              selected={quizState.duration === 'short'}
            />
            
            <QuizCard
              title="15-30 минут"
              description="Оптимальное время для практики"
              onClick={() => handleSelectDuration('medium')}
              selected={quizState.duration === 'medium'}
            />
            
            <QuizCard
              title="Более 30 минут"
              description="Полноценная практика для глубокой проработки"
              onClick={() => handleSelectDuration('long')}
              selected={quizState.duration === 'long'}
            />
          </>
        );
      case 'goal':
        return (
          <>
            <QuizCard
              title="Снятие напряжения"
              description="Для расслабления и снятия стресса"
              onClick={() => handleSelectGoal('relax')}
              selected={quizState.goal === 'relax'}
            />
            
            <QuizCard
              title="Улучшение гибкости"
              description="Для увеличения подвижности суставов"
              onClick={() => handleSelectGoal('flexibility')}
              selected={quizState.goal === 'flexibility'}
            />
            
            <QuizCard
              title="Укрепление"
              description="Для силы и выносливости"
              onClick={() => handleSelectGoal('strength')}
              selected={quizState.goal === 'strength'}
            />
            
            <QuizCard
              title="Баланс"
              description="Для координации и стабильности"
              onClick={() => handleSelectGoal('balance')}
              selected={quizState.goal === 'balance'}
            />
          </>
        );
      default:
        return null;
    }
  };

  // Определяем заголовок и подзаголовок в зависимости от текущего шага
  const getStepTitle = () => {
    switch (currentStep) {
      case 'bodyType':
        return {
          title: "Выберите тип практики",
          subtitle: "Какой тип практики вас интересует?"
        };
      case 'difficulty':
        return {
          title: "Уровень сложности",
          subtitle: "Выберите подходящий уровень"
        };
      case 'duration':
        return {
          title: "Длительность",
          subtitle: "Сколько времени у вас есть?"
        };
      case 'goal':
        return {
          title: "Цель практики",
          subtitle: "Чего вы хотите достичь?"
        };
      default:
        return {
          title: "",
          subtitle: ""
        };
    }
  };

  const { title, subtitle } = getStepTitle();

  return (
    <QuizLayout
      title={title}
      subtitle={subtitle}
      onNext={handleNext}
      onBack={handleBack}
      nextDisabled={!isCurrentStepSelected()}
      autoAdvance={true}
      selectedOption={currentSelection}
    >
      {renderStepContent()}
    </QuizLayout>
  );
} 