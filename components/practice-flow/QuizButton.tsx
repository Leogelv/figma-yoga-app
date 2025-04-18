"use client";

import React, { ReactNode } from 'react';

interface QuizButtonProps {
  onClick: () => void;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
}

export default function QuizButton({
  onClick,
  children,
  variant = 'primary',
  fullWidth = true,
  disabled = false,
  className = ''
}: QuizButtonProps) {
  // Определяем базовые классы
  const baseClasses = `
    rounded-full py-4 px-6 font-medium
    transition-all duration-200 ease-in-out
    flex items-center justify-center
    ${fullWidth ? 'w-full' : ''}
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
  `;
  
  // Определяем классы в зависимости от варианта
  const variantClasses = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700',
    secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200 active:bg-gray-300',
    outline: 'bg-transparent text-blue-500 border border-blue-500 hover:bg-blue-50 active:bg-blue-100'
  };
  
  return (
    <button
      onClick={disabled ? undefined : onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
} 