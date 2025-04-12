"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import FigmaPracticeCard from '../../components/FigmaPracticeCard';
import { FigmaPractice, getFigmaPractices } from '../../data/figma-practices';

export default function FigmaYogaPage() {
  const router = useRouter();
  const [tg, setTg] = useState<any>(null);
  const [practices, setPractices] = useState<FigmaPractice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<'body' | 'meditation' | 'breathing' | 'all'>('all');

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
        router.push('/');
      });
    }

    // Загрузка Figma практик
    const loadPractices = () => {
      const allPractices = getFigmaPractices();
      setPractices(allPractices);
      setIsLoading(false);
    };

    // Имитация задержки загрузки
    setTimeout(() => {
      loadPractices();
    }, 500);
  }, [router]);

  const handlePracticeClick = (practice: FigmaPractice) => {
    // Переход на страницу с деталями практики
    router.push(`/figma-yoga/${practice.id}`);
  };

  const filteredPractices = practices.filter(practice => {
    if (activeFilter === 'all') return true;
    return practice.practiceType === activeFilter;
  });

  // Отображение загрузки
  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#FFFFFF'
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
    );
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: '#FCFCFC',
      padding: '16px',
      maxWidth: '480px',
      margin: '0 auto'
    }}>
      <h1 style={{ 
        fontFamily: 'Montserrat', 
        fontWeight: 700, 
        fontSize: '28px',
        color: '#141414',
        marginBottom: '24px',
        marginTop: '12px'
      }}>
        Figma Yoga
      </h1>

      {/* Фильтры */}
      <div style={{ 
        display: 'flex', 
        gap: '10px', 
        overflowX: 'auto',
        paddingBottom: '12px',
        marginBottom: '24px',
        WebkitOverflowScrolling: 'touch',
        msOverflowStyle: '-ms-autohiding-scrollbar',
      }}>
        <button 
          onClick={() => setActiveFilter('all')}
          style={{
            padding: '8px 16px',
            borderRadius: '16px',
            border: 'none',
            background: activeFilter === 'all' ? '#337FFF' : '#F5F5F5',
            color: activeFilter === 'all' ? 'white' : '#444444',
            fontFamily: 'Inter',
            fontWeight: 500,
            fontSize: '14px',
            whiteSpace: 'nowrap',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          Все практики
        </button>
        <button 
          onClick={() => setActiveFilter('body')}
          style={{
            padding: '8px 16px',
            borderRadius: '16px',
            border: 'none',
            background: activeFilter === 'body' ? '#337FFF' : '#F5F5F5',
            color: activeFilter === 'body' ? 'white' : '#444444',
            fontFamily: 'Inter',
            fontWeight: 500,
            fontSize: '14px',
            whiteSpace: 'nowrap',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          Телесные
        </button>
        <button 
          onClick={() => setActiveFilter('meditation')}
          style={{
            padding: '8px 16px',
            borderRadius: '16px',
            border: 'none',
            background: activeFilter === 'meditation' ? '#337FFF' : '#F5F5F5',
            color: activeFilter === 'meditation' ? 'white' : '#444444',
            fontFamily: 'Inter',
            fontWeight: 500,
            fontSize: '14px',
            whiteSpace: 'nowrap',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          Медитации
        </button>
        <button 
          onClick={() => setActiveFilter('breathing')}
          style={{
            padding: '8px 16px',
            borderRadius: '16px',
            border: 'none',
            background: activeFilter === 'breathing' ? '#337FFF' : '#F5F5F5',
            color: activeFilter === 'breathing' ? 'white' : '#444444',
            fontFamily: 'Inter',
            fontWeight: 500,
            fontSize: '14px',
            whiteSpace: 'nowrap',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          Дыхательные
        </button>
      </div>

      {/* Список практик */}
      <div style={{ flex: 1 }}>
        <h2 style={{ 
          fontFamily: 'Montserrat', 
          fontWeight: 600, 
          fontSize: '20px',
          color: '#242424',
          marginBottom: '16px'
        }}>
          {activeFilter === 'all' && 'Все практики'}
          {activeFilter === 'body' && 'Телесные практики'}
          {activeFilter === 'meditation' && 'Медитации'}
          {activeFilter === 'breathing' && 'Дыхательные практики'}
        </h2>

        {filteredPractices.length > 0 ? (
          filteredPractices.map((practice) => (
            <FigmaPracticeCard
              key={practice.id}
              practice={practice}
              onClick={handlePracticeClick}
            />
          ))
        ) : (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '48px 16px',
            textAlign: 'center'
          }}>
            <p style={{ 
              fontFamily: 'Inter', 
              fontWeight: 500, 
              fontSize: '16px',
              color: '#8C8C8C',
              marginBottom: '16px'
            }}>
              Практики не найдены
            </p>
            <button
              onClick={() => setActiveFilter('all')}
              style={{
                padding: '10px 20px',
                borderRadius: '24px',
                border: 'none',
                background: '#337FFF',
                color: 'white',
                fontFamily: 'Inter',
                fontWeight: 500,
                fontSize: '16px',
                cursor: 'pointer'
              }}
            >
              Показать все практики
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 