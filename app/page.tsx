"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

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

  // Определяем размеры экрана для абсолютного позиционирования
  const screenWidth = 375;

  return (
    <main style={{ 
      width: '100%',
      maxWidth: '375px', 
      margin: '0 auto',
      position: 'relative',
      height: '100vh',
      backgroundColor: '#FFFFFF',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        padding: '12px 16px',
        borderBottom: '1px solid #F5F5F5'
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
          <Image 
            src="/images/leaf_icon.svg" 
            alt="Баллы" 
            width={24} 
            height={24} 
          />
        </div>
      </header>

      {/* Content */}
      <div style={{ 
        height: 'calc(100vh - 64px - 76px)', // 100vh - header - tabbar
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch'
      }}>
        {/* Main Image */}
        <div style={{ 
          width: '100%', 
          position: 'relative', 
          height: '192px'
        }}>
          <Image 
            src="/images/main_image.png" 
            alt="Yoga" 
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          <div style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            padding: '8px 16px',
            textAlign: 'center'
          }}>
            <p style={{ 
              fontFamily: 'Montserrat', 
              fontWeight: 600, 
              fontSize: '18px',
              margin: 0
            }}>
              Даниил Чернолуцкий
            </p>
          </div>
        </div>

        {/* Buttons and Progress */}
        <div style={{ padding: '16px' }}>
          <button 
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: '#F1F1F1',
              borderRadius: '24px',
              padding: '16px',
              width: '100%',
              height: '64px',
              border: 'none',
              marginBottom: '12px'
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
              background: '#F1F1F1',
              borderRadius: '24px',
              padding: '16px',
              width: '100%',
              height: '64px',
              border: 'none',
              marginBottom: '16px'
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

          {/* Progress Block */}
          <div style={{
            background: '#F1F1F1',
            borderRadius: '24px',
            padding: '16px',
            width: '100%'
          }}>
            {/* Header */}
            <div style={{ marginBottom: '16px' }}>
              <h2 style={{ 
                fontFamily: 'Montserrat', 
                fontWeight: 600, 
                fontSize: '18px',
                color: '#242424',
                margin: 0,
                marginBottom: '4px'
              }}>Твой прогресс</h2>
              <p style={{ 
                fontFamily: 'Inter', 
                fontWeight: 400, 
                fontSize: '14px',
                color: '#242424',
                margin: 0
              }}>Всего часов практик: 20</p>
            </div>

            {/* Days of week */}
            <div style={{ marginBottom: '8px' }}>
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

              {/* Progress dots */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                gap: '4px' 
              }}>
                {[1, 2, 3, 4, 5].map((item, index) => (
                  <div key={index} style={{ 
                    flex: 1,
                    height: '40px',
                    borderRadius: '20px',
                    background: index < 2 ? '#323232' : '#D7D7D7',
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
            </div>

            {/* Footer text */}
            <p style={{ 
              fontFamily: 'SF Pro Text', 
              fontWeight: 400, 
              fontSize: '14px',
              color: 'rgba(36, 36, 36, 0.7)',
              margin: 0
            }}>При выполнении практик ежедневно, начислим 100 баллов</p>
          </div>
        </div>
      </div>

      {/* Tab Bar */}
      <div style={{ 
        position: 'fixed', 
        bottom: 0, 
        width: '100%',
        maxWidth: '375px',
        borderTop: '1px solid #F1F1F1',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '8px 0',
        background: 'white',
        zIndex: 10
      }}>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          width: '25%'
        }}>
          <Image src="/images/home_icon.svg" alt="Главная" width={24} height={24} />
          <span style={{ 
            fontFamily: 'Inter', 
            fontWeight: 400, 
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
          <Image src="/images/calendar_icon.svg" alt="Расписание" width={24} height={24} />
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
          <Image src="/images/user_icon.svg" alt="Профиль" width={24} height={24} />
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
