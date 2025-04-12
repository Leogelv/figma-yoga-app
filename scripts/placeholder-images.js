const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// Создаем директорию для изображений практик если она не существует
const directoryPath = path.join(process.cwd(), 'public/images/practices');
if (!fs.existsSync(directoryPath)) {
  fs.mkdirSync(directoryPath, { recursive: true });
}

// Функция для создания изображения-заглушки с текстом
function createPlaceholderImage(filename, text, bgColor = '#3498db', textColor = '#ffffff') {
  const width = 800;
  const height = 600;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Заливка фона
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, width, height);

  // Добавляем градиент для украшения
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0.1)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Добавляем текст
  ctx.fillStyle = textColor;
  ctx.font = 'bold 40px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // Разбиваем текст на строки, если он длинный
  const words = text.split(' ');
  let lines = [];
  let currentLine = '';
  
  words.forEach(word => {
    const testLine = currentLine + word + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > width - 100) {
      lines.push(currentLine);
      currentLine = word + ' ';
    } else {
      currentLine = testLine;
    }
  });
  lines.push(currentLine);
  
  // Рисуем текст
  lines.forEach((line, i) => {
    ctx.fillText(line, width / 2, height / 2 - (lines.length - 1) * 24 + i * 48);
  });

  // Сохраняем изображение
  const buffer = canvas.toBuffer('image/jpeg');
  fs.writeFileSync(path.join(directoryPath, filename), buffer);
  console.log(`Создано изображение: ${filename}`);
}

// Создаем изображения для практик

// Yoga практики
createPlaceholderImage('morning-yoga.jpg', 'Утренняя йога для бодрости', '#4CAF50');
createPlaceholderImage('tension-relief.jpg', 'Йога для снятия напряжения', '#8E44AD');
createPlaceholderImage('power-yoga.jpg', 'Силовая йога', '#E74C3C');
createPlaceholderImage('balance-yoga.jpg', 'Продвинутая практика баланса', '#2980B9');

// Posture практики
createPlaceholderImage('posture-beginner.jpg', 'Коррекция осанки для начинающих', '#F39C12');
createPlaceholderImage('back-strength.jpg', 'Укрепление мышц спины', '#16A085');

// Meditation практики
createPlaceholderImage('relaxation-meditation.jpg', 'Медитация для расслабления', '#9B59B6');
createPlaceholderImage('sleep-meditation.jpg', 'Медитация перед сном', '#34495E');
createPlaceholderImage('focus-meditation.jpg', 'Медитация для концентрации', '#E67E22');
createPlaceholderImage('emotions-meditation.jpg', 'Работа с эмоциями', '#1ABC9C');

// Breathing практики
createPlaceholderImage('morning-breathing.jpg', 'Утренняя дыхательная практика', '#3498DB');
createPlaceholderImage('relax-breathing.jpg', 'Дыхание для расслабления', '#27AE60');
createPlaceholderImage('ujjayi-breathing.jpg', 'Дыхание Уджайи', '#D35400');
createPlaceholderImage('wim-hof-breathing.jpg', 'Вим Хоф дыхание', '#2C3E50');

console.log('Все изображения для практик созданы!'); 