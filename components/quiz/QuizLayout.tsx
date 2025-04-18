"use client";

import { ReactNode } from 'react';
import ContentSafeAreaWrapper from '@/components/ContentSafeAreaWrapper';

interface QuizLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  backButton?: boolean;
  onBack?: () => void;
}

export default function QuizLayout({
  title,
  subtitle,
  children,
  backButton = false,
  onBack
}: QuizLayoutProps) {
  return (
    <ContentSafeAreaWrapper>
      <div className="flex flex-col h-full">
        <header className="flex items-center h-16 p-4 relative">
          {backButton && (
            <button 
              onClick={onBack}
              className="absolute left-4 flex items-center justify-center w-10 h-10"
            >
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M15 18L9 12L15 6" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
          <div className="flex-1 text-center">
            <h1 className="text-lg font-medium">Подбор практики</h1>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          <div className="flex flex-col max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-2">{title}</h2>
            {subtitle && (
              <p className="text-sm text-muted-foreground mb-8">{subtitle}</p>
            )}
            {children}
          </div>
        </main>
      </div>
    </ContentSafeAreaWrapper>
  );
} 