// Тип данных для практики, основанный на API
export interface ApiPractice {
  _id: string;                 // Уникальный ID из Bubble
  id: number;                  // Числовой ID
  name: string;                // Название практики
  duration?: string;           // Длительность в формате "MM:SS"
  vimeo?: string;              // ID видео на Vimeo (для превью)
  kinescope?: string;          // Ссылка на Kinescope
  mp3_medit?: string;          // Ссылка на MP3 медитации
  type: string;                // Тип (практика, контент, учение)
  hard?: string;               // Сложность (Простая, Посложнее)
  "Yo.System"?: string;        // Категория (Yo.Bodymental, Yo.Health, Yo.Meditation, Yo.Base)
  descr?: string;              // Описание
  free?: boolean;              // Бесплатная?
  step?: string;               // Шаг (если применимо)
  compl?: string;              // Доп. поле сложности?
  draft?: boolean;             // Черновик?
  "?_webinar_rec"?: boolean; // Запись вебинара?
  "?_opentalk"?: boolean;
  "?_available"?: boolean;
  "Created By"?: string;
  "Modified Date"?: string;
  "Created Date"?: string;
}

// Функция для извлечения ID видео из поля vimeo
export const getVimeoId = (vimeoString?: string): string | null => {
  if (!vimeoString) return null;
  const match = vimeoString.match(/^(\d+)/);
  return match ? match[1] : null;
};

// Функция для получения URL превью
export const getPracticeThumbnailUrl = (practice: ApiPractice): string => {
  const vimeoId = getVimeoId(practice.vimeo);
  if (vimeoId) {
    return `https://vumbnail.com/${vimeoId}.jpg`;
  }
  // Возвращаем заглушку, если Vimeo ID не найден
  return '/images/placeholder.jpg'; 
}; 