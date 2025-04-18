/**
 * Утилиты для работы с изображениями практик
 */

/**
 * Генерирует URL-адрес изображения практики
 * Если у практики есть vimeoId, использует его для получения превью с Vimeo
 * В противном случае возвращает локальное изображение из /public/images/practices
 * Или изображение по умолчанию, если соответствующее изображение не найдено
 */
export const getPracticeImageUrl = (
  practiceId: string,
  vimeoId?: string,
  forceDefault: boolean = false
): string => {
  if (forceDefault) {
    return '/images/practices/default-practice.jpg';
  }

  // Если есть Vimeo ID, используем превью из Vimeo
  if (vimeoId) {
    // Очищаем ID от потенциального формата "12345/video"
    const vimeoIdClean = vimeoId.split('/')[0];
    return `https://vumbnail.com/${vimeoIdClean}.jpg`;
  }

  // Если это Figma-практика, проверяем соответствующую папку
  if (practiceId.includes('figma-')) {
    const figmaId = practiceId.replace('figma-', '');
    const figmaImages = [
      'downward-dog.jpg',
      'warrior.jpg',
      'lotus.jpg',
      'tree-pose.jpg',
      'cobra-pose.jpg',
      'child-pose.jpg',
      'flow-sequence.jpg',
      'meditation-pose.jpg',
      'breathing.jpg'
    ];
    
    // Выбираем изображение на основе ID
    if (parseInt(figmaId) <= figmaImages.length) {
      return `/images/practices/figma/${figmaImages[parseInt(figmaId) - 1]}`;
    }
    
    return '/images/practices/figma/yoga-default.jpg';
  }

  // Пытаемся найти картинку по ID практики (если это mockPractice)
  if (practiceId.includes('body-')) {
    const bodyId = practiceId.replace('body-', '');
    const bodyType = parseInt(bodyId) <= 3 ? 'yoga' : 'posture';
    
    // Выбираем изображение на основе типа практики и ID
    switch (bodyType) {
      case 'yoga':
        if (parseInt(bodyId) % 4 === 1) return '/images/practices/morning-yoga.jpg';
        if (parseInt(bodyId) % 4 === 2) return '/images/practices/power-yoga.jpg';
        if (parseInt(bodyId) % 4 === 3) return '/images/practices/balance-yoga.jpg';
        return '/images/practices/tension-relief.jpg';
      case 'posture':
        if (parseInt(bodyId) % 2 === 1) return '/images/practices/posture-beginner.jpg';
        return '/images/practices/back-strength.jpg';
    }
  } else if (practiceId.includes('meditation-')) {
    const medId = practiceId.replace('meditation-', '');
    const meditationType = parseInt(medId) % 4;
    
    // Выбираем изображение на основе типа медитации
    switch (meditationType) {
      case 0: return '/images/practices/relaxation-meditation.jpg';
      case 1: return '/images/practices/focus-meditation.jpg';
      case 2: return '/images/practices/sleep-meditation.jpg';
      case 3: return '/images/practices/emotions-meditation.jpg';
    }
  } else if (practiceId.includes('breathing-')) {
    const breathId = practiceId.replace('breathing-', '');
    const breathType = parseInt(breathId) % 4;
    
    // Выбираем изображение на основе типа дыхательной практики
    switch (breathType) {
      case 0: return '/images/practices/morning-breathing.jpg';
      case 1: return '/images/practices/relax-breathing.jpg';
      case 2: return '/images/practices/ujjayi-breathing.jpg';
      case 3: return '/images/practices/wim-hof-breathing.jpg';
    }
  }

  // По умолчанию возвращаем изображение-заглушку
  return '/images/practices/default-practice.jpg';
};

/**
 * Предзагрузка изображений для практик
 * Используется для ускорения загрузки UI
 */
export const preloadPracticeImages = (practices: { id: string; imageUrl?: string }[]): void => {
  // Создаем уникальный набор URL изображений
  const imageUrls = new Set<string>();
  
  practices.forEach(practice => {
    if (practice.imageUrl) {
      imageUrls.add(practice.imageUrl);
    }
  });

  // Предзагружаем каждое изображение
  imageUrls.forEach(url => {
    const img = new Image();
    img.src = url;
  });
};

/**
 * Определяет ссылку на изображение для моковых практик
 * на основе типа практики и дополнительных параметров
 */
export const getMockPracticeImageUrl = (
  practiceType: 'body' | 'meditation' | 'breathing',
  additionalProps: {
    bodyType?: 'yoga' | 'posture';
    meditationType?: 'relaxation' | 'concentration' | 'sleep' | 'emotions';
    breathingIntensity?: 'mild' | 'medium' | 'intense';
  } = {}
): string => {
  switch (practiceType) {
    case 'body':
      if (additionalProps.bodyType === 'yoga') {
        // Случайный выбор изображения для йоги
        const yogaImages = [
          '/images/practices/morning-yoga.jpg',
          '/images/practices/power-yoga.jpg',
          '/images/practices/balance-yoga.jpg',
          '/images/practices/tension-relief.jpg'
        ];
        return yogaImages[Math.floor(Math.random() * yogaImages.length)];
      } else {
        // Случайный выбор изображения для осанки
        const postureImages = [
          '/images/practices/posture-beginner.jpg',
          '/images/practices/back-strength.jpg'
        ];
        return postureImages[Math.floor(Math.random() * postureImages.length)];
      }
    case 'meditation':
      // Выбор изображения на основе типа медитации
      switch (additionalProps.meditationType) {
        case 'relaxation':
          return '/images/practices/relaxation-meditation.jpg';
        case 'concentration':
          return '/images/practices/focus-meditation.jpg';
        case 'sleep':
          return '/images/practices/sleep-meditation.jpg';
        case 'emotions':
          return '/images/practices/emotions-meditation.jpg';
        default:
          // Случайный выбор изображения для медитации
          const meditationImages = [
            '/images/practices/relaxation-meditation.jpg',
            '/images/practices/focus-meditation.jpg',
            '/images/practices/sleep-meditation.jpg',
            '/images/practices/emotions-meditation.jpg'
          ];
          return meditationImages[Math.floor(Math.random() * meditationImages.length)];
      }
    case 'breathing':
      // Случайный выбор изображения для дыхательных практик
      const breathingImages = [
        '/images/practices/morning-breathing.jpg',
        '/images/practices/relax-breathing.jpg',
        '/images/practices/ujjayi-breathing.jpg',
        '/images/practices/wim-hof-breathing.jpg'
      ];
      return breathingImages[Math.floor(Math.random() * breathingImages.length)];
    default:
      return '/images/practices/default-practice.jpg';
  }
}; 