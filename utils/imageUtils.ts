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

  // Пытаемся найти картинку по ID практики (если это mockPractice)
  if (practiceId.includes('body-')) {
    const bodyId = practiceId.replace('body-', '');
    const bodyType = parseInt(bodyId) <= 3 ? 'yoga' : 'posture';
    
    switch (bodyType) {
      case 'yoga':
        if (parseInt(bodyId) % 3 === 1) return '/images/practices/morning-yoga.jpg';
        if (parseInt(bodyId) % 3 === 2) return '/images/practices/power-yoga.jpg';
        return '/images/practices/balance-yoga.jpg';
      case 'posture':
        if (parseInt(bodyId) % 2 === 1) return '/images/practices/posture-beginner.jpg';
        return '/images/practices/back-strength.jpg';
    }
  } else if (practiceId.includes('meditation-')) {
    const medId = practiceId.replace('meditation-', '');
    const meditationType = parseInt(medId) % 4;
    
    switch (meditationType) {
      case 0: return '/images/practices/relaxation-meditation.jpg';
      case 1: return '/images/practices/focus-meditation.jpg';
      case 2: return '/images/practices/sleep-meditation.jpg';
      case 3: return '/images/practices/emotions-meditation.jpg';
    }
  } else if (practiceId.includes('breathing-')) {
    const breathId = practiceId.replace('breathing-', '');
    const breathType = parseInt(breathId) % 3;
    
    switch (breathType) {
      case 0: return '/images/practices/morning-breathing.jpg';
      case 1: return '/images/practices/relax-breathing.jpg';
      case 2: return '/images/practices/ujjayi-breathing.jpg';
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
  } = {}
): string => {
  switch (practiceType) {
    case 'body':
      if (additionalProps.bodyType === 'yoga') {
        return '/images/practices/morning-yoga.jpg';
      } else {
        return '/images/practices/posture-beginner.jpg';
      }
    case 'meditation':
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
          return '/images/practices/relaxation-meditation.jpg';
      }
    case 'breathing':
      return '/images/practices/morning-breathing.jpg';
    default:
      return '/images/practices/default-practice.jpg';
  }
}; 