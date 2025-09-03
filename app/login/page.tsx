// app/login/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [selected, setSelected] = useState('');
  const { user, login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    fetch('/api/users').then((r) => r.json()).then((data) => setUsers(data || []));
  }, []);

  useEffect(() => {
    if (user) {
      if (user.role === 'admin') router.push('/admin');
      else if (user.role === 'teacher') router.push('/teacher');
      else router.push('/student');
    }
  }, [user, router]);

  async function onLogin() {
    if (!selected) {
      alert('Выберите пользователя');
      return;
    }
    const u = await login(selected);
    if (!u) alert('Не удалось войти');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h1 className="text-xl font-semibold mb-4">Войти</h1>

        <label className="block text-sm mb-2">Выберите пользователя</label>
        <select value={selected} onChange={(e) => setSelected(e.target.value)} className="w-full px-3 py-2 border rounded mb-4">
          <option value="">— выбрать —</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name} — {u.role}
            </option>
          ))}
        </select>

        <div className="flex gap-2">
          <button onClick={onLogin} className="px-4 py-2 bg-primary text-white rounded">
            Войти
          </button>
          <a href="/" className="px-4 py-2 border rounded">
            Назад
          </a>
        </div>
      </div>
    </div>
  );
}
