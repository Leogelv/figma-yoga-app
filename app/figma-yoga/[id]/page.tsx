"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FigmaPractice, figmaPractices } from '../../../data/figma-practices';
import QuizButton from '../../../components/QuizButton';

export default function FigmaPracticeDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [tg, setTg] = useState<any>(null);
  const [practice, setPractice] = useState<FigmaPractice | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Имитация простого плеера
  const [isPlaying, setIsPlaying] = useState(false);

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
        router.push('/figma-yoga');
      });
    }

    // Загрузка данных о практике
    const foundPractice = figmaPractices.find(p => p.id === params.id);
    
    // Имитация задержки загрузки
    setTimeout(() => {
      setPractice(foundPractice || null);
      setIsLoading(false);
    }, 600);
  }, [router, params.id]);

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleBack = () => {
    router.push('/figma-yoga');
  };

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

  // Если практика не найдена
  if (!practice) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '24px',
        backgroundColor: '#FFFFFF',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontFamily: 'Montserrat',
          fontWeight: 600,
          fontSize: '24px',
          color: '#242424',
          marginBottom: '16px'
        }}>
          Практика не найдена
        </h1>
        <p style={{
          fontFamily: 'Inter',
          fontSize: '16px',
          color: '#8C8C8C',
          marginBottom: '24px'
        }}>
          Запрошенная практика не существует или была удалена
        </p>
        <QuizButton 
          text="Вернуться к списку" 
          onClick={handleBack} 
          primary={true}
        />
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      maxWidth: '480px',
      margin: '0 auto',
      backgroundColor: '#FFFFFF'
    }}>
      {/* Изображение практики */}
      <div style={{ position: 'relative', width: '100%', height: '280px' }}>
        <Image 
          src={practice.figmaImageUrl} 
          alt={practice.title} 
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          style={{ objectFit: 'cover' }}
        />
      </div>

      {/* Информация о практике */}
      <div style={{ padding: '24px 20px', flex: 1 }}>
        <h1 style={{
          fontFamily: 'Montserrat',
          fontWeight: 700,
          fontSize: '26px',
          color: '#141414',
          margin: 0,
          marginBottom: '16px'
        }}>
          {practice.title}
        </h1>

        <div style={{ 
          display: 'flex',
          gap: '12px',
          marginBottom: '20px',
          flexWrap: 'wrap'
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            background: '#F7F7F7',
            borderRadius: '100px',
            padding: '8px 14px'
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '6px' }}>
              <path d="M8.00004 4.00008V8.00008L10.6667 9.33342M14.6667 8.00008C14.6667 11.6819 11.6819 14.6667 8.00004 14.6667C4.31814 14.6667 1.33337 11.6819 1.33337 8.00008C1.33337 4.31818 4.31814 1.33341 8.00004 1.33341C11.6819 1.33341 14.6667 4.31818 14.6667 8.00008Z" stroke="#444444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={{ 
              fontFamily: 'Inter', 
              fontWeight: 500, 
              fontSize: '14px',
              color: '#444444'
            }}>
              {practice.duration} мин
            </span>
          </div>

          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            background: '#F0F7FF',
            borderRadius: '100px',
            padding: '8px 14px'
          }}>
            <span style={{ 
              fontFamily: 'Inter', 
              fontWeight: 500, 
              fontSize: '14px',
              color: '#337FFF'
            }}>
              {practice.difficulty === 'beginner' && 'Начинающий'}
              {practice.difficulty === 'intermediate' && 'Средний'}
              {practice.difficulty === 'advanced' && 'Продвинутый'}
            </span>
          </div>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            background: '#F7F7F7',
            borderRadius: '100px',
            padding: '8px 14px'
          }}>
            <span style={{ 
              fontFamily: 'Inter', 
              fontWeight: 500, 
              fontSize: '14px',
              color: '#444444'
            }}>
              {practice.practiceType === 'body' && 'Телесная практика'}
              {practice.practiceType === 'meditation' && 'Медитация'}
              {practice.practiceType === 'breathing' && 'Дыхательная практика'}
            </span>
          </div>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <h2 style={{
            fontFamily: 'Montserrat',
            fontWeight: 600,
            fontSize: '18px',
            color: '#242424',
            marginBottom: '10px'
          }}>
            Описание
          </h2>
          <p style={{ 
            fontFamily: 'Inter', 
            fontWeight: 400, 
            fontSize: '16px',
            color: '#444444',
            marginBottom: '20px',
            lineHeight: '1.6'
          }}>
            {practice.description}
          </p>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <h2 style={{
            fontFamily: 'Montserrat',
            fontWeight: 600,
            fontSize: '18px',
            color: '#242424',
            marginBottom: '12px'
          }}>
            Цели практики
          </h2>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {practice.goals.map((goal, index) => (
              <span 
                key={index}
                style={{ 
                  background: '#F5F5F5',
                  borderRadius: '100px',
                  padding: '8px 14px',
                  fontFamily: 'Inter', 
                  fontWeight: 400, 
                  fontSize: '14px',
                  color: '#444444'
                }}
              >
                {goal}
              </span>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <h2 style={{
            fontFamily: 'Montserrat',
            fontWeight: 600,
            fontSize: '18px',
            color: '#242424',
            marginBottom: '8px'
          }}>
            Инструктор
          </h2>
          <p style={{ 
            fontFamily: 'Inter', 
            fontWeight: 500, 
            fontSize: '16px',
            color: '#242424',
            margin: 0
          }}>
            {practice.instructor}
          </p>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <h2 style={{
            fontFamily: 'Montserrat',
            fontWeight: 600,
            fontSize: '18px',
            color: '#242424',
            marginBottom: '8px'
          }}>
            Теги
          </h2>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {practice.tags.map((tag, index) => (
              <span 
                key={index}
                style={{ 
                  background: '#F5F5F5',
                  borderRadius: '100px',
                  padding: '6px 12px',
                  fontFamily: 'Inter', 
                  fontWeight: 400, 
                  fontSize: '14px',
                  color: '#666666'
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Нижняя панель с кнопкой плеера */}
      <div style={{
        padding: '16px',
        borderTop: '1px solid #F5F5F5',
        backgroundColor: '#FFFFFF',
      }}>
        <QuizButton 
          text={isPlaying ? "Пауза" : "Начать практику"} 
          onClick={handlePlay} 
          primary={true} 
        />
      </div>
    </div>
  );
} 