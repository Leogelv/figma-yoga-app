# Документация по практикам

## Обзор

Практики - это основная сущность приложения. Они представляют собой различные упражнения, которые пользователь может выполнять: телесные практики (йога, осанка), медитации, дыхательные практики.

## Структура данных

Практики определены в модуле `data/practices.ts` и имеют следующую структуру:

```typescript
interface Practice {
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
  vimeoId?: string; // ID видео в Vimeo
}
```

## Источники данных

Практики могут загружаться из двух источников:
1. **API** - внешний API, предоставляющий данные о практиках (`fetchPractices` в services/api.ts)
2. **Моковые данные** - набор предопределенных практик, используемый, если API недоступен

## Изображения практик

Изображения практик хранятся в директории `/public/images/practices/` и загружаются автоматически. Также используются превью из Vimeo, если практика имеет видео на этой платформе.

### Структура изображений

- **default-practice.jpg** - изображение по умолчанию, используется, если специфическое изображение недоступно
- **Телесные практики:**
  - morning-yoga.jpg - утренняя йога
  - power-yoga.jpg - силовая йога
  - balance-yoga.jpg - йога для баланса
  - posture-beginner.jpg - начальные практики для осанки
  - back-strength.jpg - укрепление спины
  - tension-relief.jpg - снятие напряжения
- **Медитации:**
  - relaxation-meditation.jpg - медитация для расслабления
  - focus-meditation.jpg - медитация для концентрации
  - sleep-meditation.jpg - медитация для сна
  - emotions-meditation.jpg - работа с эмоциями
- **Дыхательные практики:**
  - morning-breathing.jpg - утреннее дыхание
  - relax-breathing.jpg - дыхание для расслабления
  - ujjayi-breathing.jpg - дыхание уджайи
  - wim-hof-breathing.jpg - дыхание по методу Вим Хофа

### Утилиты для работы с изображениями

В модуле `utils/imageUtils.ts` определены следующие функции:

1. `getPracticeImageUrl(practiceId, vimeoId, forceDefault)` - получение URL изображения практики
2. `preloadPracticeImages(practices)` - предзагрузка изображений для практик
3. `getMockPracticeImageUrl(practiceType, additionalProps)` - получение URL изображения для моковых практик

## Фильтрация практик

Практики можно фильтровать по различным параметрам с помощью функции `filterPractices` из модуля `data/practices.ts`:

```typescript
const filteredPractices = filterPractices({
  practiceType: 'body',
  difficulty: 'beginner',
  duration: [15, 30], // минимальная и максимальная длительность
  bodyType: 'yoga',
  goals: ['расслабление', 'гибкость']
});
```

## Компоненты для отображения практик

1. `PracticeCard` - карточка практики для отображения в списке
2. `app/practice/[id]/page.tsx` - страница детальной информации о практике

## Порядок загрузки данных

1. При загрузке приложения вызывается функция `loadPractices`, которая загружает данные о практиках из API
2. Если API недоступен или возвращает пустой массив, используются моковые данные
3. Функция `getPractices` возвращает уже загруженные практики или моковые данные, если загрузка не выполнялась 