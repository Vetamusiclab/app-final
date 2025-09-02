// components/admin/AdminSidebar.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function AdminSidebar() {
  return (
    <aside className="w-64 min-h-screen admin-sidebar border-r border-gray-100 p-6 sticky top-0">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 relative">
          {/* public/logo.png */}
          <Image src="/logo.png" alt="MusicLab" fill style={{ objectFit: 'contain' }} />
        </div>
        <div>
          <div className="text-lg font-bold">MusicLab</div>
          <div className="text-xs text-gray-500">Панель администратора</div>
        </div>
      </div>

      <nav className="space-y-2 text-sm">
        <Link href="/admin" className="block px-3 py-2 rounded hover:bg-gray-50">Главная</Link>
        <Link href="/admin/users" className="block px-3 py-2 rounded hover:bg-gray-50">Пользователи</Link>
        <Link href="/admin/students" className="block px-3 py-2 rounded hover:bg-gray-50">Студенты</Link>
        <Link href="/admin/schedule" className="block px-3 py-2 rounded hover:bg-gray-50">Расписание</Link>
        <Link href="/admin/salary" className="block px-3 py-2 rounded hover:bg-gray-50">Зарплаты</Link>
        <Link href="/admin/reports" className="block px-3 py-2 rounded hover:bg-gray-50">Отчёты</Link>
        <Link href="/admin/import" className="block px-3 py-2 rounded hover:bg-gray-50">Импорт</Link>
        <Link href="/admin/settings" className="block px-3 py-2 rounded hover:bg-gray-50">Настройки</Link>

        <div className="mt-4 border-t pt-4">
          <Link href="/" className="block px-3 py-2 rounded hover:bg-gray-50">На сайт</Link>
          <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-50">Выйти</button>
        </div>
      </nav>
    </aside>
  );
}
