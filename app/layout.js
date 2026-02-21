export const metadata = {
  title: 'ВидеоПоиск',
  description: 'Найди где смотреть фильм или сериал — поиск по Кинопоиску, Иви, Окко, Старт, YouTube и ВКонтакте',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
