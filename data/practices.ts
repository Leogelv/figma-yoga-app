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
}

// Демо-данные для практик
export const practices: Practice[] = [
  // Телесные практики - йога
  {
    id: 'body-1',
    title: 'Утренняя йога для бодрости',
    description: 'Мягкая утренняя практика для пробуждения и заряда энергией на весь день',
    imageUrl: '/images/practices/morning-yoga.jpg',
    duration: 15,
    practiceType: 'body',
    difficulty: 'beginner',
    tags: ['утро', 'энергия', 'пробуждение'],
    goals: ['энергия', 'гибкость'],
    bodyType: 'yoga',
    instructor: 'Даниил Чернолуцкий',
    videoUrl: '/videos/morning-yoga.mp4'
  },
  {
    id: 'body-2',
    title: 'Йога для снятия напряжения',
    description: 'Практика направлена на снятие напряжения в плечах и шее после долгого рабочего дня',
    imageUrl: '/images/practices/tension-relief.jpg',
    duration: 20,
    practiceType: 'body',
    difficulty: 'beginner',
    tags: ['вечер', 'расслабление', 'снятие напряжения'],
    goals: ['расслабление', 'снятие стресса'],
    bodyType: 'yoga',
    instructor: 'Даниил Чернолуцкий',
    videoUrl: '/videos/tension-relief.mp4'
  },
  {
    id: 'body-3',
    title: 'Силовая йога',
    description: 'Интенсивная практика для укрепления мышц и улучшения выносливости',
    imageUrl: '/images/practices/power-yoga.jpg',
    duration: 30,
    practiceType: 'body',
    difficulty: 'intermediate',
    tags: ['сила', 'укрепление', 'выносливость'],
    goals: ['сила', 'тонус мышц'],
    bodyType: 'yoga',
    instructor: 'Даниил Чернолуцкий',
    videoUrl: '/videos/power-yoga.mp4'
  },
  {
    id: 'body-4',
    title: 'Продвинутая практика баланса',
    description: 'Сложная практика с акцентом на балансы и перевернутые позы',
    imageUrl: '/images/practices/balance-yoga.jpg',
    duration: 45,
    practiceType: 'body',
    difficulty: 'advanced',
    tags: ['баланс', 'сложные позы', 'концентрация'],
    goals: ['баланс', 'сила', 'концентрация'],
    bodyType: 'yoga',
    instructor: 'Даниил Чернолуцкий',
    videoUrl: '/videos/balance-yoga.mp4'
  },

  // Телесные практики - осанка
  {
    id: 'body-5',
    title: 'Коррекция осанки для начинающих',
    description: 'Базовые упражнения для улучшения осанки и профилактики болей в спине',
    imageUrl: '/images/practices/posture-beginner.jpg',
    duration: 15,
    practiceType: 'body',
    difficulty: 'beginner',
    tags: ['осанка', 'спина', 'профилактика'],
    goals: ['здоровая спина', 'правильная осанка'],
    bodyType: 'posture',
    instructor: 'Даниил Чернолуцкий',
    videoUrl: '/videos/posture-beginner.mp4'
  },
  {
    id: 'body-6',
    title: 'Укрепление мышц спины',
    description: 'Комплекс упражнений для укрепления мышечного корсета и поддержания правильной осанки',
    imageUrl: '/images/practices/back-strength.jpg',
    duration: 25,
    practiceType: 'body',
    difficulty: 'intermediate',
    tags: ['осанка', 'спина', 'укрепление'],
    goals: ['сила спины', 'профилактика болей'],
    bodyType: 'posture',
    instructor: 'Даниил Чернолуцкий',
    videoUrl: '/videos/back-strength.mp4'
  },

  // Медитативные практики
  {
    id: 'meditation-1',
    title: 'Медитация для расслабления',
    description: 'Мягкая медитация для снятия стресса и глубокого расслабления',
    imageUrl: '/images/practices/relaxation-meditation.jpg',
    duration: 10,
    practiceType: 'meditation',
    difficulty: 'beginner',
    tags: ['расслабление', 'стресс', 'сон'],
    goals: ['расслабление', 'спокойствие'],
    meditationType: 'relaxation',
    instructor: 'Даниил Чернолуцкий',
    audioUrl: '/audio/relaxation-meditation.mp3'
  },
  {
    id: 'meditation-2',
    title: 'Медитация перед сном',
    description: 'Практика для глубокого расслабления и подготовки к здоровому сну',
    imageUrl: '/images/practices/sleep-meditation.jpg',
    duration: 15,
    practiceType: 'meditation',
    difficulty: 'beginner',
    tags: ['сон', 'вечер', 'расслабление'],
    goals: ['здоровый сон', 'расслабление'],
    meditationType: 'sleep',
    instructor: 'Даниил Чернолуцкий',
    audioUrl: '/audio/sleep-meditation.mp3'
  },
  {
    id: 'meditation-3',
    title: 'Медитация для концентрации',
    description: 'Практика для улучшения фокуса внимания и продуктивности',
    imageUrl: '/images/practices/focus-meditation.jpg',
    duration: 12,
    practiceType: 'meditation',
    difficulty: 'intermediate',
    tags: ['концентрация', 'фокус', 'продуктивность'],
    goals: ['концентрация', 'ясность ума'],
    meditationType: 'concentration',
    instructor: 'Даниил Чернолуцкий',
    audioUrl: '/audio/focus-meditation.mp3'
  },
  {
    id: 'meditation-4',
    title: 'Работа с эмоциями',
    description: 'Практика для распознавания и трансформации сложных эмоциональных состояний',
    imageUrl: '/images/practices/emotions-meditation.jpg',
    duration: 20,
    practiceType: 'meditation',
    difficulty: 'advanced',
    tags: ['эмоции', 'осознанность', 'принятие'],
    goals: ['эмоциональный баланс', 'принятие'],
    meditationType: 'emotions',
    instructor: 'Даниил Чернолуцкий',
    audioUrl: '/audio/emotions-meditation.mp3'
  },

  // Дыхательные практики
  {
    id: 'breathing-1',
    title: 'Утренняя дыхательная практика',
    description: 'Энергетическое дыхание для бодрости и заряда энергией',
    imageUrl: '/images/practices/morning-breathing.jpg',
    duration: 5,
    practiceType: 'breathing',
    difficulty: 'beginner',
    tags: ['утро', 'энергия', 'бодрость'],
    goals: ['энергия', 'ясность ума'],
    breathingIntensity: 'medium',
    instructor: 'Даниил Чернолуцкий',
    audioUrl: '/audio/morning-breathing.mp3'
  },
  {
    id: 'breathing-2',
    title: 'Дыхание для расслабления',
    description: 'Мягкая дыхательная практика для снятия напряжения и стресса',
    imageUrl: '/images/practices/relax-breathing.jpg',
    duration: 7,
    practiceType: 'breathing',
    difficulty: 'beginner',
    tags: ['расслабление', 'стресс', 'вечер'],
    goals: ['расслабление', 'спокойствие'],
    breathingIntensity: 'mild',
    instructor: 'Даниил Чернолуцкий',
    audioUrl: '/audio/relax-breathing.mp3'
  },
  {
    id: 'breathing-3',
    title: 'Дыхание Уджайи',
    description: 'Классическая йогическая дыхательная практика для концентрации и энергии',
    imageUrl: '/images/practices/ujjayi-breathing.jpg',
    duration: 10,
    practiceType: 'breathing',
    difficulty: 'intermediate',
    tags: ['концентрация', 'энергия', 'йога'],
    goals: ['концентрация', 'энергетический баланс'],
    breathingIntensity: 'medium',
    instructor: 'Даниил Чернолуцкий',
    audioUrl: '/audio/ujjayi-breathing.mp3'
  },
  {
    id: 'breathing-4',
    title: 'Вим Хоф дыхание',
    description: 'Интенсивная дыхательная практика для укрепления иммунитета и выносливости',
    imageUrl: '/images/practices/wim-hof-breathing.jpg',
    duration: 15,
    practiceType: 'breathing',
    difficulty: 'advanced',
    tags: ['интенсивное', 'иммунитет', 'выносливость'],
    goals: ['иммунитет', 'энергия', 'сила'],
    breathingIntensity: 'intense',
    instructor: 'Даниил Чернолуцкий',
    audioUrl: '/audio/wim-hof-breathing.mp3'
  }
];

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
  return practices.filter(practice => {
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