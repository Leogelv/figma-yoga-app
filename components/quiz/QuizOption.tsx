"use client";

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface QuizOptionProps {
  children: ReactNode;
  selected?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

export default function QuizOption({
  children,
  selected = false,
  onClick,
  disabled = false
}: QuizOptionProps) {
  return (
    <button
      type="button"
      className={cn(
        "w-full p-6 border rounded-xl text-left transition-all duration-200 ease-in-out",
        "bg-white shadow-md hover:shadow-lg",
        "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
        selected
          ? "border-blue-500 border-2"
          : "border-gray-200 hover:border-gray-300",
        disabled && "opacity-60 cursor-not-allowed grayscale"
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
} 