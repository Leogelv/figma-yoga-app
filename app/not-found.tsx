export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-lg mb-8">Страница не найдена</p>
      <a
        href="/"
        className="px-6 py-3 bg-blue-500 text-white rounded-full font-medium"
      >
        На главную
      </a>
    </div>
  );
} 