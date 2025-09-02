// app/page.tsx
'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [showRoles, setShowRoles] = useState(false);

  return (
    <main className="flex min-h-screen items-center justify-center px-6 bg-[var(--bg-soft)]">
      <div className="max-w-2xl text-center hero-container">
        {/* Логотип — public/logo.png */}
        <div className="mx-auto w-36 h-36 relative mb-6">
          <Image src="/logo.png" alt="MusicLab logo" fill style={{ objectFit: 'contain' }} />
        </div>

        {/* Заголовок (чёрный) */}
        <h1 className="brand-headline text-4xl md:text-6xl font-extrabold mb-6 hero-title">
          Творческая Лаборатория <br /> Веты Гулливер
        </h1>

        {/* Кнопка Войти — оранжевая */}
        <button
          onClick={() => setShowRoles(true)}
          className="btn-primary text-lg"
          aria-label="Войти"
        >
          Войти
        </button>

        {/* Модальное окно выбора роли */}
        {showRoles && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-80 text-center">
              <h3 className="text-lg font-semibold mb-4">Войти как</h3>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => router.push('/login/student')}
                  className="btn-primary"
                >
                  Ученик
                </button>

                <button
                  onClick={() => router.push('/login/teacher')}
                  className="btn-primary"
                >
                  Преподаватель
                </button>

                <button
                  onClick={() => router.push('/login/admin')}
                  className="btn-primary"
                >
                  Админ
                </button>
              </div>

              <button
                onClick={() => setShowRoles(false)}
                className="mt-4 text-sm text-gray-600 btn-ghost"
                aria-label="Назад"
              >
                Назад
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
