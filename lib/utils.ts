import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Объединяет классы с помощью clsx и tailwind-merge
 * для создания оптимизированных имен классов
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Преобразовывает миллисекунды в формат MM:SS
 */
export function formatTime(milliseconds: number): string {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Преобразовывает минуты в миллисекунды
 */
export function minutesToMs(minutes: number): number {
  return minutes * 60 * 1000;
}

/**
 * Форматирует длительность практики в читаемый вид
 */
export function formatDuration(duration: 'short' | 'medium' | 'long'): string {
  const durationMap = {
    short: '5-10 минут',
    medium: '15-20 минут',
    long: '30-45 минут'
  };
  
  return durationMap[duration];
}

/**
 * Возвращает длительность в миллисекундах для заданного типа
 */
export function getDurationInMs(duration: 'short' | 'medium' | 'long'): number {
  const durationMap = {
    short: 5 * 60 * 1000, // 5 минут
    medium: 15 * 60 * 1000, // 15 минут
    long: 30 * 60 * 1000 // 30 минут
  };
  
  return durationMap[duration];
} 