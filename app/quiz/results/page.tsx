"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PracticeCard from '../../../components/PracticeCard';
import QuizButton from '../../../components/QuizButton';
import { Practice, filterPractices } from '../../../data/practices';

export default function ResultsPage() {
  const router = useRouter();
  const [tg, setTg] = useState<any>(null);
  const [filteredPractices, setFilteredPractices] = useState<Practice[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
        router.back();
      });
    }

    // Получаем данные из sessionStorage
    const loadResults = () => {
      setIsLoading(true);
      
      try {
        // Проверяем наличие состояния для телесной практики
        const bodyQuizStateStr = sessionStorage.getItem('bodyQuizState');
        
        if (bodyQuizStateStr) {
          const bodyQuizState = JSON.parse(bodyQuizStateStr);
          
          // Преобразуем данные из квиза в параметры фильтрации
          const filters: any = {
            practiceType: 'body'
          };
          
          // Применяем фильтры в зависимости от типа телесной практики
          if (bodyQuizState.bodyType) {
            filters.bodyType = bodyQuizState.bodyType;
          }
          
          if (bodyQuizState.difficulty) {
            filters.difficulty = bodyQuizState.difficulty;
          }
          
          if (bodyQuizState.duration) {
            switch (bodyQuizState.duration) {
              case 'short':
                filters.duration = [5, 15];
                break;
              case 'medium':
                filters.duration = [15, 30];
                break;
              case 'long':
                filters.duration = [30, 999];
                break;
            }
          }
          
          if (bodyQuizState.goal) {
            switch (bodyQuizState.goal) {
              case 'relax':
                filters.goals = ['расслабление', 'снятие стресса'];
                break;
              case 'flexibility':
                filters.goals = ['гибкость'];
                break;
              case 'strength':
                filters.goals = ['сила', 'тонус мышц'];
                break;
              case 'balance':
                filters.goals = ['баланс', 'концентрация'];
                break;
            }
          }
          
          // Фильтруем практики
          const practices = filterPractices(filters);
          setFilteredPractices(practices);
        }
      } catch (error) {
        console.error('Ошибка при загрузке результатов:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadResults();
  }, [router]);

  const handleSelectPractice = (practice: Practice) => {
    // Здесь бы был переход к конкретной практике
    if (tg) {
      tg.showAlert(`Вы выбрали практику: ${practice.title}`);
    } else {
      alert(`Вы выбрали практику: ${practice.title}`);
    }
  };

  const handleBackToHome = () => {
    router.push('/');
  };

  const handleStartOver = () => {
    // Очищаем данные квиза
    sessionStorage.removeItem('bodyQuizState');
    router.push('/quiz');
  };

  return (
    <div style={{ padding: '16px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ 
          fontFamily: 'Montserrat', 
          fontWeight: 600, 
          fontSize: '24px',
          color: '#242424',
          margin: 0,
          marginBottom: '8px'
        }}>
          Рекомендуемые практики
        </h1>
        <p style={{ 
          fontFamily: 'Inter', 
          fontWeight: 400, 
          fontSize: '16px',
          color: '#8C8C8C',
          margin: 0
        }}>
          Выберите практику для начала
        </p>
      </div>
      
      {isLoading ? (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          height: '200px' 
        }}>
          <p>Загрузка...</p>
        </div>
      ) : filteredPractices.length > 0 ? (
        <div style={{ marginBottom: '24px' }}>
          {filteredPractices.map((practice) => (
            <PracticeCard 
              key={practice.id} 
              practice={practice} 
              onClick={handleSelectPractice} 
            />
          ))}
        </div>
      ) : (
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'center', 
          alignItems: 'center',
          height: '200px',
          textAlign: 'center',
          gap: '16px'
        }}>
          <p style={{ 
            fontFamily: 'Inter', 
            fontWeight: 400, 
            fontSize: '16px',
            color: '#8C8C8C'
          }}>
            Подходящих практик не найдено
          </p>
        </div>
      )}
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <QuizButton 
          text="На главную" 
          onClick={handleBackToHome} 
          primary={true}
        />
        
        <QuizButton 
          text="Начать заново" 
          onClick={handleStartOver} 
          primary={false}
        />
      </div>
    </div>
  );
} 