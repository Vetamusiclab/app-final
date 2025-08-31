'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [showLoginOptions, setShowLoginOptions] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-bg text-text text-center px-4">
      {/* Логотип */}
      <div className="mb-6">
        <Image
          src="/logo.png" // кладём логотип в папку public
          alt="Логотип"
          width={120}
          height={120}
          priority
        />
      </div>

      {/* Заголовок */}
      <h1 className="text-4xl md:text-5xl font-bold mb-10 text-text">
        Творческая Лаборатория <br /> Веты Гулливер
      </h1>

      {/* Кнопка Войти */}
      <button
        onClick={() => setShowLoginOptions(true)}
        className="px-8 py-3 bg-primary text-white font-semibold rounded-2xl shadow-lg hover:bg-accent transition"
      >
        Войти
      </button>

      {/* Модальное окно выбора роли */}
      {showLoginOptions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-80 text-center">
            <h3 className="text-lg font-bold mb-4 text-[#111111]">Выберите роль</h3>
            <div className="flex flex-col gap-3">
              <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-accent transition">
                Ученик
              </button>
              <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-accent transition">
                Преподаватель
              </button>
              <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-accent transition">
                Админ
              </button>
            </div>
            <button
              className="mt-6 text-sm text-[#333333] hover:underline"
              onClick={() => setShowLoginOptions(false)}
            >
              Назад
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
