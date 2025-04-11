import React from 'react';
import Image from 'next/image';
import { Practice } from '../data/practices';

interface PracticeCardProps {
  practice: Practice;
  onClick: (practice: Practice) => void;
}

export default function PracticeCard({ practice, onClick }: PracticeCardProps) {
  return (
    <div 
      style={{
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)',
        marginBottom: '16px',
        background: '#FFFFFF',
        cursor: 'pointer',
        border: '1px solid #F1F1F1',
        transition: 'transform 0.2s ease-in-out',
      }}
      onClick={() => onClick(practice)}
      onMouseOver={(e) => {
        const target = e.currentTarget as HTMLDivElement;
        target.style.transform = 'scale(0.98)';
      }}
      onMouseOut={(e) => {
        const target = e.currentTarget as HTMLDivElement;
        target.style.transform = 'scale(1)';
      }}
    >
      <div style={{ position: 'relative', width: '100%', height: '160px' }}>
        <Image 
          src={practice.imageUrl} 
          alt={practice.title} 
          layout="fill"
          objectFit="cover"
        />
      </div>
      
      <div style={{ padding: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <h3 style={{ 
            margin: 0, 
            fontFamily: 'Montserrat', 
            fontWeight: 600, 
            fontSize: '18px',
            color: '#242424'
          }}>
            {practice.title}
          </h3>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            background: '#F5F5F5',
            borderRadius: '100px',
            padding: '4px 8px'
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '4px' }}>
              <path d="M8.00004 4.00008V8.00008L10.6667 9.33342M14.6667 8.00008C14.6667 11.6819 11.6819 14.6667 8.00004 14.6667C4.31814 14.6667 1.33337 11.6819 1.33337 8.00008C1.33337 4.31818 4.31814 1.33341 8.00004 1.33341C11.6819 1.33341 14.6667 4.31818 14.6667 8.00008Z" stroke="#8C8C8C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={{ 
              fontFamily: 'Inter', 
              fontWeight: 500, 
              fontSize: '14px',
              color: '#8C8C8C'
            }}>
              {practice.duration} мин
            </span>
          </div>
        </div>
        
        <p style={{ 
          margin: 0, 
          marginBottom: '12px', 
          fontFamily: 'Inter', 
          fontWeight: 400, 
          fontSize: '14px',
          color: '#8C8C8C',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          lineHeight: '1.4'
        }}>
          {practice.description}
        </p>
        
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <span 
            style={{ 
              background: '#F5F5F5',
              borderRadius: '100px',
              padding: '4px 8px',
              fontFamily: 'Inter', 
              fontWeight: 500, 
              fontSize: '12px',
              color: '#242424'
            }}
          >
            {practice.difficulty === 'beginner' && 'Начинающий'}
            {practice.difficulty === 'intermediate' && 'Средний'}
            {practice.difficulty === 'advanced' && 'Продвинутый'}
          </span>
        
          {practice.tags.slice(0, 2).map((tag, index) => (
            <span 
              key={index}
              style={{ 
                background: '#F5F5F5',
                borderRadius: '100px',
                padding: '4px 8px',
                fontFamily: 'Inter', 
                fontWeight: 400, 
                fontSize: '12px',
                color: '#8C8C8C'
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