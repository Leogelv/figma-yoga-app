"use client";

import React, { useState, useEffect } from 'react';
import { formatTime } from '@/lib/utils';
import { ApiPractice } from '@/types/practice';
import Button from '@/components/ui/button/Button';
import { cn } from '@/lib/utils';
import { Play, Pause, X } from 'lucide-react';

interface TimerScreenProps {
  practice: ApiPractice;
  onComplete: () => void;
  onCancel: () => void;
}

export default function TimerScreen({
  practice,
  onComplete,
  onCancel
}: TimerScreenProps) {
  const [timeLeft, setTimeLeft] = useState(300000); // 5 minutes in ms
  const [isRunning, setIsRunning] = useState(true);
  
  // Calculate progress percentage
  const progressPercentage = 100 - (timeLeft / 300000) * 100;
  
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1000);
      }, 1000);
    } else if (timeLeft === 0) {
      onComplete();
    }
    
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, onComplete]);
  
  const handlePauseResume = () => {
    setIsRunning(!isRunning);
  };
  
  return (
    <div className="flex flex-col items-center justify-center h-full bg-background p-6">
      <div className="w-full max-w-md">
        <h1 className="text-xl font-medium text-foreground text-center mb-6">{practice.name}</h1>
        
        {/* Timer Circle */}
        <div className="relative mx-auto w-64 h-64 mb-10">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle 
              cx="50" 
              cy="50" 
              r="45" 
              fill="none" 
              strokeWidth="6" 
              stroke="hsl(var(--accent))" 
            />
            {/* Progress circle */}
            <circle 
              cx="50" 
              cy="50" 
              r="45" 
              fill="none" 
              strokeWidth="6" 
              stroke="hsl(var(--primary))" 
              strokeLinecap="round"
              strokeDasharray="282.74"
              strokeDashoffset={282.74 - (282.74 * progressPercentage) / 100}
              className="transition-all duration-300"
            />
          </svg>
          
          {/* Timer display inside circle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-5xl font-medium text-foreground">{formatTime(timeLeft)}</span>
          </div>
        </div>
        
        {/* Controls */}
        <div className="flex flex-col gap-3 w-full">
          <Button
            onClick={handlePauseResume}
            fullWidth
            variant="primary"
            size="lg"
          >
            <div className="flex items-center justify-center gap-2">
              {isRunning ? (
                <>
                  <Pause size={18} /> Пауза
                </>
              ) : (
                <>
                  <Play size={18} /> Продолжить
                </>
              )}
            </div>
          </Button>
          <Button
            onClick={onCancel}
            fullWidth
            variant="outline"
          >
            <div className="flex items-center justify-center gap-2">
              <X size={18} /> Закончить
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
} 