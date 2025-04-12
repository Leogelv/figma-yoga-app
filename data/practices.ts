import { fetchPractices, getPracticeImageUrl, mapDifficulty, mapPracticeType, parseDuration } from '../services/api';

export interface Practice {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  duration: number; // в минутах
  practiceType: 'body' | 'meditation' | 'breathing';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[]; // для фильтрации по различным параметрам
  goals: string[]; // цели практики
  bodyType?: 'yoga' | 'posture'; // только для телесных практик
  meditationType?: 'relaxation' | 'concentration' | 'sleep' | 'emotions'; // только для медитаций
  breathingIntensity?: 'mild' | 'medium' | 'intense'; // только для дыхательных практик
  instructor: string; // имя инструктора
  audioUrl?: string; // для медитаций и дыхательных практик
  videoUrl?: string; // для телесных практик
  originalData?: any; // Оригинальные данные из API
}

// Демо-данные для практик, используются если API недоступен
export const mockPractices: Practice[] = [
  // Телесные практики - йога
  {
    id: 'body-1',
    title: 'Утренняя йога для бодрости',
    description: 'Мягкая утренняя практика для пробуждения и заряда энергией на весь день',
    imageUrl: '/images/practices/default-practice.jpg',
    duration: 15,
    practiceType: 'body',
    difficulty: 'beginner',
    tags: ['утро', 'энергия', 'пробуждение'],
    goals: ['энергия', 'гибкость'],
    bodyType: 'yoga',
    instructor: 'Даниил Чернолуцкий',
    videoUrl: 'https://player.vimeo.com/video/123456789'
  },
  // Сокращаем до 3 примеров для упрощения
  {
    id: 'meditation-1',
    title: 'Медитация для расслабления',
    description: 'Мягкая медитация для снятия стресса и глубокого расслабления',
    imageUrl: '/images/practices/default-practice.jpg',
    duration: 10,
    practiceType: 'meditation',
    difficulty: 'beginner',
    tags: ['расслабление', 'стресс', 'сон'],
    goals: ['расслабление', 'спокойствие'],
    meditationType: 'relaxation',
    instructor: 'Даниил Чернолуцкий',
    audioUrl: 'https://example.com/audio/relaxation-meditation.mp3'
  },
  {
    id: 'breathing-1',
    title: 'Утренняя дыхательная практика',
    description: 'Энергетическое дыхание для бодрости и заряда энергией',
    imageUrl: '/images/practices/default-practice.jpg',
    duration: 5,
    practiceType: 'breathing',
    difficulty: 'beginner',
    tags: ['утро', 'энергия', 'бодрость'],
    goals: ['энергия', 'ясность ума'],
    breathingIntensity: 'medium',
    instructor: 'Даниил Чернолуцкий',
    audioUrl: 'https://example.com/audio/morning-breathing.mp3'
  }
];

// Переменная для хранения загруженных практик
let practices: Practice[] = [];

// Функция для конвертации данных API в формат практик
export const convertApiToPractice = (apiData: any[]): Practice[] => {
  if (!apiData || !Array.isArray(apiData)) return [];

  return apiData
    .filter(item => 
      // Фильтруем только практики (не черновики)
      item && !item.draft && (item.type === 'практика' || item.type === 'медитация')
    )
    .map(item => {
      const systemType = item['Yo.System'] || '';
      const practiceType = mapPracticeType(systemType);
      
      // Определяем цели практики на основе названия или типа
      let goals: string[] = [];
      let tags: string[] = [];
      
      if (item.name) {
        const nameLower = item.name.toLowerCase();
        if (nameLower.includes('бодрость') || nameLower.includes('утр')) {
          goals.push('энергия');
          tags.push('утро');
        }
        if (nameLower.includes('сон') || nameLower.includes('расслабл')) {
          goals.push('расслабление');
          tags.push('вечер');
        }
        if (nameLower.includes('сил') || nameLower.includes('мышц')) {
          goals.push('сила');
          tags.push('укрепление');
        }
      }
      
      // Если не удалось определить цели, добавляем базовые
      if (goals.length === 0) {
        if (practiceType === 'body') {
          goals.push('гибкость', 'сила');
        } else if (practiceType === 'meditation') {
          goals.push('расслабление', 'концентрация');
        } else {
          goals.push('энергия', 'здоровье');
        }
      }
      
      // Получаем URL для изображения
      const imageUrl = getPracticeImageUrl(item.vimeo, item.kinescope);
      
      // Формируем URL для видео если есть
      let videoUrl = undefined;
      if (item.vimeo) {
        videoUrl = `https://player.vimeo.com/video/${item.vimeo}`;
      } else if (item.kinescope) {
        videoUrl = item.kinescope;
      }
      
      // Формируем URL для аудио если есть
      let audioUrl = undefined;
      if (item.mp3_medit) {
        audioUrl = item.mp3_medit;
      }
      
      // Создаем объект практики
      return {
        id: `api-${item.id || item._id}`,
        title: item.name || 'Практика без названия',
        description: item.descr || `${item.name || 'Практика'} - ${item.type || 'практика'}`,
        imageUrl,
        duration: parseDuration(item.duration || '0'),
        practiceType,
        difficulty: mapDifficulty(item.hard || 'Простая'),
        tags,
        goals,
        instructor: 'YoWellCoach',
        videoUrl,
        audioUrl,
        originalData: item
      };
    });
};

// Функция для загрузки практик
export const loadPractices = async (): Promise<Practice[]> => {
  try {
    const apiPractices = await fetchPractices();
    practices = convertApiToPractice(apiPractices);
    
    // Если с API ничего не вернулось, используем моковые данные
    if (practices.length === 0) {
      console.log('API вернул 0 практик, используем моковые данные');
      practices = mockPractices;
    }
    
    return practices;
  } catch (error) {
    console.error('Ошибка при загрузке практик:', error);
    practices = mockPractices;
    return practices;
  }
};

// Функция для получения уже загруженных практик
export const getPractices = (): Practice[] => {
  return practices.length > 0 ? practices : mockPractices;
};

// Функция для фильтрации практик по параметрам
export const filterPractices = (
  filters: {
    practiceType?: 'body' | 'meditation' | 'breathing';
    difficulty?: 'beginner' | 'intermediate' | 'advanced';
    duration?: [number, number]; // [min, max] в минутах
    bodyType?: 'yoga' | 'posture';
    meditationType?: 'relaxation' | 'concentration' | 'sleep' | 'emotions';
    breathingIntensity?: 'mild' | 'medium' | 'intense';
    goals?: string[];
  }
) => {
  const allPractices = getPractices();
  
  return allPractices.filter(practice => {
    // Проверка типа практики
    if (filters.practiceType && practice.practiceType !== filters.practiceType) {
      return false;
    }

    // Проверка сложности
    if (filters.difficulty && practice.difficulty !== filters.difficulty) {
      return false;
    }

    // Проверка длительности
    if (filters.duration) {
      const [min, max] = filters.duration;
      if (practice.duration < min || (max > 0 && practice.duration > max)) {
        return false;
      }
    }

    // Проверка типа телесной практики
    if (filters.bodyType && practice.bodyType !== filters.bodyType) {
      return false;
    }

    // Проверка типа медитации
    if (filters.meditationType && practice.meditationType !== filters.meditationType) {
      return false;
    }

    // Проверка интенсивности дыхания
    if (filters.breathingIntensity && practice.breathingIntensity !== filters.breathingIntensity) {
      return false;
    }

    // Проверка целей
    if (filters.goals && filters.goals.length > 0) {
      const hasMatchingGoal = filters.goals.some(goal => 
        practice.goals.includes(goal)
      );
      if (!hasMatchingGoal) {
        return false;
      }
    }

    return true;
  });
}; 