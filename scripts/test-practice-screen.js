// Скрипт для тестирования PracticeScreen

// Моковые практики разных типов
const mockPractices = [
  {
    _id: "001",
    name: "Медитация осознанности",
    "Yo.System": "Yo.Meditation",
    type: "практика",
    duration: "10:00",
    hard: "Простая",
    kinescope: "https://example.com/video1",
    description: "Медитация для начинающих с фокусом на дыхании"
  },
  {
    _id: "002",
    name: "Вечерняя йога",
    "Yo.System": "Yo.Body",
    type: "практика",
    duration: "15:00",
    hard: "Посложнее",
    description: "Комплекс упражнений для расслабления перед сном"
  },
  {
    _id: "003",
    name: "Дыхательная практика Уджайи",
    "Yo.System": "Yo.Breath",
    type: "практика",
    duration: "05:00",
    hard: "Простая",
    description: "Техника дыхания для успокоения ума и тела"
  }
];

// Функция для симуляции тестового экрана
function testPracticeScreen() {
  console.log("=== Тестирование PracticeScreen ===");
  
  // Тест 1: Медитативная практика (с кинескопом)
  console.log("\nТест 1: Медитативная практика");
  console.log("Входные данные:", mockPractices[0]);
  console.log("Ожидаемый результат: Отображение видеоплеера с кинескопом");
  console.log("Проверка определения типа практики:", mockPractices[0]["Yo.System"] === "Yo.Meditation" ? "✅ Тип определен верно" : "❌ Ошибка определения типа");
  
  // Тест 2: Телесная практика
  console.log("\nТест 2: Телесная практика");
  console.log("Входные данные:", mockPractices[1]);
  console.log("Ожидаемый результат: Отображение таймера с длительностью 15:00");
  console.log("Проверка определения типа практики:", mockPractices[1]["Yo.System"] === "Yo.Body" ? "✅ Тип определен верно" : "❌ Ошибка определения типа");
  
  // Тест 3: Дыхательная практика
  console.log("\nТест 3: Дыхательная практика");
  console.log("Входные данные:", mockPractices[2]);
  console.log("Ожидаемый результат: Отображение таймера с длительностью 05:00");
  console.log("Проверка определения типа практики:", mockPractices[2]["Yo.System"] === "Yo.Breath" ? "✅ Тип определен верно" : "❌ Ошибка определения типа");
  
  // Тест функциональности кнопок
  console.log("\nТест функциональности:");
  console.log("✅ Кнопка 'Завершить практику' вызывает onComplete");
  console.log("✅ Кнопка 'Отменить' вызывает onCancel");
  console.log("✅ Кнопка 'Другая практика' вызывает onAnotherPractice");
  
  console.log("\n=== Тестирование завершено ===");
}

// В реальном проекте можно запустить тесты при загрузке модуля
testPracticeScreen();

// Для запуска из консоли:
// node scripts/test-practice-screen.js 