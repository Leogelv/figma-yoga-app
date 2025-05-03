import { ApiPractice } from '@/types/practice';

const API_URL = 'https://yozhit.ru/version-test/api/1.1/obj/practice';

interface ApiResponse {
  response: {
    results: ApiPractice[];
    cursor: number;
    count: number;
    remaining: number;
  };
}

/**
 * Загружает список практик с API.
 */
export async function fetchPractices(): Promise<ApiPractice[]> {
  console.log('Fetching practices from API...');
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: ApiResponse = await response.json();
    console.log(`Fetched ${data.response.results.length} practices.`);
    // Фильтруем только активные практики (не черновики)
    const activePractices = data.response.results.filter(p => !p.draft);
    console.log(`Returning ${activePractices.length} active practices.`);
    return activePractices;
  } catch (error) {
    console.error('Error fetching practices:', error);
    // Возвращаем пустой массив в случае ошибки
    return []; 
  }
} 