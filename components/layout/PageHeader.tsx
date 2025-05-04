"use client";

import React from 'react';
import { useTelegramAuth } from '@/context/TelegramAuthContext';
import Link from 'next/link';

interface PageHeaderProps {
  title?: string;
  showProfile?: boolean;
}

const PageHeader: React.FC<PageHeaderProps> = ({ 
  title = "Yoga & Meditation",
  showProfile = true 
}) => {
  const { user, userData, loading } = useTelegramAuth();

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-sm">
      <h1 className="text-lg font-semibold">{title}</h1>
      
      {showProfile && (
        <Link href="/profile" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center">
            {!loading && user ? (
              user.firstName ? user.firstName.charAt(0).toUpperCase() : 'G'
            ) : (
              'G'
            )}
          </div>
          <div className="text-sm font-medium">
            {!loading && user ? (
              `${user.firstName || ''} ${user.lastName || ''}`
            ) : (
              'Гость'
            )}
          </div>
        </Link>
      )}
    </header>
  );
};

export default PageHeader; 