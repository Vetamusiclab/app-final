'use client';

import { useState } from 'react';

export default function Home() {
  const [showLoginOptions, setShowLoginOptions] = useState(false);

  return (
    <main className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="w-full flex justify-between items-center px-8 py-4 shadow-md bg-white">
        <div className="flex items-center gap-3">
          <img src="/favicon.ico" alt="MusicLab Logo" className="w-10 h-10" />
          <h1 className="text-xl font-bold text-primary">
            Творческая Лаборатория Веты Гулливер
          </h1>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-base cursor-pointer hover:text-primary transition">
            Личный кабинет
          </span>
          <button
            onClick={() => setShowLoginOptions(!showLoginOptions)}
            className="px-5 py-2 bg-primary text-white rounded-xl font-semibold shadow-md hover:bg-accent transition"
          >
            Войти
          </button>
        </div>
      </header>

      {/* Hero section */}
      <section className="flex flex-col flex-1 items-center justify-center text-center px-6 bg-gradient-to-br from-[#FFE0B2] to-[#FFFFFF]">
        <h2 className="text-5xl font-bold text-text mb-6">
          Добро пожаловать в <span className="text-primary">MusicLab</span>
        </h2>
        <p className="text-lg text-[#333333] max-w-2xl mb-10">
          Онлайн-платформа для музыкантов, преподавателей и учеников.
          Учитесь, занимайтесь и развивайтесь вместе с нами.
        </p>
        <button className="px-8 py-3 bg-accent text-white font-semibold rounded-2xl shadow-lg hover:bg-primary transition">
          Начать
        </button>
      </section>

      {/* Login Options Modal */}
      {showLoginOptions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-80 text-center">
            <h3 className="text-lg font-bold mb-4">Выберите роль</h3>
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
              Закрыть
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
