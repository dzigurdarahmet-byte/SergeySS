// Файл: app/api/search/route.js
// Серверный API-роут — ключ никогда не попадает в браузер

import { NextResponse } from 'next/server';

const API_KEY = process.env.KINOPOISK_API_KEY;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  if (!query || !query.trim()) {
    return NextResponse.json(
      { error: 'Параметр "query" обязателен' },
      { status: 400 }
    );
  }

  if (!API_KEY) {
    console.error('KINOPOISK_API_KEY не задан в .env.local');
    return NextResponse.json(
      { error: 'Ошибка конфигурации сервера' },
      { status: 500 }
    );
  }

  try {
    const url = `https://api.kinopoisk.dev/v1.4/movie/search?query=${encodeURIComponent(query)}&limit=5&page=1`;

    const response = await fetch(url, {
      headers: { 'X-API-KEY': API_KEY },
      // Кэшируем на 1 час чтобы не тратить лимиты API
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Ошибка API Кинопоиска: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (e) {
    console.error('Ошибка при запросе к Кинопоиску:', e);
    return NextResponse.json(
      { error: 'Не удалось выполнить поиск' },
      { status: 500 }
    );
  }
}
