"use client";

import { useEffect, useState } from 'react';
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
        height: 'calc(100vh - 64px - 76px)', // 100vh - header - tabbar
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative'
      }}>
        {/* Анимированные круги и фон */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          inset: 0,
          zIndex: 1
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(45deg, #EE5A32, #FF8B6B)',
            filter: 'blur(15px)',
            animation: 'rotate 20s linear infinite, morphBlob 15s ease-in-out infinite',
            borderRadius: 0,
            margin: 0,
            padding: 0
          }}></div>
          
          <div style={{
            position: 'absolute',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            zIndex: 2,
            aspectRatio: 1,
            width: '80%',
            height: '80%',
            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
            animation: 'rotate-clockwise 15s linear infinite, morphBlob1 8s ease-in-out infinite'
          }}></div>
          
          <div style={{
            position: 'absolute',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            zIndex: 2,
            aspectRatio: 1,
            width: '65%',
            height: '65%',
            borderRadius: '40% 60% 70% 30% / 40% 50% 50% 60%',
            animation: 'rotate-counter-clockwise 12s linear infinite, morphBlob2 12s ease-in-out infinite'
          }}></div>
          
          <div style={{
            position: 'absolute',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            zIndex: 2,
            aspectRatio: 1,
            width: '50%',
            height: '50%',
            borderRadius: '53% 47% 47% 53% / 36% 50% 50% 64%',
            animation: 'rotate-clockwise 10s linear infinite, morphBlob3 10s ease-in-out infinite'
          }}></div>
          
          {/* Иконка человечка посередине */}
          <div style={{
            position: 'absolute',
            zIndex: 3,
            width: '120px',
            height: '120px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 15C15.3137 15 18 12.3137 18 9C18 5.68629 15.3137 3 12 3C8.68629 3 6 5.68629 6 9C6 12.3137 8.68629 15 12 15Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2.90625 20.2499C3.82775 18.6534 5.15328 17.3277 6.74958 16.406C8.34588 15.4843 10.1567 14.999 12 14.999C13.8433 14.999 15.6541 15.4843 17.2504 16.406C18.8467 17.3277 20.1722 18.6534 21.0938 20.2499" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        
        {/* Текстовое сообщение */}
        <div style={{
          marginTop: '200px',
          textAlign: 'center',
          color: '#ffffff',
          zIndex: 10,
          padding: '0 20px'
        }}>
          <h2 style={{
            fontFamily: 'Montserrat', 
            fontWeight: 500,
            fontSize: '22px',
            marginBottom: '20px',
            textShadow: '0 0 10px rgba(255, 143, 64, 0.3)'
          }}>
            Персональная Yoga практика
          </h2>
        </div>

        {/* Buttons */}
        <div style={{ padding: '16px', marginTop: 'auto', zIndex: 10, position: 'relative' }}>
          <button 
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              borderRadius: '24px',
              padding: '16px',
              width: '100%',
              height: '64px',
              border: 'none',
              marginBottom: '12px',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'
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
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              borderRadius: '24px',
              padding: '16px',
              width: '100%',
              height: '64px',
              border: 'none',
              marginBottom: '16px',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'
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
        borderTop: '1px solid rgba(255, 255, 255, 0.2)',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '8px 0',
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
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

      <style jsx global>{`
        @keyframes rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes rotate-clockwise {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes rotate-counter-clockwise {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }

        @keyframes morphBlob {
          0% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
          25% { border-radius: 58% 42% 75% 25% / 76% 46% 54% 24%; }
          50% { border-radius: 50% 50% 33% 67% / 55% 27% 73% 45%; }
          75% { border-radius: 33% 67% 58% 42% / 63% 68% 32% 37%; }
          100% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
        }

        @keyframes morphBlob1 {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
        }

        @keyframes morphBlob2 {
          0%, 100% { border-radius: 40% 60% 70% 30% / 40% 50% 50% 60%; }
          50% { border-radius: 70% 30% 40% 60% / 60% 40% 60% 40%; }
        }

        @keyframes morphBlob3 {
          0%, 100% { border-radius: 53% 47% 47% 53% / 36% 50% 50% 64%; }
          50% { border-radius: 47% 53% 53% 47% / 50% 36% 64% 50%; }
        }
      `}</style>
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
