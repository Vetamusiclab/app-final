import './globals.css'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'MUSIC.LAB',
  description: 'Платформа музыкальной школы',
  icons: { icon: '/favicon.svg' }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="min-h-screen">
        <header className="border-b">
          <div className="container flex items-center gap-3 py-3">
            <Image src="/logo.svg" alt="MUSIC.LAB" width={36} height={36} />
            <Link href="/" className="text-xl font-semibold">MUSIC.LAB</Link>
            <nav className="ml-auto flex gap-4 text-sm">
              <Link href="/login/role" className="hover:underline">Войти</Link>
            </nav>
          </div>
        </header>
        <main className="container py-6">{children}</main>
        <footer className="mt-10 border-t">
          <div className="container py-6 text-sm text-neutral-500">© {new Date().getFullYear()} MUSIC.LAB</div>
        </footer>
      </body>
    </html>
  )
}
