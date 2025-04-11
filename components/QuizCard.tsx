import React from 'react';
import Image from 'next/image';

interface QuizCardProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  imageUrl?: string;
  onClick: () => void;
  selected?: boolean;
}

export default function QuizCard({ title, description, icon, imageUrl, onClick, selected = false }: QuizCardProps) {
  return (
    <button 
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: selected ? '#F1F1F1' : '#FFFFFF',
        borderRadius: '24px',
        padding: '16px',
        width: '100%',
        border: selected ? '2px solid #000000' : '1px solid #F1F1F1',
        marginBottom: '12px',
        textAlign: 'left',
        transition: 'all 0.2s ease-in-out',
        transform: selected ? 'scale(0.98)' : 'scale(1)',
        cursor: 'pointer'
      }}
      onClick={onClick}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {imageUrl && (
          <div style={{ 
            width: '48px', 
            height: '48px', 
            borderRadius: '12px',
            overflow: 'hidden',
            position: 'relative'
          }}>
            <Image 
              src={imageUrl} 
              alt={title} 
              layout="fill"
              objectFit="cover"
            />
          </div>
        )}
        
        {icon && !imageUrl && (
          <div style={{ 
            width: '48px', 
            height: '48px', 
            borderRadius: '12px', 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#F5F5F5'
          }}>
            {icon}
          </div>
        )}
        
        <div>
          <h3 style={{ 
            margin: 0, 
            fontFamily: 'Montserrat', 
            fontWeight: 500, 
            fontSize: '16px',
            color: '#242424'
          }}>
            {title}
          </h3>
          
          {description && (
            <p style={{ 
              margin: '4px 0 0 0', 
              fontFamily: 'Inter', 
              fontWeight: 400, 
              fontSize: '14px',
              color: '#8C8C8C'
            }}>
              {description}
            </p>
          )}
        </div>
      </div>
      
      <div>
        {selected ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 6L9 17L4 12" stroke="#337FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 6L15 12L9 18" stroke="#242424" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>
    </button>
  );
} 