import React from 'react';

interface AnimatedCirclesProps {
  gradientColors?: string;
  showHumanIcon?: boolean;
}

export default function AnimatedCircles({ 
  gradientColors = '#EE5A32, #FF8B6B',
  showHumanIcon = true,
}: AnimatedCirclesProps) {
  return (
    <div className="yoga-person-container" style={{
      position: 'absolute',
      width: '100%',
      height: '380px',
      top: '20px',
      left: '0',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      zIndex: 1
    }}>
      {/* Оранжевый градиентный фон */}
      <div style={{
        position: 'absolute',
        width: '280px',
        height: '280px',
        background: `linear-gradient(45deg, ${gradientColors})`,
        borderRadius: '50%',
        filter: 'blur(20px)',
        opacity: 0.9,
        animation: 'pulse 8s ease-in-out infinite'
      }}></div>
      
      {/* Внешний круг */}
      <div style={{
        position: 'absolute', 
        width: '240px',
        height: '240px',
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        animation: 'orbit 20s linear infinite'
      }}></div>
      
      {/* Средний круг */}
      <div style={{
        position: 'absolute',
        width: '180px',
        height: '180px',
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        animation: 'orbit 15s linear infinite reverse'
      }}></div>
      
      {/* Внутренний круг */}
      <div style={{
        position: 'absolute',
        width: '120px',
        height: '120px',
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        animation: 'orbit 10s linear infinite'
      }}></div>
      
      {/* Силуэт медитирующего человека */}
      {showHumanIcon && (
        <div style={{
          position: 'absolute',
          zIndex: 4,
          width: '280px',
          height: '280px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <svg width="200" height="220" viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 10C110 10 120 20 120 30C120 40 110 50 100 50C90 50 80 40 80 30C80 20 90 10 100 10Z" fill="#292D32"/>
            <path d="M100 220C100 220 150 170 150 120C150 90 130 60 100 60C70 60 50 90 50 120C50 170 100 220 100 220Z" fill="#292D32"/>
            <circle cx="100" cy="30" r="20" fill="#292D32"/>
            <circle cx="100" cy="120" r="10" fill="#FFFFFF"/>
            <path d="M100 180L110 160H90L100 180Z" fill="#FFFFFF"/>
            <path d="M70 80C75 70 85 65 100 65C115 65 125 70 130 80" stroke="#FFFFFF" strokeWidth="2"/>
          </svg>
        </div>
      )}

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { 
            transform: scale(1);
            opacity: 0.9;
          }
          50% { 
            transform: scale(1.05);
            opacity: 1;
          }
        }
        
        @keyframes orbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
} 