"use client";

import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface QuizButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

export default function QuizButton({
  children,
  className,
  variant = 'primary',
  fullWidth = true,
  ...props
}: QuizButtonProps) {
  return (
    <button
      className={cn(
        "flex items-center justify-center rounded-lg px-4 py-3 font-medium transition-colors",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50",
        variant === 'primary' && "bg-primary text-white hover:bg-primary/90",
        variant === 'secondary' && "bg-secondary text-primary hover:bg-secondary/90",
        variant === 'outline' && "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
} 