import { Practice } from './practices';

// Расширенный интерфейс для Figma-практик
export interface FigmaPractice extends Practice {
  figmaImageUrl: string; // URL изображения из Figma
  figmaComponents?: string[]; // Массив компонентов из Figma
  figmaNodeId?: string; // ID узла в Figma
}

// Примеры данных Figma-практик
export const figmaPractices: FigmaPractice[] = [
  {
    id: 'figma-1',
    title: 'Поза собаки мордой вниз',
    description: 'Классическая поза йоги, которая укрепляет руки, плечи и спину, растягивает подколенные сухожилия и мышцы голени.',
    imageUrl: '/images/practices/figma/downward-dog.jpg',
    figmaImageUrl: '/images/practices/figma/downward-dog.jpg',
    duration: 5,
    practiceType: 'body',
    difficulty: 'beginner',
    tags: ['поза собаки', 'укрепление', 'растяжка'],
    goals: ['сила', 'гибкость'],
    bodyType: 'yoga',
    instructor: 'Фигма Инструктор',
    videoUrl: 'https://player.vimeo.com/video/123456789'
  },
  {
    id: 'figma-2',
    title: 'Поза воина',
    description: 'Поза воина укрепляет ноги, улучшает равновесие и концентрацию, раскрывает грудную клетку.',
    imageUrl: '/images/practices/figma/warrior.jpg',
    figmaImageUrl: '/images/practices/figma/warrior.jpg',
    duration: 5,
    practiceType: 'body',
    difficulty: 'intermediate',
    tags: ['поза воина', 'равновесие', 'сила'],
    goals: ['сила', 'равновесие'],
    bodyType: 'yoga',
    instructor: 'Фигма Инструктор',
    videoUrl: 'https://player.vimeo.com/video/123456789'
  },
  {
    id: 'figma-3',
    title: 'Поза лотоса',
    description: 'Медитативная поза, которая помогает успокоить ум, улучшает осанку и гибкость бедер.',
    imageUrl: '/images/practices/figma/lotus.jpg',
    figmaImageUrl: '/images/practices/figma/lotus.jpg',
    duration: 15,
    practiceType: 'meditation',
    difficulty: 'advanced',
    tags: ['медитация', 'концентрация', 'гибкость'],
    goals: ['спокойствие', 'концентрация'],
    meditationType: 'concentration',
    instructor: 'Фигма Инструктор',
    audioUrl: 'https://example.com/audio/lotus-meditation.mp3'
  },
  {
    id: 'figma-4',
    title: 'Поза дерева',
    description: 'Поза дерева улучшает равновесие, укрепляет мышцы ног и развивает концентрацию.',
    imageUrl: '/images/practices/figma/tree-pose.jpg',
    figmaImageUrl: '/images/practices/figma/tree-pose.jpg',
    duration: 3,
    practiceType: 'body',
    difficulty: 'beginner',
    tags: ['баланс', 'концентрация'],
    goals: ['равновесие', 'сила'],
    bodyType: 'yoga',
    instructor: 'Фигма Инструктор',
    videoUrl: 'https://player.vimeo.com/video/123456789'
  },
  {
    id: 'figma-5',
    title: 'Поза кобры',
    description: 'Поза кобры укрепляет мышцы спины, улучшает гибкость позвоночника и открывает грудную клетку.',
    imageUrl: '/images/practices/figma/cobra-pose.jpg',
    figmaImageUrl: '/images/practices/figma/cobra-pose.jpg',
    duration: 3,
    practiceType: 'body',
    difficulty: 'beginner',
    tags: ['укрепление спины', 'гибкость'],
    goals: ['гибкость', 'осанка'],
    bodyType: 'yoga',
    instructor: 'Фигма Инструктор',
    videoUrl: 'https://player.vimeo.com/video/123456789'
  },
  {
    id: 'figma-6',
    title: 'Поза ребенка',
    description: 'Расслабляющая поза, которая успокаивает ум, снимает напряжение в спине и плечах.',
    imageUrl: '/images/practices/figma/child-pose.jpg',
    figmaImageUrl: '/images/practices/figma/child-pose.jpg',
    duration: 5,
    practiceType: 'body',
    difficulty: 'beginner',
    tags: ['расслабление', 'восстановление'],
    goals: ['расслабление', 'гибкость'],
    bodyType: 'yoga',
    instructor: 'Фигма Инструктор',
    videoUrl: 'https://player.vimeo.com/video/123456789'
  },
  {
    id: 'figma-7',
    title: 'Йога-поток',
    description: 'Последовательность поз, плавно перетекающих друг в друга для создания медитативного потока движения.',
    imageUrl: '/images/practices/figma/flow-sequence.jpg',
    figmaImageUrl: '/images/practices/figma/flow-sequence.jpg',
    duration: 20,
    practiceType: 'body',
    difficulty: 'intermediate',
    tags: ['поток', 'движение', 'последовательность'],
    goals: ['сила', 'гибкость', 'расслабление'],
    bodyType: 'yoga',
    instructor: 'Фигма Инструктор',
    videoUrl: 'https://player.vimeo.com/video/123456789'
  },
  {
    id: 'figma-8',
    title: 'Медитация осознанности',
    description: 'Практика для развития внимательности и осознанности в настоящем моменте.',
    imageUrl: '/images/practices/figma/meditation-pose.jpg',
    figmaImageUrl: '/images/practices/figma/meditation-pose.jpg',
    duration: 10,
    practiceType: 'meditation',
    difficulty: 'beginner',
    tags: ['внимательность', 'осознанность'],
    goals: ['спокойствие', 'концентрация'],
    meditationType: 'concentration',
    instructor: 'Фигма Инструктор',
    audioUrl: 'https://example.com/audio/mindfulness-meditation.mp3'
  },
  {
    id: 'figma-9',
    title: 'Дыхательная практика',
    description: 'Техника глубокого дыхания для снятия стресса и улучшения энергии.',
    imageUrl: '/images/practices/figma/breathing.jpg',
    figmaImageUrl: '/images/practices/figma/breathing.jpg',
    duration: 5,
    practiceType: 'breathing',
    difficulty: 'beginner',
    tags: ['дыхание', 'энергия'],
    goals: ['энергия', 'расслабление'],
    breathingIntensity: 'medium',
    instructor: 'Фигма Инструктор',
    audioUrl: 'https://example.com/audio/breathing-practice.mp3'
  }
];

// Получить все Figma-практики
export const getFigmaPractices = (): FigmaPractice[] => {
  return figmaPractices;
};

// Функция для фильтрации Figma-практик по параметрам (аналогично filterPractices)
export const filterFigmaPractices = (
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
  return figmaPractices.filter(practice => {
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