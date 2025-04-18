# Документация по медиа-ресурсам

## Структура медиа-файлов

### Изображения практик

Все изображения для практик хранятся в директории `/public/images/practices/`. Имена файлов соответствуют полю `imageUrl` в объектах практик из файла `data/practices.ts`.

#### Соглашение об именовании
Файлы называются в соответствии с типом практики и ее назначением:
- `[type]-[name].jpg` - где `type` - тип практики, `name` - короткое название практики

#### Размеры изображений
- Рекомендуемый размер: 800x600 пикселей
- Формат: JPEG с оптимизацией для веба

#### Список изображений для практик
```
- morning-yoga.jpg - Утренняя йога для бодрости
- tension-relief.jpg - Йога для снятия напряжения
- power-yoga.jpg - Силовая йога
- balance-yoga.jpg - Продвинутая практика баланса
- posture-beginner.jpg - Коррекция осанки для начинающих
- back-strength.jpg - Укрепление мышц спины
- relaxation-meditation.jpg - Медитация для расслабления
- sleep-meditation.jpg - Медитация перед сном
- focus-meditation.jpg - Медитация для концентрации
- emotions-meditation.jpg - Работа с эмоциями
- morning-breathing.jpg - Утренняя дыхательная практика
- relax-breathing.jpg - Дыхание для расслабления
- ujjayi-breathing.jpg - Дыхание Уджайи
- wim-hof-breathing.jpg - Вим Хоф дыхание
```

### Аудио-файлы практик

Аудио-файлы для медитаций и дыхательных практик должны быть сохранены в директории `/public/audio/`. В рабочей версии приложения аудио еще не интегрировано.

#### Соглашение об именовании
- `[type]-[name].mp3` - для аудио файлов

#### Формат аудио
- Формат: MP3
- Битрейт: 128-192 kbps
- Рекомендуемое качество: Stereo

### Видео-файлы практик

Видео-файлы для телесных практик должны быть сохранены в директории `/public/videos/`. В рабочей версии приложения видео еще не интегрировано.

#### Соглашение об именовании
- `[type]-[name].mp4` - для видео файлов

#### Формат видео
- Формат: MP4 (H.264)
- Разрешение: 720p (1280x720)
- Соотношение сторон: 16:9

## Генерация заглушек для разработки

Для локальной разработки могут использоваться заглушки изображений.

### Скрипт для создания заглушек
```bash
node scripts/placeholder-images.js
```

Этот скрипт создает изображения-заглушки с названиями практик и градиентным фоном.

## Планы по улучшению медиа-контента

1. Добавление реальных фотографий практик
2. Интеграция видео инструкций для телесных практик
3. Добавление аудио-сопровождения для медитаций и дыхательных практик
4. Добавление возможности кэширования медиа-ресурсов для офлайн-использования
5. Оптимизация загрузки изображений через CDN 