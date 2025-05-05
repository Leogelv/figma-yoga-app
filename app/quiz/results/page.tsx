"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
// import PracticeCard from '../../../components/PracticeCard';
import QuizButton from '@/components/quiz/QuizButton';
// import { Practice, filterPractices } from '../../../data/practices';
import { useSearchParams } from 'next/navigation';

// Временно определим тип Practice
interface Practice {
  id: string;
  name: string;
  type: string;
  // другие поля
}

export default function ResultsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-4xl font-bold mb-4">Результаты</h1>
      <p className="text-lg mb-8">Ваша практика подобрана</p>
      <a
        href="/"
        className="px-6 py-3 bg-blue-500 text-white rounded-full font-medium"
      >
        На главную
      </a>
    </div>
  );
} 