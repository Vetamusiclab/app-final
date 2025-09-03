// components/admin/AdminSidebar.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/components/AuthProvider';

export default function AdminSidebar() {
  const { user, logout } = useAuth();
  const isAdmin = user?.role === 'admin';

  return (
    <aside className="w-64 min-h-screen bg-white/90 border-r border-gray-100 p-6 sticky top-0">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 relative">
          <Image src="/logo.png" alt="MusicLab" fill style={{ objectFit: 'contain' }} />
        </div>
        <div>
          <div className="text-lg font-bold">MusicLab</div>
          <div className="text-xs text-gray-500">Панель администратора</div>
        </div>
      </div>

      {user ? (
        <div className="mb-4 text-sm">
          <div className="font-medium">{user.name}</div>
          <div className="text-xs text-gray-500">{user.role}</div>
        </div>
      ) : (
        <div className="mb-4 text-sm text-gray-500">Не вошли</div>
      )}

      <nav className="space-y-2 text-sm">
        <Link href="/admin" className={`block px-3 py-2 rounded hover:bg-gray-100 ${isAdmin ? '' : 'opacity-60 pointer-events-none'}`}>Главная</Link>
        <Link href="/admin/users" className={`block px-3 py-2 rounded hover:bg-gray-100 ${isAdmin ? '' : 'opacity-60 pointer-events-none'}`}>Пользователи</Link>
        <Link href="/admin/schedule" className={`block px-3 py-2 rounded hover:bg-gray-100 ${isAdmin ? '' : 'opacity-60 pointer-events-none'}`}>Расписание</Link>
        <Link href="/admin/reports" className={`block px-3 py-2 rounded hover:bg-gray-100 ${isAdmin ? '' : 'opacity-60 pointer-events-none'}`}>Отчёты</Link>
        <Link href="/admin/import" className={`block px-3 py-2 rounded hover:bg-gray-100 ${isAdmin ? '' : 'opacity-60 pointer-events-none'}`}>Импорт</Link>

        <div className="mt-4 border-t pt-4">
          <Link href="/" className="block px-3 py-2 rounded hover:bg-gray-100">На сайт</Link>
          {user ? (
            <button onClick={logout} className="w-full text-left px-3 py-2 rounded hover:bg-gray-100">Выйти</button>
          ) : (
            <Link href="/login" className="block px-3 py-2 rounded hover:bg-gray-100">Войти</Link>
          )}
        </div>
      </nav>
    </aside>
  );
}
