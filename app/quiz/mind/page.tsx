"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function MindQuizPage() {
  const router = useRouter();
  const [tg, setTg] = useState<any>(null);
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
      telegram.BackButton.onClick(() => {
        router.push('/quiz');
      });
    }
  }, [router]);

  // Обработчик выбора опции
  const handleOptionSelect = (type: string) => {
    setSelectedOption(type);
    
    // Автоматический переход с параметрами
    setTimeout(() => {
      let params = new URLSearchParams();
      params.append('type', 'meditation'); // Для API используем meditation
      
      if (type === 'meditation') {
        params.append('meditationType', 'relaxation');
      } else if (type === 'breathing') {
        params.append('breathingIntensity', 'medium');
      }
      
      router.push(`/quiz/results?${params.toString()}`);
    }, 200);
  };

  return (
    <div style={{ 
      height: '100vh', 
      background: 'white',
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '500px',
      margin: '0 auto',
      position: 'relative'
    }}>
      {/* Верхняя кнопка "Назад" */}
      <div style={{ 
        padding: '16px', 
        display: 'flex', 
        alignItems: 'center'
      }}>
        <button
          onClick={() => router.push('/quiz')}
          style={{
            background: 'none',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            padding: '0',
            fontSize: '16px',
            color: '#000'
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={{ marginLeft: '8px' }}>Назад</span>
        </button>
      </div>
      
      {/* Радиальный градиент на фоне */}
      <div style={{
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        background: 'radial-gradient(circle at center, rgba(51, 127, 255, 0.1) 0%, rgba(51, 127, 255, 0) 70%)',
        zIndex: '0',
        pointerEvents: 'none'
      }} />
      
      {/* Контейнер для карточек опций */}
      <div style={{ 
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '20px',
        zIndex: '1'
      }}>
        {/* Медитация */}
        <div 
          onClick={() => handleOptionSelect('meditation')}
          style={{
            border: selectedOption === 'meditation' ? '3px solid #337FFF' : '1px solid #e0e0e0',
            borderRadius: '24px',
            padding: '24px',
            marginBottom: '16px',
            background: 'white',
            cursor: 'pointer',
            position: 'relative',
            transition: 'transform 0.2s, border-color 0.2s',
            transform: selectedOption === 'meditation' ? 'scale(0.98)' : 'scale(1)'
          }}
        >
          <h2 style={{
            fontSize: '20px',
            fontWeight: 600,
            margin: '0 0 8px 0'
          }}>
            Медитация
          </h2>
          <p style={{
            fontSize: '16px',
            color: '#666',
            margin: '0'
          }}>
            Расслабление, концентрация и осознанность
          </p>
          
          {selectedOption === 'meditation' && (
            <div style={{
              position: 'absolute',
              top: '24px',
              right: '24px',
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              background: '#337FFF',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white'
            }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5L6.5 10.5L4 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          )}
        </div>
        
        {/* Дыхательные практики */}
        <div 
          onClick={() => handleOptionSelect('breathing')}
          style={{
            border: selectedOption === 'breathing' ? '3px solid #337FFF' : '1px solid #e0e0e0',
            borderRadius: '24px',
            padding: '24px',
            background: 'white',
            cursor: 'pointer',
            position: 'relative',
            transition: 'transform 0.2s, border-color 0.2s',
            transform: selectedOption === 'breathing' ? 'scale(0.98)' : 'scale(1)'
          }}
        >
          <h2 style={{
            fontSize: '20px',
            fontWeight: 600,
            margin: '0 0 8px 0'
          }}>
            Дыхательные практики
          </h2>
          <p style={{
            fontSize: '16px',
            color: '#666',
            margin: '0'
          }}>
            Техники дыхания для энергии и расслабления
          </p>
          
          {selectedOption === 'breathing' && (
            <div style={{
              position: 'absolute',
              top: '24px',
              right: '24px',
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              background: '#337FFF',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white'
            }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5L6.5 10.5L4 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 