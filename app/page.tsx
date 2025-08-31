'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function Home() {
  const [showLoginOptions, setShowLoginOptions] = useState(false)

  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-center px-4">
      {/* Логотип */}
      <div className="mb-6">
        <Image
          src="/logo.png" // загрузи свой логотип в public/logo.png
          alt="Логотип Веты Гулливер"
          width={120}
          height={120}
          className="mx-auto drop-shadow-lg"
          priority
        />
      </div>

      {/* Заголовок */}
      <h1 className="text-4xl md:text-5xl font-bold mb-10 font-pt-sans bg-clip-text text-transparent bg-gradient-to-r from-[#b23a48] to-[#ff8c42] drop-shadow-sm">
        Творческая Лаборатория <br /> Веты Гулливер
      </h1>

      {/* Кнопка Войти */}
      <button
        onClick={() => setShowLoginOptions(true)}
        className="px-10 py-4 bg-[#b23a48] text-white font-semibold rounded-2xl shadow-xl hover:scale-105 hover:bg-[#ff8c42] transition-all duration-300"
      >
        Войти
      </button>

      {/* Модальное окно выбора роли */}
      {showLoginOptions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-80 text-center">
            <h3 className="text-lg font-bold mb-4">Выберите роль</h3>
            <div className="flex flex-col gap-3">
              <button className="px-4 py-2 bg-[#b23a48] text-white rounded-lg hover:bg-[#ff8c42] transition">
                Ученик
              </button>
              <button className="px-4 py-2 bg-[#b23a48] text-white rounded-lg hover:bg-[#ff8c42] transition">
                Преподаватель
              </button>
              <button className="px-4 py-2 bg-[#b23a48] text-white rounded-lg hover:bg-[#ff8c42] transition">
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
