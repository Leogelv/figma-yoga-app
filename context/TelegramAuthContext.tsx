"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode, useRef } from 'react';
import { useTelegram } from '../hooks/useTelegram';
import { TelegramUser } from '../types/telegram';
import { createOrGetUser, getUserByTelegramId, UserData, subscribeToUserUpdates, unsubscribeFromUserUpdates } from '../services/userService';

// Define types for our context
interface TelegramAuthContextType {
  user: TelegramUser | null;
  userData: UserData | null;
  loading: boolean;
  error: string | null;
  logout: () => void;
  refreshUserData: () => Promise<void>;
}

// Create context with default values
const TelegramAuthContext = createContext<TelegramAuthContextType>({
  user: null,
  userData: null,
  loading: true,
  error: null,
  logout: () => {},
  refreshUserData: async () => {},
});

// Custom hook to use the context
export const useTelegramAuth = () => useContext(TelegramAuthContext);

interface TelegramAuthProviderProps {
  children: ReactNode;
}

export const TelegramAuthProvider: React.FC<TelegramAuthProviderProps> = ({ children }) => {
  const { isInTelegram, getUserInfo, tg } = useTelegram();
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const channelRef = useRef<any>(null);
  const initAttemptedRef = useRef<boolean>(false);

  // Функция для загрузки и установки данных пользователя
  const setupUserData = async (telegramUser: TelegramUser) => {
    try {
      setUser(telegramUser);
      console.log('Setting up user data for:', telegramUser);
      
      // Получаем или создаем пользователя в Supabase
      const supabaseUser = await createOrGetUser(telegramUser);
      if (supabaseUser) {
        setUserData(supabaseUser);
        // Подписываемся на обновления
        const channel = subscribeToUserUpdates(supabaseUser.id, handleUserUpdate);
        channelRef.current = channel;
      }
    } catch (err) {
      console.error("Error setting up user data:", err);
      setError("Ошибка при настройке данных пользователя");
    }
  };

  // Initialize auth on component mount
  useEffect(() => {
    const initAuth = async () => {
      if (initAttemptedRef.current) return;
      initAttemptedRef.current = true;
      
      try {
        // Попытка расширить приложение на весь экран
        if (isInTelegram && tg && tg.expand) {
          try {
            tg.expand();
          } catch (e) {
            console.log('Failed to expand:', e);
          }
        }

        // Получаем данные Telegram пользователя
        const telegramUser = getUserInfo();
        console.log('Telegram user info:', telegramUser);
        
        if (telegramUser && telegramUser.id) {
          await setupUserData(telegramUser as TelegramUser);
        } else {
          // Мок-пользователь для разработки, когда не в Telegram
          const mockUser: TelegramUser = {
            id: "12345",
            firstName: "Test",
            lastName: "User",
            username: "testuser",
          };
          await setupUserData(mockUser);
        }
      } catch (err) {
        console.error("Auth error:", err);
        setError("Ошибка аутентификации");
      } finally {
        setLoading(false);
      }
    };

    // Задержка для уверенности, что WebApp полностью инициализирован
    const timeoutId = setTimeout(() => {
      initAuth();
    }, 100);

    // Cleanup function
    return () => {
      clearTimeout(timeoutId);
      if (channelRef.current) {
        unsubscribeFromUserUpdates(channelRef.current);
      }
    };
  }, [isInTelegram, getUserInfo, tg]);

  // Handle realtime user updates
  const handleUserUpdate = (updatedUser: UserData) => {
    console.log('User data updated:', updatedUser);
    setUserData(updatedUser);
  };

  // Refresh user data
  const refreshUserData = async () => {
    try {
      if (!user?.id) return;
      
      const refreshedUserData = await getUserByTelegramId(user.id);
      if (refreshedUserData) {
        setUserData(refreshedUserData);
      }
    } catch (err) {
      console.error("Ошибка обновления данных пользователя:", err);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setUserData(null);
  };

  return (
    <TelegramAuthContext.Provider value={{ user, userData, loading, error, logout, refreshUserData }}>
      {children}
    </TelegramAuthContext.Provider>
  );
}; 