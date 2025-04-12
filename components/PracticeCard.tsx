import React, { useState } from 'react';
import Image from 'next/image';
import { Practice } from '../data/practices';
import { getPracticeImageUrl } from '../utils/imageUtils';

interface PracticeCardProps {
  practice: Practice;
  onClick: (practice: Practice) => void;
}

export default function PracticeCard({ practice, onClick }: PracticeCardProps) {
  const [imageError, setImageError] = useState(false);
  
  // Обработчик ошибки загрузки изображения
  const handleImageError = () => {
    setImageError(true);
  };

  // Определение фактического URL изображения с использованием утилиты
  const imageUrl = imageError 
    ? getPracticeImageUrl(practice.id, practice.vimeoId, true) 
    : practice.imageUrl;
  
  // Определение иконки типа практики
  const getPracticeTypeIcon = () => {
    switch (practice.practiceType) {
      case 'body':
        return '🧘‍♀️';
      case 'meditation':
        return '🧠';
      case 'breathing':
        return '💨';
      default:
        return '✨';
    }
  };

  // Определение цвета бейджа сложности
  const getDifficultyColor = () => {
    switch (practice.difficulty) {
      case 'beginner':
        return '#4CAF50';
      case 'intermediate':
        return '#FF9800';
      case 'advanced':
        return '#F44336';
      default:
        return '#4CAF50';
    }
  };

  // Форматирование длительности
  const formatDuration = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} мин`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 
      ? `${hours} ч ${remainingMinutes} мин` 
      : `${hours} ч`;
  };

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
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
      }}
      onClick={() => onClick(practice)}
      onMouseOver={(e) => {
        const target = e.currentTarget as HTMLDivElement;
        target.style.transform = 'scale(0.98)';
        target.style.boxShadow = '0px 4px 12px rgba(0, 0, 0, 0.1)';
      }}
      onMouseOut={(e) => {
        const target = e.currentTarget as HTMLDivElement;
        target.style.transform = 'scale(1)';
        target.style.boxShadow = '0px 2px 8px rgba(0, 0, 0, 0.05)';
      }}
    >
      {/* Обложка практики */}
      <div style={{ position: 'relative', width: '100%', height: '160px' }}>
        <Image
          src={imageUrl}
          alt={practice.title}
          fill
          style={{ objectFit: 'cover' }}
          onError={handleImageError}
          priority
        />
        
        {/* Бейдж типа практики */}
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          background: 'rgba(255, 255, 255, 0.85)',
          borderRadius: '16px',
          padding: '4px 10px',
          fontSize: '14px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          <span>{getPracticeTypeIcon()}</span>
          <span>
            {practice.practiceType === 'body' 
              ? 'Телесная' 
              : practice.practiceType === 'meditation' 
                ? 'Медитация' 
                : 'Дыхание'}
          </span>
        </div>
        
        {/* Бейдж длительности */}
        <div style={{
          position: 'absolute',
          bottom: '12px',
          left: '12px',
          background: 'rgba(0, 0, 0, 0.7)',
          color: '#FFFFFF',
          borderRadius: '16px',
          padding: '4px 10px',
          fontSize: '14px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          <span>⏱️</span>
          <span>{formatDuration(practice.duration)}</span>
        </div>
        
        {/* Бейдж сложности */}
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          background: getDifficultyColor(),
          color: '#FFFFFF',
          borderRadius: '16px',
          padding: '4px 10px',
          fontSize: '14px',
        }}>
          {practice.difficulty === 'beginner' 
            ? 'Начальный' 
            : practice.difficulty === 'intermediate' 
              ? 'Средний' 
              : 'Продвинутый'}
        </div>
      </div>
      
      {/* Информация о практике */}
      <div style={{ padding: '16px' }}>
        <h3 style={{ 
          margin: '0 0 8px 0', 
          fontSize: '18px', 
          fontWeight: 600, 
          color: '#1E1E1E'
        }}>
          {practice.title}
        </h3>
        
        <p style={{ 
          margin: '0 0 12px 0', 
          fontSize: '14px', 
          color: '#666666',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          {practice.description}
        </p>
        
        {/* Инструктор */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          fontSize: '14px', 
          color: '#666666',
          marginTop: 'auto'
        }}>
          <span style={{ marginRight: '4px' }}>👨‍🏫</span>
          <span>{practice.instructor}</span>
        </div>
      </div>
    </div>
  );
} 