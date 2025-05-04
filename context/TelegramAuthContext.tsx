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

// Функция для создания локального userData объекта в случае, если Supabase недоступен
const createLocalUserData = (telegramUser: TelegramUser): UserData => {
  const now = new Date().toISOString();
  return {
    id: `local_${telegramUser.id}`,
    telegram_id: telegramUser.id.toString(),
    telegram_username: telegramUser.username || '',
    username: telegramUser.username || '',
    first_name: telegramUser.firstName || '',
    last_name: telegramUser.lastName || '',
    created_at: now,
    updated_at: now,
    last_login: now,
    preferences: {}
  };
};

export const TelegramAuthProvider: React.FC<TelegramAuthProviderProps> = ({ children }) => {
  const { isInTelegram, getUserInfo } = useTelegram();
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const channelRef = useRef<any>(null);
  const [offlineMode, setOfflineMode] = useState<boolean>(false);

  // Initialize auth on component mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Get Telegram user data
        const telegramUser = getUserInfo();
        
        if (!isInTelegram || !telegramUser) {
          // Mock user for development when not in Telegram
          const mockUser = {
            id: "12345",
            firstName: "Test",
            lastName: "User",
            username: "testuser",
          };
          setUser(mockUser);
          
          try {
            // Get or create user in Supabase
            const supabaseUser = await createOrGetUser(mockUser);
            if (supabaseUser) {
              setUserData(supabaseUser);
              // Subscribe to updates
              const channel = subscribeToUserUpdates(supabaseUser.id, handleUserUpdate);
              channelRef.current = channel;
            } else {
              // Если supabaseUser null, используем локальные данные
              setUserData(createLocalUserData(mockUser));
              setOfflineMode(true);
            }
          } catch (supabaseError) {
            console.error("Ошибка Supabase:", supabaseError);
            // Используем локальные данные в случае ошибки
            setUserData(createLocalUserData(mockUser));
            setOfflineMode(true);
          }
        } else if (telegramUser) {
          setUser(telegramUser);
          
          try {
            // Get or create user in Supabase
            const supabaseUser = await createOrGetUser(telegramUser);
            if (supabaseUser) {
              setUserData(supabaseUser);
              // Subscribe to updates
              const channel = subscribeToUserUpdates(supabaseUser.id, handleUserUpdate);
              channelRef.current = channel;
            } else {
              // Если supabaseUser null, используем локальные данные
              setUserData(createLocalUserData(telegramUser));
              setOfflineMode(true);
            }
          } catch (supabaseError) {
            console.error("Ошибка Supabase:", supabaseError);
            // Используем локальные данные в случае ошибки
            setUserData(createLocalUserData(telegramUser));
            setOfflineMode(true);
          }
        } else {
          setError("Не удалось получить данные пользователя Telegram");
        }
      } catch (err) {
        console.error("Ошибка аутентификации:", err);
        setError("Ошибка аутентификации");
        
        // В случае ошибки, пытаемся создать минимальный объект пользователя
        const backupUser = getUserInfo() || {
          id: "anonymous",
          firstName: "Гость",
          lastName: "",
          username: "",
        };
        setUser(backupUser);
        setUserData(createLocalUserData(backupUser));
        setOfflineMode(true);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    // Cleanup function
    return () => {
      if (channelRef.current && !offlineMode) {
        unsubscribeFromUserUpdates(channelRef.current);
      }
    };
  }, [isInTelegram, getUserInfo, offlineMode]);

  // Handle realtime user updates
  const handleUserUpdate = (updatedUser: UserData) => {
    if (!offlineMode) {
      setUserData(updatedUser);
    }
  };

  // Refresh user data
  const refreshUserData = async () => {
    try {
      if (!user?.id || offlineMode) return;
      
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
    // Можно добавить логику для очистки локального хранилища, если потребуется
  };

  return (
    <TelegramAuthContext.Provider value={{ user, userData, loading, error, logout, refreshUserData }}>
      {children}
    </TelegramAuthContext.Provider>
  );
}; 