"use client";

import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface QuizOptionProps {
  children: ReactNode;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export default function QuizOption({ 
  children, 
  selected = false, 
  onClick, 
  className, 
  disabled = false 
}: QuizOptionProps) {
  return (
    <div
      className={cn(
        "quiz-option",
        selected && "selected",
        disabled && "opacity-60 cursor-not-allowed",
        className
      )}
      onClick={disabled ? undefined : onClick}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
    >
      {children}
      {selected && (
        <div className="absolute right-4 flex items-center justify-center">
          <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
            <svg 
              width="14" 
              height="14" 
              viewBox="0 0 14 14" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M11.6667 3.5L5.25 9.91667L2.33333 7" 
                stroke="white" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
} 