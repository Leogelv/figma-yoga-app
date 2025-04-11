import React from 'react';

interface QuizButtonProps {
  text: string;
  onClick: () => void;
  primary?: boolean;
  disabled?: boolean;
}

export default function QuizButton({ text, onClick, primary = true, disabled = false }: QuizButtonProps) {
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      style={{
        width: '100%',
        padding: '16px',
        background: primary ? '#337FFF' : '#F1F1F1',
        color: primary ? '#FFFFFF' : '#242424',
        borderRadius: '24px',
        border: 'none',
        fontFamily: 'Montserrat',
        fontWeight: 500,
        fontSize: '16px',
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.2s ease',
        transform: 'scale(1)',
        boxShadow: primary ? '0px 2px 4px rgba(51, 127, 255, 0.15)' : 'none',
      }}
      onMouseOver={(e) => {
        if (!disabled) {
          const target = e.currentTarget as HTMLButtonElement;
          target.style.transform = 'scale(0.98)';
          target.style.opacity = '0.9';
        }
      }}
      onMouseOut={(e) => {
        if (!disabled) {
          const target = e.currentTarget as HTMLButtonElement;
          target.style.transform = 'scale(1)';
          target.style.opacity = '1';
        }
      }}
    >
      {text}
    </button>
  );
} 