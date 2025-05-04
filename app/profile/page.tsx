"use client";

import React, { useState, useEffect } from 'react';
import { useTelegramAuth } from '@/context/TelegramAuthContext';
import TelegramLayout from '@/components/layout/TelegramLayout';
import SafeArea from '@/components/ui/SafeArea';
import { usePathname } from 'next/navigation';
import { useTelegram } from '@/hooks/useTelegram';

export default function ProfilePage() {
  const { user, userData, loading, error, refreshUserData } = useTelegramAuth();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const pathname = usePathname();
  const { setHeaderColor, updateBackButton } = useTelegram();

  // Set header color based on pathname
  useEffect(() => {
    setHeaderColor('#ffffff');
    updateBackButton(pathname !== '/', () => {
      window.history.back();
    });
  }, [pathname, setHeaderColor, updateBackButton]);

  // Handle manual refresh of user data
  const handleRefresh = async () => {
    if (isRefreshing) return;
    
    setIsRefreshing(true);
    await refreshUserData();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 500); // Минимальное время для визуального feedback'а
  };

  // Format date to a readable format
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Не указано';
    const date = new Date(dateString);
    return date.toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Render loading state
  if (loading) {
    return (
      <TelegramLayout>
        <SafeArea className="flex items-center justify-center min-h-screen p-4">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-t-blue-500 border-opacity-50 rounded-full animate-spin mx-auto mb-4"></div>
            <p>Загрузка данных пользователя...</p>
          </div>
        </SafeArea>
      </TelegramLayout>
    );
  }

  // Render error state
  if (error) {
    return (
      <TelegramLayout>
        <SafeArea className="flex items-center justify-center min-h-screen p-4">
          <div className="bg-red-50 p-4 rounded-lg text-red-600 max-w-md w-full">
            <h2 className="font-medium text-lg mb-2">Ошибка</h2>
            <p className="text-sm">{error}</p>
            <button 
              onClick={handleRefresh}
              className="mt-4 px-4 py-2 bg-red-100 rounded-lg text-red-700 text-sm font-medium"
            >
              Попробовать снова
            </button>
          </div>
        </SafeArea>
      </TelegramLayout>
    );
  }

  // Render no user state
  if (!user || !userData) {
    return (
      <TelegramLayout>
        <SafeArea className="flex items-center justify-center min-h-screen p-4">
          <div className="bg-yellow-50 p-4 rounded-lg text-yellow-600 max-w-md w-full">
            <h2 className="font-medium text-lg mb-2">Пользователь не найден</h2>
            <p className="text-sm">Не удалось получить данные пользователя. Попробуйте перезапустить приложение.</p>
          </div>
        </SafeArea>
      </TelegramLayout>
    );
  }

  // Render user profile
  return (
    <TelegramLayout>
      <SafeArea className="flex flex-col p-4 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Ваш профиль</h1>
        
        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <div className="flex items-center space-x-4 mb-4">
            {userData.photo_url ? (
              <img 
                src={userData.photo_url} 
                alt="Аватар" 
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-xl">
                {userData.first_name?.[0] || userData.username?.[0] || '?'}
              </div>
            )}
            <div>
              <h2 className="text-xl font-medium">
                {userData.first_name} {userData.last_name}
              </h2>
              {userData.telegram_username && (
                <p className="text-gray-500">@{userData.telegram_username}</p>
              )}
            </div>
          </div>
          
          <div className="border-t border-gray-100 pt-3">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-gray-500">ID:</div>
              <div className="font-medium">{userData.id.slice(0, 8)}...</div>
              
              <div className="text-gray-500">Telegram ID:</div>
              <div className="font-medium">{userData.telegram_id}</div>
              
              <div className="text-gray-500">Дата регистрации:</div>
              <div className="font-medium">{formatDate(userData.created_at)}</div>
              
              <div className="text-gray-500">Последний вход:</div>
              <div className="font-medium">{formatDate(userData.last_login)}</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <h3 className="font-medium mb-2">Предпочтения</h3>
          <p className="text-sm text-gray-500">
            {userData.preferences && Object.keys(userData.preferences).length 
              ? 'Настроенные предпочтения'
              : 'Предпочтения еще не настроены'}
          </p>
        </div>
        
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className={`mt-auto mx-auto px-6 py-2 rounded-full font-medium ${
            isRefreshing
              ? 'bg-gray-200 text-gray-500'
              : 'bg-blue-500 text-white'
          }`}
        >
          {isRefreshing ? 'Обновление...' : 'Обновить данные'}
        </button>
      </SafeArea>
    </TelegramLayout>
  );
} 