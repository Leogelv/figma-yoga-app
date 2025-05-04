"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Check } from 'lucide-react';
import QuizButton from '@/components/quiz/QuizButton';
import TelegramLayout from '@/components/layout/TelegramLayout';
import PageHeader from '@/components/layout/PageHeader';
import { useTelegramAuth } from '@/context/TelegramAuthContext';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-4xl font-bold mb-4">Yoga & Meditation</h1>
      <p className="text-lg mb-8">Добро пожаловать в наше приложение</p>
      <a
        href="/profile"
        className="px-6 py-3 bg-blue-500 text-white rounded-full font-medium"
      >
        Профиль
      </a>
    </div>
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
