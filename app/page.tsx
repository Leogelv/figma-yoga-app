"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AnimatedCircles from '../components/AnimatedCircles';

export default function Home() {
  const router = useRouter();
  const [tg, setTg] = useState<any>(null);

  useEffect(() => {
    // Инициализация Telegram Mini App
    const telegram = window.Telegram?.WebApp;
    if (telegram) {
      telegram.ready();
      setTg(telegram);
      
      // Настраиваем цвет верхней панели
      telegram.setHeaderColor('#FFFFFF');
    }
  }, []);

  const handleQuickPractice = () => {
    router.push('/practice/quick');
  };

  const handleChoosePractice = () => {
    router.push('/quiz');
  };

  return (
    <main style={{ 
      width: '100%',
      maxWidth: '375px', 
      margin: '0 auto',
      position: 'relative',
      height: '100vh',
      backgroundColor: '#FFFFFF',
      overflow: 'hidden',
      fontFamily: "'Inter', 'Montserrat', sans-serif"
    }}>
      {/* Header */}
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        padding: '12px 16px',
        zIndex: 5,
        position: 'relative'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ 
            width: '32px', 
            height: '32px', 
            borderRadius: '50%',
            background: '#EEEEEE'
          }}></div>
          <span style={{ 
            fontFamily: 'Inter', 
            fontWeight: 500, 
            fontSize: '16px',
            color: '#000000'
          }}>Привет, Иван</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ 
            fontFamily: 'Inter', 
            fontWeight: 500, 
            fontSize: '16px',
            color: '#000000'
          }}>100</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#F1F1F1"/>
            <path d="M14.9459 9.75004H10.5C10.1022 9.75004 9.72064 9.59197 9.43934 9.31067C9.15804 9.02936 9 8.64783 9 8.25004C9 7.85225 9.15804 7.47072 9.43934 7.18941C9.72064 6.90811 10.1022 6.75004 10.5 6.75004H15.75C16.1642 6.75004 16.5 6.41428 16.5 6.00004C16.5 5.5858 16.1642 5.25004 15.75 5.25004H10.5C9.70435 5.25004 8.94129 5.56611 8.37868 6.12872C7.81607 6.69133 7.5 7.45439 7.5 8.25004C7.5 9.04569 7.81607 9.80875 8.37868 10.3714C8.94129 10.934 9.70435 11.25 10.5 11.25H14.9459C15.3444 11.25 15.7266 11.4084 16.0081 11.6902C16.2896 11.972 16.4476 12.3544 16.4473 12.753C16.447 13.1516 16.2884 13.5338 16.0066 13.8153C15.7248 14.0968 15.3424 14.2547 14.9438 14.2544H9C8.58579 14.2544 8.25 14.5902 8.25 15.0044C8.25 15.4187 8.58579 15.7544 9 15.7544H14.9459C15.7438 15.7537 16.5081 15.4359 17.071 14.8711C17.6338 14.3063 17.9489 13.541 17.9473 12.743C17.9458 11.945 17.628 11.1808 17.0632 10.6179C16.4984 10.055 15.7331 9.74 14.9351 9.74164L14.9459 9.75004Z" fill="#337FFF"/>
            <path d="M13.5 18C13.5 18.4142 13.1642 18.75 12.75 18.75H12C11.5858 18.75 11.25 18.4142 11.25 18C11.25 17.5858 11.5858 17.25 12 17.25H12.75C13.1642 17.25 13.5 17.5858 13.5 18Z" fill="#337FFF"/>
            <path d="M12.75 6.00004C12.75 6.41428 12.4142 6.75004 12 6.75004C11.5858 6.75004 11.25 6.41428 11.25 6.00004C11.25 5.5858 11.5858 5.25004 12 5.25004C12.4142 5.25004 12.75 5.5858 12.75 6.00004Z" fill="#337FFF"/>
          </svg>
        </div>
      </header>

      {/* Content */}
      <div style={{ 
        height: 'calc(100vh - 60px - 76px)', // 100vh - header - tabbar
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative'
      }}>
        {/* Анимированные круги и силуэт */}
        <AnimatedCircles gradientColors="#EE5A32, #FF8B6B" showHumanIcon={true} />

        {/* Прогресс блок */}
        <div style={{
          marginTop: 'auto',
          marginBottom: '0',
          background: '#F7F7F7',
          borderRadius: '24px 24px 0 0',
          padding: '20px 16px',
          width: '100%',
          zIndex: 3,
          position: 'relative'
        }}>
          <h3 style={{
            fontFamily: 'Montserrat',
            fontWeight: 600,
            fontSize: '18px',
            color: '#242424',
            margin: 0,
            marginBottom: '8px'
          }}>
            Твой прогресс
          </h3>
          <p style={{
            fontFamily: 'Inter',
            fontWeight: 400,
            fontSize: '14px',
            color: '#242424',
            margin: 0,
            marginBottom: '16px'
          }}>
            Всего часов практик: 20
          </p>
          
          {/* Дни недели */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '8px'
          }}>
            {['Пн', 'Вт', 'Ср', 'Чт', 'Пт'].map((day, index) => (
              <div key={index} style={{
                width: '20%',
                textAlign: 'center'
              }}>
                <span style={{
                  fontFamily: 'Montserrat',
                  fontWeight: 500,
                  fontSize: '14px',
                  color: 'rgba(0, 0, 0, 0.5)'
                }}>{day}</span>
              </div>
            ))}
          </div>
          
          {/* Кружочки прогресса */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '8px',
            marginBottom: '16px'
          }}>
            {[1, 2, 3, 4, 5].map((day, index) => (
              <div key={index} style={{
                flex: 1,
                height: '40px',
                background: index < 2 ? '#323232' : '#D9D9D9',
                borderRadius: '20px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                {index < 2 && (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.3334 4L6.00002 11.3333L2.66669 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
            ))}
          </div>
          
          <p style={{
            fontFamily: 'Inter',
            fontWeight: 400,
            fontSize: '14px',
            color: 'rgba(36, 36, 36, 0.7)',
            margin: 0
          }}>
            При выполнении практик ежедневно, начислим 100 баллов
          </p>
        </div>

        {/* Buttons */}
        <div style={{ padding: '16px', marginTop: '16px', zIndex: 10, position: 'relative' }}>
          <button 
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: '#F7F7F7',
              borderRadius: '16px',
              padding: '16px',
              width: '100%',
              height: '56px',
              border: 'none',
              marginBottom: '12px',
              cursor: 'pointer'
            }}
            onClick={handleQuickPractice}
          >
            <span style={{ 
              fontFamily: 'Montserrat', 
              fontWeight: 500, 
              fontSize: '16px',
              color: '#000000'
            }}>Практика 7 мин</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 6L15 12L9 18" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <button 
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: '#F7F7F7',
              borderRadius: '16px',
              padding: '16px',
              width: '100%',
              height: '56px',
              border: 'none',
              marginBottom: '16px',
              cursor: 'pointer'
            }}
            onClick={handleChoosePractice}
          >
            <span style={{ 
              fontFamily: 'Montserrat', 
              fontWeight: 500, 
              fontSize: '16px',
              color: '#000000'
            }}>Выбрать практику</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 6L15 12L9 18" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
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
          width: '25%'
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 22V12H15V22" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={{ 
            fontFamily: 'Inter', 
            fontWeight: 500, 
            fontSize: '12px',
            color: '#000000'
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
            <path d="M10 5C10 4.46957 10.2107 3.96086 10.5858 3.58579C10.9609 3.21071 11.4696 3 12 3C12.5304 3 13.0391 3.21071 13.4142 3.58579C13.7893 3.96086 14 4.46957 14 5C15.1484 5.54303 16.1274 6.38833 16.8321 7.4453C17.5367 8.50227 17.9404 9.73107 18 11V14C18.0753 14.6217 18.2954 15.2171 18.6428 15.7381C18.9902 16.2592 19.4551 16.6914 20 17H4C4.54494 16.6914 5.00981 16.2592 5.35719 15.7381C5.70457 15.2171 5.92475 14.6217 6 14V11C6.05956 9.73107 6.4633 8.50227 7.16795 7.4453C7.8726 6.38833 8.85159 5.54303 10 5" stroke="#8C8C8C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 17V18C9 18.7956 9.31607 19.5587 9.87868 20.1213C10.4413 20.6839 11.2044 21 12 21C12.7956 21 13.5587 20.6839 14.1213 20.1213C14.6839 19.5587 15 18.7956 15 18V17" stroke="#8C8C8C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={{ 
            fontFamily: 'Inter', 
            fontWeight: 400, 
            fontSize: '12px',
            color: '#8C8C8C'
          }}>Библиотека</span>
        </div>
        
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          width: '25%'
        }}>
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
          width: '25%'
        }}>
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

// Добавляем типы для Telegram WebApp
declare global {
  interface Window {
    Telegram?: {
      WebApp: any;
    };
  }
}
