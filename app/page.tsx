"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Check } from 'lucide-react';
import QuizButton from '@/components/quiz/QuizButton';
import TelegramLayout from '@/components/layout/TelegramLayout';
import PageHeader from '@/components/layout/PageHeader';
import { useTelegramAuth } from '@/context/TelegramAuthContext';

export default function HomePage() {
  const router = useRouter();
  const { user, userData } = useTelegramAuth();

  const handleQuickPractice = () => {
    router.push('/practice/quick');
  };

  const handleChoosePractice = () => {
    router.push('/quiz');
  };

  return (
    <TelegramLayout noVerticalSwipe={true} topPadding={0} showBottomNav={true}>
      {/* Верхняя часть с профилем и баллами */}
      <header className="flex justify-between items-center px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center">
            {user && user.firstName ? user.firstName.charAt(0).toUpperCase() : 'Г'}
          </div>
          <span className="text-base font-medium text-foreground">
            {user ? `Привет, ${user.firstName || 'Пользователь'}` : 'Привет, Пользователь'}
          </span>
        </div>
        
        <div className="flex items-center gap-1.5">
          <span className="text-base font-medium text-foreground">{userData?.points || 150}</span>
          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-xs font-semibold text-primary">₽</span>
          </div>
        </div>
      </header>

      {/* Основной контент */}
      <div className="flex-1 flex flex-col">
        {/* Баннер практик */}
        <div className="relative px-4 py-6">
          {/* Декоративные элементы */}
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-primary/10 opacity-40"></div>
          <div className="absolute bottom-0 -left-10 w-24 h-24 rounded-full bg-primary/10 opacity-30"></div>
          
          <h1 className="text-2xl font-bold text-foreground mb-2 relative z-10">Начните свою<br />практику сегодня</h1>
          <p className="text-base text-muted-foreground mb-6 relative z-10">Выберите тип практики, который<br />подходит именно вам</p>
          
          <div className="flex flex-col gap-3 relative z-10">
            <QuizButton 
              onClick={handleChoosePractice} 
              variant="primary" 
              className="flex justify-between items-center py-4"
            >
              <span>Выбрать практику</span>
              <ArrowRight size={18} />
            </QuizButton>
            
            <QuizButton 
              onClick={handleQuickPractice} 
              variant="secondary" 
              className="flex justify-between items-center py-4"
            >
              <span>Быстрая практика 7 минут</span>
              <ArrowRight size={18} />
            </QuizButton>
          </div>
        </div>
        
        {/* Секция прогресса */}
        <div className="flex-1 bg-card rounded-t-3xl px-4 py-6 mt-4">
          <h2 className="text-lg font-semibold text-foreground mb-4">Ваш прогресс</h2>
          
          {/* Полоса прогресса недели */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">Эта неделя</span>
              <span className="text-sm font-medium text-foreground">3/7 дней</span>
            </div>
            
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{width: '42%'}}></div>
            </div>
          </div>
          
          {/* Дни недели */}
          <div className="grid grid-cols-7 gap-2 mb-6">
            {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day, i) => (
              <div key={day} className="flex flex-col items-center">
                <span className="text-xs text-muted-foreground mb-1.5">{day}</span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${i < 3 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
                  {i < 3 && <Check size={14} />}
                </div>
              </div>
            ))}
          </div>
          
          {/* Статистика */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-muted/50 rounded-xl p-4">
              <div className="text-sm text-muted-foreground mb-1">Всего практик</div>
              <div className="text-xl font-bold text-foreground">{userData?.totalPractices || 12}</div>
            </div>
            
            <div className="bg-muted/50 rounded-xl p-4">
              <div className="text-sm text-muted-foreground mb-1">Часов практики</div>
              <div className="text-xl font-bold text-foreground">{userData?.totalHours || 5.5}</div>
            </div>
          </div>
          
          {/* Последние практики */}
          <div className="mt-6">
            <h3 className="text-base font-semibold text-foreground mb-3">Недавние практики</h3>
            
            <div className="space-y-3">
              <div className="flex items-center bg-white p-3 rounded-lg border border-border">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center mr-3">
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-[10px] font-medium text-white">7м</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-foreground">Утренняя йога</h4>
                  <p className="text-xs text-muted-foreground">Вчера, 08:30</p>
                </div>
              </div>
              
              <div className="flex items-center bg-white p-3 rounded-lg border border-border">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center mr-3">
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-[10px] font-medium text-white">15м</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-foreground">Медитация "Океан"</h4>
                  <p className="text-xs text-muted-foreground">3 дня назад</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TelegramLayout>
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
