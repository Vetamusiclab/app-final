'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginForm({ role }: { role: string }) {
  const router = useRouter();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // === Заглушка авторизации ===
    // Тут интегрируй реальную авторизацию (API). Сейчас просто редирект.
    setTimeout(() => {
      setLoading(false);
      // После успешного входа — переходим в соответствующий раздел
      router.push(`/${role}`);
    }, 600);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Логин</label>
          <input
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            className="w-full border rounded-md px-3 py-2"
            placeholder="Логин или email"
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Пароль</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="w-full border rounded-md px-3 py-2"
            placeholder="Пароль"
            required
          />
        </div>

        <div className="flex items-center justify-between gap-3">
          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-primary text-white rounded-md hover:bg-accent transition disabled:opacity-60"
            disabled={loading}
          >
            {loading ? 'Вход...' : 'Войти'}
          </button>

          <Link href="/" className="text-sm text-[#333] hover:underline">
            Назад
          </Link>
        </div>
      </form>
    </>
  );
}
