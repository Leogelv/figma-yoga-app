"use client";

import React, { ReactNode, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type VariantType = 'primary' | 'secondary' | 'outline' | 'ghost';
type SizeType = 'sm' | 'md' | 'lg' | 'default';

interface QuizButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: VariantType;
  size?: SizeType;
  className?: string;
  fullWidth?: boolean;
  isLoading?: boolean;
  withRipple?: boolean;
}

export default function QuizButton({
  children,
  className,
  variant = 'primary',
  size = 'default',
  fullWidth = true,
  isLoading = false,
  withRipple = false,
  type = 'button',
  ...props
}: QuizButtonProps) {
  // Reference to the button element
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  
  // Function to create ripple effect
  const createRipple = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!withRipple || isLoading || props.disabled) return;
    
    const button = buttonRef.current;
    if (!button) return;
    
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    const rect = button.getBoundingClientRect();
    const ripple = document.createElement('span');
    
    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${event.clientX - rect.left - radius}px`;
    ripple.style.top = `${event.clientY - rect.top - radius}px`;
    ripple.className = 'ripple';
    
    // Clean up old ripples
    const existingRipple = button.getElementsByClassName('ripple')[0];
    if (existingRipple) {
      existingRipple.remove();
    }
    
    button.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
      ripple.remove();
    }, 700);
  };
  
  // Map size to appropriate padding/height classes
  const sizeClasses = {
    sm: 'py-1.5 px-3 text-sm',
    md: 'py-2 px-4',
    lg: 'py-3 px-5 text-base',
    default: 'py-2.5 px-4'
  };
  
  return (
    <button
      ref={buttonRef}
      type={type}
      className={cn(
        'quiz-button',
        `quiz-button-${variant}`,
        sizeClasses[size],
        fullWidth && 'w-full',
        isLoading && 'opacity-70 cursor-not-allowed',
        className
      )}
      onClick={createRipple}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <svg className="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Загрузка...
        </div>
      ) : (
        children
      )}
      
      <style jsx>{`
        .ripple {
          position: absolute;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.3);
          transform: scale(0);
          animation: ripple 0.7s linear;
          pointer-events: none;
        }
        
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `}</style>
    </button>
  );
} 