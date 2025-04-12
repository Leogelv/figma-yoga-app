"use client";

import { useState, useEffect } from 'react';
import PracticeCard from '../../components/PracticeCard';
import { Practice, mockPractices } from '../../data/practices';

export default function TestPracticeCard() {
  const [selectedPractice, setSelectedPractice] = useState<Practice | null>(null);

  // Обработчик выбора практики
  const handleSelectPractice = (practice: Practice) => {
    setSelectedPractice(practice);
    console.log('Выбрана практика:', practice);
  };

  return (
    <div style={{ 
      maxWidth: '500px', 
      margin: '0 auto', 
      padding: '20px',
      backgroundColor: '#F9F9F9',
      minHeight: '100vh'
    }}>
      <h1 style={{ marginBottom: '20px', textAlign: 'center' }}>Тестирование PracticeCard</h1>
      
      {/* Вывод всех карточек из моковых данных */}
      {mockPractices.map((practice) => (
        <PracticeCard 
          key={practice.id} 
          practice={practice} 
          onClick={handleSelectPractice} 
        />
      ))}
      
      {/* Отображение выбранной практики */}
      {selectedPractice && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          right: '20px',
          padding: '15px',
          backgroundColor: '#fff',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          zIndex: 1000
        }}>
          <h3 style={{ margin: '0 0 8px 0' }}>Выбрана практика:</h3>
          <p style={{ margin: '0 0 4px 0' }}><strong>ID:</strong> {selectedPractice.id}</p>
          <p style={{ margin: '0 0 4px 0' }}><strong>Название:</strong> {selectedPractice.title}</p>
          <p style={{ margin: '0 0 4px 0' }}><strong>Тип:</strong> {selectedPractice.practiceType}</p>
          <p style={{ margin: '0 0 4px 0' }}><strong>Длительность:</strong> {selectedPractice.duration} мин</p>
          <button 
            onClick={() => setSelectedPractice(null)}
            style={{
              padding: '8px 16px',
              backgroundColor: '#337FFF',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              marginTop: '8px',
              cursor: 'pointer'
            }}
          >
            Закрыть
          </button>
        </div>
      )}
    </div>
  );
} 