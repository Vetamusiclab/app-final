'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function Home() {
  const [showLoginOptions, setShowLoginOptions] = useState(false)

  return (
    <main className="relative overflow-hidden flex min-h-screen flex-col items-center justify-center text-center px-4">
      {/* Декоративный едва заметный фон (не мешает тексту) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 h-[28rem] w-[28rem] opacity-15 blur-3xl"
        style={{
          background:
            'radial-gradient(closest-side, #FF8C42 0%, rgba(255,140,66,0.0) 70%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-48 -left-40 h-[24rem] w-[24rem] opacity-10 blur-3xl"
        style={{
          background:
            'radial-gradient(closest-side, #B23A48 0%, rgba(178,58,72,0.0) 70%)',
        }}
      />

      {/* Логотип (загрузи public/logo.png) */}
      <div className="mb-8">
        <Image
          src="/logo.png"
          alt="Логотип Веты Гулливер"
          width={120}
          height={120}
          className="mx-auto"
          priority
        />
      </div>

      {/* Заголовок — чёрный, фирменный шрифт */}
      <h1 className="font-pt-sans text-4xl md:text-6xl font-bold leading-tight mb-10 text-[#111111]">
        Творческая Лаборатория <br /> Веты Гулливер
      </h1>

      {/* Кнопка Войти — фирменный оранжевый, чёрный текст */}
      <button
        onClick={() => setShowLoginOptions(true)}
        className="px-10 py-4 rounded-2xl bg-[#FF8C42] text-[#111111] font-semibold shadow-[0_10px_25px_rgba(0,0,0,0.08)] hover:shadow-[0_14px_30px_rgba(0,0,0,0.12)] hover:scale-[1.02] active:scale-[0.99] transition-all duration-300 ring-1 ring-[#B23A48]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B23A48]"
      >
        Войти
      </button>

      {/* Модалка выбора роли */}
      {showLoginOptions && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowLoginOptions(false)}
        >
          <div
            className="bg-white p-8 rounded-2xl shadow-2xl w-80 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold mb-4">Выберите роль</h3>
            <div className="flex flex-col gap-3">
              <button className="px-4 py-2 rounded-lg bg-[#FF8C42] text-[#111111] hover:opacity-90 transition">
                Ученик
              </button>
              <button className="px-4 py-2 rounded-lg bg-[#FF8C42] text-[#111111] hover:opacity-90 transition">
                Преподаватель
              </button>
              <button className="px-4 py-2 rounded-lg bg-[#FF8C42] text-[#111111] hover:opacity-90 transition">
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
  )
}
