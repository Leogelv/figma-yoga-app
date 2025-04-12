#!/bin/bash

# Скрипт для загрузки изображений для Figma-практик йоги

# Создаем директорию для изображений, если она не существует
mkdir -p public/images/practices/figma

echo "Загружаю изображения для Figma-практик..."

# Изображения позиций йоги из Unsplash и других бесплатных ресурсов
curl -o public/images/practices/figma/downward-dog.jpg https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800
curl -o public/images/practices/figma/warrior.jpg https://images.unsplash.com/photo-1588286840104-8457f598f7b5?q=80&w=800
curl -o public/images/practices/figma/lotus.jpg https://images.unsplash.com/photo-1545389336-cf090694435e?q=80&w=800
curl -o public/images/practices/figma/tree-pose.jpg https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800
curl -o public/images/practices/figma/cobra-pose.jpg https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?q=80&w=800
curl -o public/images/practices/figma/child-pose.jpg https://images.unsplash.com/photo-1559595500-e15296bdbb48?q=80&w=800

# Дополнительные общие изображения
curl -o public/images/practices/figma/flow-sequence.jpg https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=800
curl -o public/images/practices/figma/meditation-pose.jpg https://images.unsplash.com/photo-1522075782449-e45a34f1ddfb?q=80&w=800
curl -o public/images/practices/figma/breathing.jpg https://images.unsplash.com/photo-1552693673-1bf958298935?q=80&w=800

echo "Изображения для Figma-практик загружены в директорию public/images/practices/figma/" 