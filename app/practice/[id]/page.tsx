"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { getPractices, Practice } from '../../../data/practices';
import { getPracticeImageUrl } from '../../../utils/imageUtils';
import QuizButton from '../../../components/QuizButton';

export default function PracticePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [practice, setPractice] = useState<Practice | null>(null);
  const [tg, setTg] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

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

    // Загрузка данных о практике
    const loadPractice = async () => {
      try {
        // Пытаемся получить практику из CloudStorage
        if (telegram?.CloudStorage) {
          telegram.CloudStorage.getItem('selectedPractice', (error: Error | null, value: string | null) => {
            if (value) {
              try {
                const storedPractice = JSON.parse(value);
                if (storedPractice && storedPractice.id === params.id) {
                  setPractice(storedPractice);
                  setIsLoading(false);
                  return;
                }
              } catch (e) {
                console.error('Ошибка парсинга данных практики:', e);
              }
            }
            
            // Если не удалось получить из CloudStorage, загружаем из списка практик
            loadPracticeFromList();
          });
        } else {
          // Если CloudStorage недоступен, загружаем из списка практик
          loadPracticeFromList();
        }
      } catch (error) {
        console.error('Ошибка при загрузке практики:', error);
        loadPracticeFromList();
      }
    };

    // Загрузка практики из списка всех практик
    const loadPracticeFromList = () => {
      const practices = getPractices();
      const foundPractice = practices.find(p => p.id === params.id);
      setPractice(foundPractice || null);
      setIsLoading(false);
    };

    loadPractice();
  }, [params.id, router]);

  // Обработчик ошибки загрузки изображения
  const handleImageError = () => {
    setImageError(true);
  };

  // Начать практику
  const handleStartPractice = () => {
    if (!practice) return;
    
    // TODO: Здесь будет логика старта практики
    alert(`Практика ${practice.title} начата!`);
    
    // Закрыть Telegram Mini App при необходимости
    if (tg && tg.close) {
      // tg.close();
    }
  };

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
          Загружаем практику...
        </p>
      </div>
    );
  }

  if (!practice) {
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
          😢
        </div>
        <h2 style={{ 
          fontFamily: 'Montserrat', 
          fontSize: '20px', 
          textAlign: 'center',
          margin: '0 0 8px 0'
        }}>
          Практика не найдена
        </h2>
        <p style={{ 
          fontFamily: 'Inter', 
          fontSize: '16px', 
          textAlign: 'center',
          color: '#666',
          marginBottom: '24px'
        }}>
          Возможно, она была удалена или перемещена
        </p>
        <QuizButton 
          text="Вернуться к списку" 
          onClick={() => router.push('/quiz/results')}
        />
      </div>
    );
  }

  // Определение фактического URL изображения с использованием утилиты
  const imageUrl = imageError 
    ? getPracticeImageUrl(practice.id, practice.vimeoId, true)
    : practice.imageUrl;

  // Получение типа практики для отображения
  const getPracticeTypeText = () => {
    switch (practice.practiceType) {
      case 'body':
        return practice.bodyType === 'yoga' ? 'Йога' : 'Осанка';
      case 'meditation':
        return 'Медитация';
      case 'breathing':
        return 'Дыхательная практика';
      default:
        return 'Практика';
    }
  };

  // Форматирование длительности
  const formatDuration = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} минут`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 
      ? `${hours} ч ${remainingMinutes} мин` 
      : `${hours} часов`;
  };

  return (
    <div style={{ minHeight: '100vh', background: '#FFFFFF' }}>
      {/* Изображение практики */}
      <div style={{ position: 'relative', width: '100%', height: '240px' }}>
        <Image
          src={imageUrl}
          alt={practice.title}
          fill
          style={{ objectFit: 'cover' }}
          onError={handleImageError}
          priority
        />
        
        {/* Затемнение для лучшей читаемости текста */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '120px',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%)',
        }} />
        
        {/* Название практики */}
        <div style={{
          position: 'absolute',
          bottom: '16px',
          left: '16px',
          right: '16px',
        }}>
          <h1 style={{ 
            color: 'white', 
            margin: 0, 
            fontSize: '24px', 
            fontWeight: 600,
            textShadow: '0px 1px 2px rgba(0,0,0,0.3)'
          }}>
            {practice.title}
          </h1>
        </div>
      </div>
      
      {/* Информация о практике */}
      <div style={{ padding: '16px' }}>
        {/* Детали практики */}
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '8px',
          marginBottom: '24px'
        }}>
          {/* Тип практики */}
          <div style={{
            background: '#F5F5F5',
            borderRadius: '100px',
            padding: '6px 12px',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <span>
              {practice.practiceType === 'body' ? '🧘‍♀️' : practice.practiceType === 'meditation' ? '🧠' : '💨'}
            </span>
            <span>{getPracticeTypeText()}</span>
          </div>
          
          {/* Длительность */}
          <div style={{
            background: '#F5F5F5',
            borderRadius: '100px',
            padding: '6px 12px',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <span>⏱️</span>
            <span>{formatDuration(practice.duration)}</span>
          </div>
          
          {/* Сложность */}
          <div style={{
            background: '#F5F5F5',
            borderRadius: '100px',
            padding: '6px 12px',
            fontSize: '14px',
          }}>
            {practice.difficulty === 'beginner' ? '👶 Начальный' : 
             practice.difficulty === 'intermediate' ? '👌 Средний' :
             '💪 Продвинутый'}
          </div>
        </div>
        
        {/* Описание */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ 
            fontSize: '18px', 
            fontWeight: 600, 
            margin: '0 0 8px 0'
          }}>
            Описание
          </h2>
          <p style={{ 
            margin: 0, 
            fontSize: '16px', 
            lineHeight: 1.5,
            color: '#444444'
          }}>
            {practice.description}
          </p>
        </div>
        
        {/* Инструктор */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ 
            fontSize: '18px', 
            fontWeight: 600, 
            margin: '0 0 8px 0'
          }}>
            Инструктор
          </h2>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: '#F5F5F5',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '24px'
            }}>
              👨‍🏫
            </div>
            <div>
              <p style={{ 
                margin: '0 0 4px 0', 
                fontWeight: 500, 
                fontSize: '16px'
              }}>
                {practice.instructor}
              </p>
              <p style={{ 
                margin: 0, 
                fontSize: '14px', 
                color: '#666666'
              }}>
                Сертифицированный инструктор
              </p>
            </div>
          </div>
        </div>
        
        {/* Цели практики */}
        {practice.goals && practice.goals.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ 
              fontSize: '18px', 
              fontWeight: 600, 
              margin: '0 0 8px 0'
            }}>
              Цели практики
            </h2>
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: '8px'
            }}>
              {practice.goals.map((goal, index) => (
                <div 
                  key={index}
                  style={{
                    background: '#F5F5F5',
                    borderRadius: '100px',
                    padding: '6px 12px',
                    fontSize: '14px',
                  }}
                >
                  {goal}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Теги */}
        {practice.tags && practice.tags.length > 0 && (
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ 
              fontSize: '18px', 
              fontWeight: 600, 
              margin: '0 0 8px 0'
            }}>
              Теги
            </h2>
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: '8px'
            }}>
              {practice.tags.map((tag, index) => (
                <div 
                  key={index}
                  style={{
                    background: '#F5F5F5',
                    borderRadius: '100px',
                    padding: '6px 12px',
                    fontSize: '14px',
                    color: '#666666'
                  }}
                >
                  #{tag}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Кнопка начать практику */}
      <div style={{ 
        position: 'sticky', 
        bottom: 0, 
        padding: '16px',
        background: 'white',
        borderTop: '1px solid #F1F1F1'
      }}>
        <QuizButton 
          text="Начать практику" 
          onClick={handleStartPractice}
        />
      </div>
    </div>
  );
} 