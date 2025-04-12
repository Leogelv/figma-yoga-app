#!/bin/bash

# Создаем директорию для изображений практик если она не существует
mkdir -p public/images/practices

# Загружаем изображения с Unsplash для разных типов практик

# Yoga практики
curl -o public/images/practices/morning-yoga.jpg https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?q=80&w=800
curl -o public/images/practices/tension-relief.jpg https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800
curl -o public/images/practices/power-yoga.jpg https://images.unsplash.com/photo-1599447292180-45fd84092ef4?q=80&w=800
curl -o public/images/practices/balance-yoga.jpg https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=800

# Posture практики
curl -o public/images/practices/posture-beginner.jpg https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800
curl -o public/images/practices/back-strength.jpg https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800

# Meditation практики
curl -o public/images/practices/relaxation-meditation.jpg https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?q=80&w=800
curl -o public/images/practices/sleep-meditation.jpg https://images.unsplash.com/photo-1512438248247-f0f2a5a8b7f0?q=80&w=800
curl -o public/images/practices/focus-meditation.jpg https://images.unsplash.com/photo-1470137237906-d8a3ef3ded33?q=80&w=800
curl -o public/images/practices/emotions-meditation.jpg https://images.unsplash.com/photo-1508672019048-805c876b67e2?q=80&w=800

# Breathing практики
curl -o public/images/practices/morning-breathing.jpg https://images.unsplash.com/photo-1545389336-cf090694435e?q=80&w=800
curl -o public/images/practices/relax-breathing.jpg https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800
curl -o public/images/practices/ujjayi-breathing.jpg https://images.unsplash.com/photo-1552693673-1bf958298935?q=80&w=800
curl -o public/images/practices/wim-hof-breathing.jpg https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800

echo "Изображения для практик загружены в директорию public/images/practices/" 