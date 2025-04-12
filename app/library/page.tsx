"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Practice, loadPractices, getPractices } from '../../data/practices';
import PracticeCard from '../../components/PracticeCard';

export default function LibraryPage() {
  const router = useRouter();
  const [tg, setTg] = useState<any>(null);
  const [practices, setPractices] = useState<Practice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<'all' | 'body' | 'meditation' | 'breathing'>('all');

  useEffect(() => {
    // Инициализация Telegram Mini App
    const telegram = window.Telegram?.WebApp;
    if (telegram) {
      telegram.ready();
      setTg(telegram);
      
      // Настраиваем цвет верхней панели
      telegram.setHeaderColor('#FFFFFF');
      
      // Показываем кнопку назад
      telegram.BackButton.hide();
    }

    // Загружаем практики из API
    const fetchPractices = async () => {
      try {
        await loadPractices();
        const allPractices = getPractices();
        setPractices(allPractices);
      } catch (error) {
        console.error('Ошибка при загрузке практик:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPractices();
  }, []);

  const handlePracticeClick = (practice: Practice) => {
    // Перенаправляем на страницу практики с ее ID
    router.push(`/practice/${practice.id}`);
  };

  const filteredPractices = practices.filter(practice => {
    if (activeFilter === 'all') return true;
    return practice.practiceType === activeFilter;
  });

  const renderFilterButton = (type: 'all' | 'body' | 'meditation' | 'breathing', label: string) => {
    const isActive = activeFilter === type;
    return (
      <button
        onClick={() => setActiveFilter(type)}
        style={{
          padding: '8px 16px',
          borderRadius: '16px',
          background: isActive ? '#337FFF' : '#F1F1F1',
          color: isActive ? '#FFFFFF' : '#242424',
          border: 'none',
          fontFamily: 'Montserrat',
          fontWeight: 500,
          fontSize: '14px',
          cursor: 'pointer',
          marginRight: '8px',
          transition: 'all 0.2s ease'
        }}
      >
        {label}
      </button>
    );
  };

  return (
    <main style={{ 
      width: '100%',
      maxWidth: '375px', 
      margin: '0 auto',
      minHeight: '100vh',
      backgroundColor: '#FFFFFF',
      fontFamily: "'Inter', 'Montserrat', sans-serif",
      paddingBottom: '80px' // Для Tab Bar
    }}>
      {/* Header */}
      <header style={{ 
        padding: '16px',
        zIndex: 5,
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
          Библиотека практик
        </h1>
        <p style={{
          fontFamily: 'Inter',
          fontWeight: 400,
          fontSize: '16px',
          color: 'rgba(36, 36, 36, 0.7)',
          margin: 0
        }}>
          Выберите практику для выполнения
        </p>
      </header>

      {/* Filters */}
      <div style={{ 
        padding: '0 16px', 
        marginBottom: '16px',
        overflowX: 'auto',
        whiteSpace: 'nowrap',
        WebkitOverflowScrolling: 'touch',
        msOverflowStyle: '-ms-autohiding-scrollbar',
        paddingBottom: '8px'
      }}>
        {renderFilterButton('all', 'Все')}
        {renderFilterButton('body', 'Телесные')}
        {renderFilterButton('meditation', 'Медитации')}
        {renderFilterButton('breathing', 'Дыхательные')}
      </div>

      {/* Practice List */}
      <div style={{ padding: '0 16px' }}>
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <p>Загрузка практик...</p>
          </div>
        ) : (
          <>
            {filteredPractices.length > 0 ? (
              filteredPractices.map((practice) => (
                <PracticeCard
                  key={practice.id}
                  practice={practice}
                  onClick={handlePracticeClick}
                />
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <p>Практики не найдены</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Tab Bar */}
      <div style={{ 
        position: 'fixed', 
        bottom: 0, 
        width: '100%',
        maxWidth: '375px',
        borderTop: '1px solid #F5F5F5',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '8px 0',
        background: '#FFFFFF',
        zIndex: 10
      }}>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          width: '25%',
          cursor: 'pointer'
        }}
        onClick={() => router.push('/')}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="#8C8C8C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 22V12H15V22" stroke="#8C8C8C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={{ 
            fontFamily: 'Inter', 
            fontWeight: 400, 
            fontSize: '12px',
            color: '#8C8C8C'
          }}>Главная</span>
        </div>
        
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          width: '25%'
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 5C10 4.46957 10.2107 3.96086 10.5858 3.58579C10.9609 3.21071 11.4696 3 12 3C12.5304 3 13.0391 3.21071 13.4142 3.58579C13.7893 3.96086 14 4.46957 14 5C15.1484 5.54303 16.1274 6.38833 16.8321 7.4453C17.5367 8.50227 17.9404 9.73107 18 11V14C18.0753 14.6217 18.2954 15.2171 18.6428 15.7381C18.9902 16.2592 19.4551 16.6914 20 17H4C4.54494 16.6914 5.00981 16.2592 5.35719 15.7381C5.70457 15.2171 5.92475 14.6217 6 14V11C6.05956 9.73107 6.4633 8.50227 7.16795 7.4453C7.8726 6.38833 8.85159 5.54303 10 5" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 17V18C9 18.7956 9.31607 19.5587 9.87868 20.1213C10.4413 20.6839 11.2044 21 12 21C12.7956 21 13.5587 20.6839 14.1213 20.1213C14.6839 19.5587 15 18.7956 15 18V17" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={{ 
            fontFamily: 'Inter', 
            fontWeight: 500, 
            fontSize: '12px',
            color: '#000000'
          }}>Библиотека</span>
        </div>
        
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          width: '25%',
          cursor: 'pointer'
        }}
        onClick={() => router.push('/schedule')}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="4" width="18" height="18" rx="2" stroke="#8C8C8C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 2V6" stroke="#8C8C8C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 2V6" stroke="#8C8C8C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3 10H21" stroke="#8C8C8C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={{ 
            fontFamily: 'Inter', 
            fontWeight: 400, 
            fontSize: '12px',
            color: '#8C8C8C'
          }}>Расписание</span>
        </div>
        
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          width: '25%',
          cursor: 'pointer'
        }}
        onClick={() => router.push('/profile')}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 15C15.3137 15 18 12.3137 18 9C18 5.68629 15.3137 3 12 3C8.68629 3 6 5.68629 6 9C6 12.3137 8.68629 15 12 15Z" stroke="#8C8C8C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2.90625 20.2499C3.82775 18.6534 5.15328 17.3277 6.74958 16.406C8.34588 15.4843 10.1567 14.999 12 14.999C13.8433 14.999 15.6541 15.4843 17.2504 16.406C18.8467 17.3277 20.1722 18.6534 21.0938 20.2499" stroke="#8C8C8C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={{ 
            fontFamily: 'Inter', 
            fontWeight: 400, 
            fontSize: '12px',
            color: '#8C8C8C'
          }}>Профиль</span>
        </div>
      </div>

      {/* Home Indicator */}
      <div style={{ 
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '134px',
        height: '5px',
        borderRadius: '100px',
        background: '#242424',
        margin: '4px 0',
        zIndex: 11
      }}></div>
    </main>
  );
} 