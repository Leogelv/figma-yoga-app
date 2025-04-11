"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import QuizButton from '../../../components/QuizButton';

export default function QuickPractice() {
  const router = useRouter();
  const [tg, setTg] = useState<any>(null);
  const [timer, setTimer] = useState<number>(7 * 60); // 7 минут в секундах
  const [isActive, setIsActive] = useState<boolean>(false);

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
  }, [router]);

  // Эффект для таймера
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    
    if (isActive && timer > 0) {
      interval = setInterval(() => {
        setTimer(timer => timer - 1);
      }, 1000);
    } else if (timer === 0) {
      // Практика завершена
      if (tg) {
        tg.showAlert('Практика завершена!');
      }
      setIsActive(false);
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, timer, tg]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handleStartPractice = () => {
    setIsActive(true);
  };

  const handlePausePractice = () => {
    setIsActive(false);
  };

  const handleStopPractice = () => {
    setIsActive(false);
    setTimer(7 * 60);
  };

  const handleFinishPractice = () => {
    if (tg) {
      tg.showAlert('Поздравляем! Вы успешно завершили практику.');
    }
    router.push('/');
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
          Быстрая практика
        </h1>
        
        <p style={{ 
          fontFamily: 'Inter', 
          fontWeight: 400, 
          fontSize: '16px',
          color: '#8C8C8C',
          margin: 0
        }}>
          7-минутная йога для бодрости
        </p>
      </div>
      
      <div style={{ 
        position: 'relative', 
        width: '100%', 
        height: '200px', 
        borderRadius: '16px',
        overflow: 'hidden',
        marginBottom: '24px'
      }}>
        <Image 
          src="/images/main_image.png" 
          alt="Yoga" 
          layout="fill"
          objectFit="cover"
        />
      </div>
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        flexDirection: 'column',
        marginBottom: '40px'
      }}>
        <div style={{ 
          width: '200px', 
          height: '200px', 
          borderRadius: '50%', 
          border: '8px solid #F5F5F5',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <span style={{ 
            fontFamily: 'Montserrat', 
            fontWeight: 700, 
            fontSize: '40px'
          }}>
            {formatTime(timer)}
          </span>
        </div>
        
        <p style={{ 
          fontFamily: 'Inter', 
          fontSize: '18px',
          textAlign: 'center',
          marginBottom: '8px'
        }}>
          {isActive ? 'Практика в процессе' : 'Готовы начать?'}
        </p>
        
        <p style={{ 
          fontFamily: 'Inter', 
          fontSize: '16px',
          color: '#8C8C8C',
          textAlign: 'center'
        }}>
          {isActive 
            ? 'Следуйте инструкциям на экране' 
            : 'Нажмите кнопку "Начать", чтобы приступить к практике'}
        </p>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {!isActive ? (
          <QuizButton 
            text="Начать практику" 
            onClick={handleStartPractice} 
            primary={true}
          />
        ) : (
          <QuizButton 
            text="Приостановить" 
            onClick={handlePausePractice} 
            primary={true}
          />
        )}
        
        {!isActive && timer < 7 * 60 && (
          <QuizButton 
            text="Продолжить" 
            onClick={handleStartPractice} 
            primary={true}
          />
        )}
        
        {timer < 7 * 60 && (
          <QuizButton 
            text="Сбросить таймер" 
            onClick={handleStopPractice} 
            primary={false}
          />
        )}
        
        <QuizButton 
          text="Завершить практику" 
          onClick={handleFinishPractice} 
          primary={false}
        />
      </div>
    </div>
  );
} 