"use client";

import React, { ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuizLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  backButton?: boolean;
  onBack?: () => void;
  className?: string;
  contentClass?: string;
  headerClass?: string;
}

export default function QuizLayout({ 
  children, 
  title, 
  subtitle, 
  backButton = false, 
  onBack, 
  className,
  contentClass,
  headerClass
}: QuizLayoutProps) {
  return (
    <div className={cn("min-h-[100dvh] flex flex-col bg-background", className)}>
      <header className={cn("px-4 py-6 flex items-center", headerClass)}>
        {backButton && (
          <button 
            onClick={onBack} 
            className="mr-3 w-10 h-10 rounded-full flex items-center justify-center bg-secondary transition-colors hover:bg-secondary/80"
            aria-label="Назад"
          >
            <ArrowLeft size={20} />
          </button>
        )}
        
        <div className="flex-1">
          {title && (
            <h1 className="text-xl font-bold text-foreground">{title}</h1>
          )}
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
      </header>
      
      <main className={cn(
        "flex-1 flex flex-col px-4 pb-6", 
        contentClass
      )}>
        {children}
      </main>
    </div>
  );
} 