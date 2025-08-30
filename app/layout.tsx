import './globals.css';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'MusicLab — Творческая Лаборатория Веты Гулливер',
  description: 'Онлайн-платформа для музыкантов и учеников',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={roboto.variable}>
      <body className="font-sans bg-white text-text">{children}</body>
    </html>
  );
}
