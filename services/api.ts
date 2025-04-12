// Типы данных для практик с API
export interface ApiPractice {
  _id: string;
  id: number;
  name: string;
  type: string;
  duration: string;
  hard: string;
  "Yo.System"?: string;
  vimeo?: string;
  kinescope?: string;
  mp3_medit?: string;
  descr?: string;
  step?: string;
  free?: boolean;
  draft?: boolean;
  compl?: string;
}

export interface ApiResponse {
  response: {
    cursor: number;
    results: ApiPractice[];
    count: number;
    remaining: number;
  };
}

// Функция для преобразования типа сложности из API в локальный формат
export const mapDifficulty = (hard: string): 'beginner' | 'intermediate' | 'advanced' => {
  switch (hard) {
    case 'Простая':
      return 'beginner';
    case 'Посложнее':
      return 'intermediate';
    default:
      return 'advanced';
  }
};

// Функция для определения типа практики по полю Yo.System
export const mapPracticeType = (system: string): 'body' | 'meditation' | 'breathing' => {
  if (system?.includes('Bodymental')) {
    return 'body';
  } else if (system?.includes('Meditation')) {
    return 'meditation';
  } else {
    return 'breathing';
  }
};

// Функция для парсинга длительности из строки в минуты
export const parseDuration = (duration: string): number => {
  if (!duration) return 0;
  
  // Формат "43:01"
  const parts = duration.split(':');
  if (parts.length === 2) {
    return parseInt(parts[0]) + Math.round(parseInt(parts[1]) / 60);
  }
  
  return parseInt(duration) || 0;
};

// Функция для получения практик из API
export const fetchPractices = async () => {
  try {
    const response = await fetch('https://yozhit.ru/version-test/api/1.1/obj/practice');
    
    if (!response.ok) {
      throw new Error(`Ошибка API: ${response.status}`);
    }
    
    const data: ApiResponse = await response.json();
    return data.response.results;
  } catch (error) {
    console.error('Ошибка при получении практик:', error);
    return [];
  }
}; 