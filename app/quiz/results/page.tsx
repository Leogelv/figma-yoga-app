"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PracticeCard from '../../../components/PracticeCard';
import QuizButton from '../../../components/QuizButton';
import AnimatedBackground from '../../../components/AnimatedBackground';
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
        router.push('/quiz/body');
      });
    }

    // Имитация загрузки данных
    setTimeout(() => {
      // Фильтруем практики на основе параметров
      const filtered = filterPractices({
        practiceType: 'body',
        duration: [15, 30],
        goals: ['расслабление', 'гибкость']
      });
      setFilteredPractices(filtered);
      setIsLoading(false);
    }, 1000);
  }, [router]);

  const handleSelectPractice = (practice: Practice) => {
    // В реальном приложении здесь был бы переход к практике
    router.push(`/practice/${practice.id}`);
  };

  const handleBack = () => {
    router.push('/quiz/body');
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      maxWidth: '375px',
      margin: '0 auto',
      backgroundColor: '#FFFFFF',
      position: 'relative'
    }}>
      {/* Анимированный фон с кругами */}
      <AnimatedBackground opacity={0.15} showHumanIcon={false} gradientColors="#73C570, #05DD49" />

      {/* Заголовок */}
      <div style={{
        padding: '24px 16px 16px 16px',
        zIndex: 2,
        position: 'relative'
      }}>
        <h1 style={{
          fontFamily: 'Montserrat',
          fontWeight: 600,
          fontSize: '24px',
          color: '#242424',
          margin: 0,
          marginBottom: '8px'
        }}>
          Ваши практики
        </h1>
      </div>

      {/* Список практик */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '0 16px 24px 16px',
        zIndex: 2,
        position: 'relative'
      }}>
        {isLoading ? (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '200px'
          }}>
            <div 
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                border: '3px solid #F1F1F1',
                borderTopColor: '#337FFF',
                animation: 'spin 1s linear infinite',
              }}
            />
            <style jsx>{`
              @keyframes spin {
                to {
                  transform: rotate(360deg);
                }
              }
            `}</style>
          </div>
        ) : (
          <>
            {filteredPractices.length > 0 ? (
              filteredPractices.map((practice) => (
                <PracticeCard
                  key={practice.id}
                  practice={practice}
                  onClick={handleSelectPractice}
                />
              ))
            ) : (
              <div style={{
                textAlign: 'center',
                padding: '32px 0'
              }}>
                <p style={{
                  fontFamily: 'Inter',
                  fontSize: '16px',
                  color: '#8C8C8C'
                }}>
                  Пока нет подходящих практик
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Нижняя панель с кнопками */}
      <div style={{
        padding: '16px',
        borderTop: '1px solid #F5F5F5',
        zIndex: 3,
        position: 'relative',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(5px)'
      }}>
        <QuizButton 
          text="Изменить параметры" 
          onClick={handleBack} 
          primary={false}
        />
      </div>
    </div>
  );
} 