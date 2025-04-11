import React from 'react';

interface AnimatedBackgroundProps {
  gradientColors?: string;
  showHumanIcon?: boolean;
  opacity?: number;
}

export default function AnimatedBackground({ 
  gradientColors = '#EE5A32, #FF8B6B',
  showHumanIcon = true,
  opacity = 1
}: AnimatedBackgroundProps) {
  return (
    <div style={{
      position: 'absolute',
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      inset: 0,
      zIndex: 1,
      opacity: opacity
    }}>
      {/* Градиентный фон */}
      <div style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        background: `linear-gradient(45deg, ${gradientColors})`,
        filter: 'blur(15px)',
        animation: 'rotate 20s linear infinite, morphBlob 15s ease-in-out infinite',
        borderRadius: 0,
        margin: 0,
        padding: 0
      }}></div>
      
      {/* Внешний круг */}
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
      
      {/* Средний круг */}
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
      
      {/* Внутренний круг */}
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
      
      {/* Иконка человечка посередине (опционально) */}
      {showHumanIcon && (
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
      )}

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
    </div>
  );
} 