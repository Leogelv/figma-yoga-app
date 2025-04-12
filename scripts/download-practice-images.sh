#!/bin/bash

# Скрипт для загрузки изображений для практик йоги
# Этот скрипт загружает изображения из Unsplash для различных типов практик йоги

# Создаем директории, если их нет
mkdir -p public/images/practices

echo "Загружаю изображения для практик..."

# Телесные практики - йога
curl -L -o public/images/practices/morning-yoga.jpg https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800
curl -L -o public/images/practices/power-yoga.jpg https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=800
curl -L -o public/images/practices/balance-yoga.jpg https://images.unsplash.com/photo-1545389336-cf090694435e?q=80&w=800
curl -L -o public/images/practices/tension-relief.jpg https://images.unsplash.com/photo-1510894347713-fc3ed6fdf539?q=80&w=800

# Телесные практики - осанка
curl -L -o public/images/practices/posture-beginner.jpg https://images.unsplash.com/photo-1616699002805-0741e1e4a9c5?q=80&w=800
curl -L -o public/images/practices/back-strength.jpg https://images.unsplash.com/photo-1566501206188-5dd0cf160a0e?q=80&w=800

# Медитации
curl -L -o public/images/practices/relaxation-meditation.jpg https://images.unsplash.com/photo-1470137237906-d8a4f71e1966?q=80&w=800
curl -L -o public/images/practices/focus-meditation.jpg https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=800
curl -L -o public/images/practices/sleep-meditation.jpg https://images.unsplash.com/photo-1455642305362-a884a8b0d090?q=80&w=800
curl -L -o public/images/practices/emotions-meditation.jpg https://images.unsplash.com/photo-1529693662653-9d480530a697?q=80&w=800

# Дыхательные практики
curl -L -o public/images/practices/morning-breathing.jpg https://images.unsplash.com/photo-1517964603305-4d9f311e6d79?q=80&w=800
curl -L -o public/images/practices/relax-breathing.jpg https://images.unsplash.com/photo-1484627147104-f5197bcd6651?q=80&w=800
curl -L -o public/images/practices/ujjayi-breathing.jpg https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=800
curl -L -o public/images/practices/wim-hof-breathing.jpg https://images.unsplash.com/photo-1573126617899-41f1dffb196c?q=80&w=800

# Загружаем изображение по умолчанию
curl -L -o public/images/practices/default-practice.jpg https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800

echo "Изображения для практик загружены в директорию public/images/practices/" 