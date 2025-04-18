"use client";

import { useState } from 'react';
import Image from 'next/image';
import QuizButton from '@/components/quiz/QuizButton';
import { ApiPractice, getPracticeThumbnailUrl } from '@/types/practice';
import { Clock, BarChart2, Zap, Target, Maximize, Minimize } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RecommendationScreenProps {
  practice: ApiPractice;
  onStart: (practice: ApiPractice) => void;
  onAnotherRecommendation: () => void;
}

export default function RecommendationScreen({
  practice,
  onStart,
  onAnotherRecommendation,
}: RecommendationScreenProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleStartPractice = () => {
    setIsLoading(true);
    console.log('Starting practice:', practice._id);
    onStart(practice);
  };

  const handleAnotherRecommendation = () => {
    setIsLoading(true);
    onAnotherRecommendation();
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const thumbnailUrl = getPracticeThumbnailUrl(practice);

  const getCategoryInfo = (system?: string) => {
    switch (system) {
      case 'Yo.Bodymental': return { icon: Zap, text: 'Тело и Ум' };
      case 'Yo.Meditation': return { icon: Target, text: 'Медитация' };
      case 'Yo.Health': return { icon: Zap, text: 'Здоровье' };
      case 'Yo.Base': return { icon: BarChart2, text: 'Базовая' };
      default: return { icon: Zap, text: practice.type };
    }
  };

  const categoryInfo = getCategoryInfo(practice["Yo.System"]);

  const hasKinescopeVideo = !!practice.kinescope;

  return (
    <div className="flex flex-col h-full p-4 bg-gradient-to-b from-blue-50 to-white">
      <h1 className="text-center text-lg font-medium mb-4">Ваша персональная практика</h1>
      
      <div className={cn(
        "flex-1 flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 ease-in-out",
        isFullscreen && "fixed inset-0 z-50 rounded-none w-screen h-screen"
      )}>
        <div className={cn(
          "relative w-full",
          isFullscreen ? "flex-1" : "h-48 sm:h-56"
        )}>
          {hasKinescopeVideo ? (
            <div className={cn(
              "relative w-full h-full",
              isFullscreen ? ""
                : "kinescope-container pt-[56.25%]"
            )}
              style={!isFullscreen ? { paddingTop: '56.25%' } : {}}
            >
              <iframe
                src={`https://kinescope.io/embed/${practice.kinescope}`}
                allow="autoplay; fullscreen; encrypted-media; gyroscope; accelerometer; clipboard-write;"
                frameBorder="0"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
                style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0 }}
              >
              </iframe>
            </div>
          ) : (
            <Image 
              src={thumbnailUrl}
              alt={practice.name}
              fill
              style={{ objectFit: 'cover' }}
              onError={(e) => (e.currentTarget.src = '/images/placeholder.jpg')}
            />
          )}

          {hasKinescopeVideo && (
            <button
              onClick={toggleFullscreen}
              className="absolute top-2 right-2 z-10 p-1.5 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
              aria-label={isFullscreen ? "Свернуть" : "Развернуть"}
            >
              {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
            </button>
          )}
        </div>
        
        {!isFullscreen && (
          <div className="p-4 flex flex-col flex-1">
            <h2 className="text-xl font-semibold mb-2 line-clamp-2">{practice.name}</h2>
            
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600 mb-3">
              {practice.duration && (
                <div className="flex items-center">
                  <Clock size={16} className="mr-1.5 text-gray-400" />
                  <span>{practice.duration}</span>
                </div>
              )}
              {practice.hard && (
                <div className="flex items-center">
                  <BarChart2 size={16} className="mr-1.5 text-gray-400" />
                  <span>{practice.hard}</span>
                </div>
              )}
              <div className="flex items-center">
                <categoryInfo.icon size={16} className="mr-1.5 text-gray-400" />
                <span>{categoryInfo.text}</span>
              </div>
            </div>
            
            {practice.descr && (
              <p className="text-gray-500 text-sm mb-4 line-clamp-3">{practice.descr}</p>
            )}

            <div className="mt-auto space-y-3 pt-4 border-t border-gray-100">
              {!hasKinescopeVideo && (
                <QuizButton 
                  onClick={handleStartPractice}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-md"
                >
                  {isLoading ? 'Загрузка...' : 'Начать практику'}
                </QuizButton>
              )}
              
              <QuizButton 
                onClick={handleAnotherRecommendation}
                variant="secondary"
                disabled={isLoading}
                className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                {isLoading ? 'Подбираем...' : (practice["Yo.System"] === 'Yo.Meditation' ? 'Другая медитация' : 'Другая практика')}
              </QuizButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 