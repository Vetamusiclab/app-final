'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Главная', href: '/admin' },
    { name: 'Пользователи', href: '/admin/users' },
    { name: 'Преподаватели', href: '/admin/teachers' },
    { name: 'Ученики', href: '/admin/students' },
    { name: 'Курсы', href: '/admin/courses' },
    { name: 'Расписание', href: '/admin/schedule' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Боковое меню */}
      <aside className="w-64 bg-primary text-white p-6">
        <h2 className="text-xl font-bold mb-6">Админ-панель</h2>
        <nav className="flex flex-col gap-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-2 rounded-lg ${
                pathname === item.href ? 'bg-accent text-white' : 'hover:bg-white hover:text-primary'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Основной контент */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
