'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // 🔒 тут позже подключим логику авторизации
    console.log('Login with:', email, password);
    router.push('/dashboard'); // временно редиректим в "будущий кабинет"
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-bg via-white to-bg px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-text mb-6">
          Вход в систему
        </h2>

        {/* Форма логина */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <button
            type="submit"
            className="w-full py-3 bg-primary text-white font-semibold rounded-xl shadow-md hover:bg-accent transition"
          >
            Войти
          </button>
        </form>

        {/* Кнопка Назад */}
        <button
          onClick={() => router.back()}
          className="mt-4 w-full py-2 text-sm text-gray-600 hover:underline"
        >
          Назад
        </button>
      </div>
    </main>
  );
}
