const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// Создаем директорию для изображений практик если она не существует
const directoryPath = path.join(process.cwd(), 'public/images/practices');
if (!fs.existsSync(directoryPath)) {
  fs.mkdirSync(directoryPath, { recursive: true });
}

// Функция для создания изображения-заглушки по умолчанию
function createDefaultImage() {
  const width = 800;
  const height = 600;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Заливка фона градиентом
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#3498db');
  gradient.addColorStop(1, '#8e44ad');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Добавляем текст
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 60px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('YOGA', width / 2, height / 2 - 40);
  
  ctx.font = 'bold 40px Arial';
  ctx.fillText('PRACTICE', width / 2, height / 2 + 40);

  // Сохраняем изображение
  const buffer = canvas.toBuffer('image/jpeg');
  const filepath = path.join(directoryPath, 'default-practice.jpg');
  fs.writeFileSync(filepath, buffer);
  console.log(`Создано изображение по умолчанию: ${filepath}`);
}

createDefaultImage();

console.log('Изображение по умолчанию создано!'); 