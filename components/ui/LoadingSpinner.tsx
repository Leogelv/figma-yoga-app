"use client";

import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'muted';
  className?: string;
}

export default function LoadingSpinner({
  size = 'md',
  color = 'primary',
  className
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };
  
  const colorClasses = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    muted: 'text-muted-foreground'
  };

  return (
    <div 
      role="status"
      className={cn(
        'inline-block animate-spin', 
        sizeClasses[size], 
        colorClasses[color], 
        className
      )}
    >
      <svg 
        aria-hidden="true"
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <circle 
          cx="12" 
          cy="12" 
          r="10" 
          stroke="currentColor" 
          strokeWidth="4" 
          strokeLinecap="round" 
          opacity="0.25" 
        />
        <path 
          d="M12 2C6.47715 2 2 6.47715 2 12" 
          stroke="currentColor" 
          strokeWidth="4" 
          strokeLinecap="round" 
        />
      </svg>
      <span className="sr-only">Loading</span>
    </div>
  );
} 