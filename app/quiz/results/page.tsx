"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
// import PracticeCard from '../../../components/PracticeCard';
import QuizButton from '@/components/quiz/QuizButton';
// import { Practice, filterPractices } from '../../../data/practices';
import { useSearchParams } from 'next/navigation';

// Временно определим тип Practice
interface Practice {
  id: string;
  name: string;
  type: string;
  // другие поля
}

export default function ResultsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tg, setTg] = useState<any>(null);
  const [filteredPractices, setFilteredPractices] = useState<Practice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPractice, setSelectedPractice] = useState<Practice | null>(null);

  useEffect(() => {
    // Инициализация Telegram Mini App
    const telegram = (window as any).Telegram?.WebApp;
    if (telegram) {
      telegram.ready();
      setTg(telegram);
      
      // Настраиваем цвет верхней панели
      telegram.setHeaderColor('#FFFFFF');
      
      // Показываем кнопку "Назад" в хедере
      telegram.BackButton.show();
      telegram.BackButton.onClick(() => {
        router.back();
      });
    }

    // Получаем параметры из URL
    const practiceType = searchParams.get('type') as 'body' | 'meditation' | 'breathing' | undefined;
    const bodyType = searchParams.get('bodyType') as 'yoga' | 'posture' | undefined;
    const difficulty = searchParams.get('difficulty') as 'beginner' | 'intermediate' | 'advanced' | undefined;
    const duration = searchParams.get('duration');
    const goal = searchParams.get('goal');
    const meditationType = searchParams.get('meditationType') as 'relaxation' | 'concentration' | 'sleep' | 'emotions' | undefined;
    const breathingIntensity = searchParams.get('breathingIntensity') as 'mild' | 'medium' | 'intense' | undefined;

    // Формируем объект с фильтрами
    const filters: any = {};
    
    if (practiceType) filters.practiceType = practiceType;
    if (bodyType) filters.bodyType = bodyType;
    if (difficulty) filters.difficulty = difficulty;
    if (meditationType) filters.meditationType = meditationType;
    if (breathingIntensity) filters.breathingIntensity = breathingIntensity;
    
    // Обрабатываем длительность
    if (duration) {
      let durationRange: [number, number] = [0, 0];
      
      if (duration === 'short') {
        durationRange = [0, 15];
      } else if (duration === 'medium') {
        durationRange = [15, 30];
      } else if (duration === 'long') {
        durationRange = [30, 120];
      }
      
      if (durationRange[0] > 0 || durationRange[1] > 0) {
        filters.duration = durationRange;
      }
    }
    
    // Обрабатываем цель практики
    if (goal) {
      filters.goals = [goal];
    }
    
    console.log('Применяемые фильтры:', filters);
    
    // Временно заполняем пустым массивом вместо фильтрации
    // const practices = filterPractices(filters);
    setFilteredPractices([]);
    setIsLoading(false);
  }, [searchParams, router]);

  // Обработчик выбора практики
  const handleSelectPractice = (practice: Practice) => {
    setSelectedPractice(practice);
  };

  // Обработчик старта практики
  const handleStartPractice = () => {
    if (selectedPractice) {
      if (tg) {
        // Сохраняем выбранную практику в данных Telegram
        tg.CloudStorage.setItem('selectedPractice', JSON.stringify(selectedPractice), function(error: Error | null, stored: boolean) {
          if (stored) {
            console.log('Практика сохранена в Telegram CloudStorage');
          }
          if (error) {
            console.error('Ошибка при сохранении практики:', error);
          }
          
          // Переходим на страницу практики
          router.push(`/practice/${selectedPractice.id}`);
        });
      } else {
        // Если Telegram API не доступен, просто переходим на страницу практики
        router.push(`/practice/${selectedPractice.id}`);
      }
    }
  };

  // Вывод сообщения о том, что загружаем практики
  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '16px'
      }}>
        <div style={{ 
          width: '48px', 
          height: '48px', 
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #337FFF', 
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          marginBottom: '16px'
        }} />
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
        <p style={{ 
          fontFamily: 'Montserrat', 
          fontSize: '16px', 
          textAlign: 'center',
          color: '#666'
        }}>
          Подбираем подходящие практики...
        </p>
      </div>
    );
  }

  // Вывод сообщения, если не нашли подходящих практик
  if (filteredPractices.length === 0) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '16px'
      }}>
        <div style={{ 
          background: '#F5F5F5',
          borderRadius: '50%',
          width: '64px',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '16px',
          fontSize: '32px'
        }}>
          🔍
        </div>
        <h2 style={{ 
          fontFamily: 'Montserrat', 
          fontSize: '20px', 
          textAlign: 'center',
          margin: '0 0 8px 0'
        }}>
          Практики не найдены
        </h2>
        <p style={{ 
          fontFamily: 'Inter', 
          fontSize: '16px', 
          textAlign: 'center',
          color: '#666',
          marginBottom: '24px'
        }}>
          Попробуйте изменить параметры поиска
        </p>
        <button 
          onClick={() => router.push('/quiz')}
          className="px-6 py-3 bg-primary text-primary-foreground rounded-md"
        >
          Начать заново
        </button>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '16px',
      maxWidth: '800px',
      margin: '0 auto',
      minHeight: '100vh'
    }}>
      <h1 style={{ 
        fontFamily: 'Montserrat', 
        fontSize: '24px', 
        marginBottom: '8px',
        marginTop: '0'
      }}>
        Подходящие практики
      </h1>
      
      <p style={{ 
        fontFamily: 'Inter', 
        fontSize: '16px', 
        color: '#666',
        marginBottom: '24px'
      }}>
        Выберите практику, которая вам больше нравится
      </p>
      
      {/* Список найденных практик - временно закомментирован */}
      <div>
        {/*filteredPractices.map(practice => (
          <div 
            key={practice.id}
            onClick={() => handleSelectPractice(practice)}
            style={{ 
              marginBottom: '16px',
              border: selectedPractice?.id === practice.id ? '2px solid #337FFF' : 'none',
              borderRadius: '24px',
              overflow: 'hidden',
              transition: 'transform 0.2s ease-in-out'
            }}
          >
            <PracticeCard 
              practice={practice} 
              onClick={handleSelectPractice}
            />
          </div>
        ))*/}
      </div>
      
      {/* Кнопка выбора практики */}
      <div style={{ 
        position: 'sticky', 
        bottom: '16px',
        paddingTop: '16px',
        background: 'linear-gradient(to top, white 70%, transparent)'
      }}>
        <button
          onClick={handleStartPractice}
          disabled={!selectedPractice}
          className="w-full py-3 bg-primary text-primary-foreground rounded-md opacity-80"
        >
          Начать практику
        </button>
      </div>
    </div>
  );
} 