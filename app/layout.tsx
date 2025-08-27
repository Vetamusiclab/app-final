import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'MusicLab',
  description: 'Онлайн-платформа для музыкантов и учеников',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  )
}
