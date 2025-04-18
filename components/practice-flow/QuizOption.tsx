"use client";

import { ReactNode } from 'react';

interface QuizOptionProps {
  id: string;
  title: string;
  description?: string;
  icon?: ReactNode;
  isSelected: boolean;
  onClick: (id: string) => void;
}

export default function QuizOption({
  id,
  title,
  description,
  icon,
  isSelected,
  onClick
}: QuizOptionProps) {
  const handleClick = () => {
    onClick(id);
  };

  return (
    <div 
      onClick={handleClick}
      className={`
        rounded-3xl p-6 mb-4 cursor-pointer
        transition-all duration-200 ease-in-out
        ${isSelected 
          ? 'border-2 border-blue-500 scale-[0.98] shadow-sm' 
          : 'border border-gray-200 hover:border-gray-300'
        }
      `}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold mb-1">{title}</h3>
          {description && (
            <p className="text-gray-600 text-sm">{description}</p>
          )}
        </div>
        
        <div className="flex items-center">
          {icon && (
            <div className="mr-2">{icon}</div>
          )}
          
          {isSelected && (
            <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path 
                  d="M1 5L5 9L13 1" 
                  stroke="white" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 