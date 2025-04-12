import React from 'react';
import Image from 'next/image';
import { FigmaPractice } from '../data/figma-practices';

interface FigmaPracticeCardProps {
  practice: FigmaPractice;
  onClick: (practice: FigmaPractice) => void;
}

export default function FigmaPracticeCard({ practice, onClick }: FigmaPracticeCardProps) {
  return (
    <div 
      style={{
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.1)',
        marginBottom: '20px',
        background: '#FFFFFF',
        cursor: 'pointer',
        border: '1px solid #EFEFEF',
        transition: 'all 0.3s ease-in-out',
      }}
      onClick={() => onClick(practice)}
      onMouseOver={(e) => {
        const target = e.currentTarget as HTMLDivElement;
        target.style.transform = 'scale(0.98)';
        target.style.boxShadow = '0px 4px 15px rgba(0, 0, 0, 0.12)';
      }}
      onMouseOut={(e) => {
        const target = e.currentTarget as HTMLDivElement;
        target.style.transform = 'scale(1)';
        target.style.boxShadow = '0px 2px 12px rgba(0, 0, 0, 0.1)';
      }}
    >
      <div style={{ position: 'relative', width: '100%', height: '180px' }}>
        <Image 
          src={practice.figmaImageUrl} 
          alt={practice.title} 
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          style={{ objectFit: 'cover' }}
          priority={false}
        />
      </div>
      
      <div style={{ padding: '18px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <h3 style={{ 
            margin: 0, 
            fontFamily: 'Montserrat', 
            fontWeight: 600, 
            fontSize: '20px',
            color: '#141414'
          }}>
            {practice.title}
          </h3>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            background: '#F7F7F7',
            borderRadius: '100px',
            padding: '6px 10px'
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '6px' }}>
              <path d="M8.00004 4.00008V8.00008L10.6667 9.33342M14.6667 8.00008C14.6667 11.6819 11.6819 14.6667 8.00004 14.6667C4.31814 14.6667 1.33337 11.6819 1.33337 8.00008C1.33337 4.31818 4.31814 1.33341 8.00004 1.33341C11.6819 1.33341 14.6667 4.31818 14.6667 8.00008Z" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={{ 
              fontFamily: 'Inter', 
              fontWeight: 500, 
              fontSize: '14px',
              color: '#666666'
            }}>
              {practice.duration} мин
            </span>
          </div>
        </div>
        
        <p style={{ 
          margin: 0, 
          marginBottom: '14px', 
          fontFamily: 'Inter', 
          fontWeight: 400, 
          fontSize: '15px',
          color: '#666666',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          lineHeight: '1.5'
        }}>
          {practice.description}
        </p>
        
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <span 
            style={{ 
              background: '#F0F7FF',
              borderRadius: '100px',
              padding: '6px 12px',
              fontFamily: 'Inter', 
              fontWeight: 500, 
              fontSize: '13px',
              color: '#337FFF'
            }}
          >
            {practice.difficulty === 'beginner' && 'Начинающий'}
            {practice.difficulty === 'intermediate' && 'Средний'}
            {practice.difficulty === 'advanced' && 'Продвинутый'}
          </span>
        
          {practice.tags.slice(0, 3).map((tag, index) => (
            <span 
              key={index}
              style={{ 
                background: '#F5F5F5',
                borderRadius: '100px',
                padding: '6px 12px',
                fontFamily: 'Inter', 
                fontWeight: 400, 
                fontSize: '13px',
                color: '#444444'
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
} 