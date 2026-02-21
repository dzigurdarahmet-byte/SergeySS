'use client';
import { useState } from 'react';

const SERVICES = [
  { name: 'Кинопоиск', color: '#FF6200', url: 'https://www.kinopoisk.ru/index.php?kp_query=' },
  { name: 'Иви', color: '#0abab5', url: 'https://www.ivi.ru/search/?q=' },
  { name: 'Окко', color: '#7B2FBE', url: 'https://okko.tv/search?query=' },
  { name: 'Старт', color: '#E4003A', url: 'https://start.ru/search?q=' },
  { name: 'YouTube', color: '#FF0000', url: 'https://www.youtube.com/results?search_query=' },
  { name: 'ВКонтакте', color: '#0077FF', url: 'https://vk.com/video?q=' },
];

export default function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = process.env.NEXT_PUBLIC_KINOPOISK_API_KEY;

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setSearched(true);
    setError('');
    setResults([]);
    try {
      const url =
        'https://api.kinopoisk.dev/v1.4/movie/search?query=' +
        encodeURIComponent(query) +
        '&limit=5&page=1';
      const response = await fetch(url, {
        headers: { 'X-API-KEY': API_KEY },
      });
      if (!response.ok) {
        throw new Error('Ошибка сервера: ' + response.status);
      }
      const data = await response.json();
      if (data.docs && data.docs.length > 0) {
        setResults(data.docs);
      } else {
        setError('Ничего не найдено. Попробуй другой запрос.');
      }
    } catch (e) {
      setError('Ошибка: ' + e.message);
    }
    setLoading(false);
  };

  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundColor: '#0a0a0a',
        color: 'white',
        fontFamily: '"Segoe UI", Arial, sans-serif',
      }}
    >
      <header
        style={{
          padding: '24px 40px',
          borderBottom: '1px solid #222',
          display: 'flex',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          backgroundColor: 'rgba(10,10,10,0.95)',
          zIndex: 100,
        }}
      >
        <span style={{ fontSize: '28px', marginRight: '10px' }}>🎬</span>
        <h1 style={{ color: '#FF4B2B', margin: 0, fontSize: '24px', fontWeight: '800' }}>
          ВидеоПоиск
        </h1>
      </header>

      <div style={{ textAlign: 'center', padding: '80px 20px 50px' }}>
        <h2 style={{ fontSize: '42px', fontWeight: '800', marginBottom: '12px' }}>
          Найди где смотреть
        </h2>
        <p style={{ color: '#666', marginBottom: '40px', fontSize: '16px' }}>
          Ищем сразу по Кинопоиску, Иви, Окко, YouTube и ВКонтакте
        </p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            maxWidth: '700px',
            margin: '0 auto',
          }}
        >
          <input
            type="text"
            placeholder="Название фильма или сериала..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            style={{
              flex: 1,
              padding: '16px 22px',
              fontSize: '16px',
              borderRadius: '12px',
              border: '1px solid #333',
              backgroundColor: '#111',
              color: 'white',
              outline: 'none',
            }}
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            style={{
              padding: '16px 32px',
              background: 'linear-gradient(135deg, #FF4B2B, #FF8E53)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '700',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? 'Ищем...' : 'Найти'}
          </button>
        </div>
      </div>

      {error && (
        <p style={{ textAlign: 'center', color: '#FF4B2B', padding: '20px' }}>{error}</p>
      )}

      {searched && !loading && results.length > 0 && (
        <div style={{ maxWidth: '960px', margin: '0 auto', padding: '0 20px 80px' }}>
          <p style={{ color: '#555', marginBottom: '24px', fontSize: '14px' }}>
            Найдено: {results.length} по запросу &ldquo;{query}&rdquo;
          </p>
          {results.map((film) => (
            <div
              key={film.id}
              style={{
                backgroundColor: '#111',
                border: '1px solid #222',
                borderRadius: '16px',
                padding: '24px',
                marginBottom: '20px',
                display: 'flex',
                gap: '24px',
              }}
            >
              {film.poster && film.poster.url ? (
                <img
                  src={film.poster.url}
                  alt={film.name}
                  style={{
                    width: '90px',
                    height: '130px',
                    borderRadius: '10px',
                    objectFit: 'cover',
                    flexShrink: 0,
                  }}
                />
              ) : (
                <div
                  style={{
                    width: '90px',
                    height: '130px',
                    borderRadius: '10px',
                    backgroundColor: '#1a1a1a',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '36px',
                    flexShrink: 0,
                  }}
                >
                  🎬
                </div>
              )}
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '8px',
                    flexWrap: 'wrap',
                  }}
                >
                  <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '700' }}>
                    {film.name || film.alternativeName || 'Без названия'}
                  </h3>
                  {film.year && (
                    <span
                      style={{
                        color: '#666',
                        fontSize: '14px',
                        backgroundColor: '#1a1a1a',
                        padding: '2px 8px',
                        borderRadius: '6px',
                      }}
                    >
                      {film.year}
                    </span>
                  )}
                  {film.rating && film.rating.kp > 0 && (
                    <span
                      style={{
                        background: 'linear-gradient(135deg, #FF4B2B, #FF8E53)',
                        padding: '3px 10px',
                        borderRadius: '6px',
                        fontSize: '14px',
                        fontWeight: '700',
                      }}
                    >
                      ⭐ {film.rating.kp.toFixed(1)}
                    </span>
                  )}
                </div>
                {film.genres && film.genres.length > 0 && (
                  <p style={{ color: '#666', margin: '0 0 12px', fontSize: '13px' }}>
                    {film.genres.map((g) => g.name).join(', ')}
                  </p>
                )}
                {film.description && (
                  <p
                    style={{
                      color: '#888',
                      margin: '0 0 16px',
                      fontSize: '14px',
                      lineHeight: '1.5',
                    }}
                  >
                    {film.description.slice(0, 180)}...
                  </p>
                )}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {SERVICES.map((service) => (
                    <a
                      key={service.name}
                      href={
                        service.url +
                        encodeURIComponent(film.name || film.alternativeName || query)
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        padding: '7px 14px',
                        backgroundColor: service.color,
                        color: 'white',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        fontSize: '13px',
                        fontWeight: '600',
                      }}
                    >
                      {service.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!searched && (
        <div style={{ textAlign: 'center', padding: '40px 20px', color: '#333' }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>🍿</div>
          <p style={{ fontSize: '16px' }}>
            Введи название фильма или сериала чтобы начать поиск
          </p>
        </div>
      )}
    </main>
  );
}
