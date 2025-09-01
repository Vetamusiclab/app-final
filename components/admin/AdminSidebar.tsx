'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    { href: '/admin', label: 'Главная' },
    { href: '/admin/users', label: 'Пользователи' },
    { href: '/admin/settings', label: 'Настройки' },
  ];

  return (
    <aside className="w-64 bg-white shadow-md h-screen p-6">
      <h2 className="text-xl font-bold mb-6">Админ-панель</h2>
      <nav className="flex flex-col gap-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`px-4 py-2 rounded-lg transition ${
              pathname === link.href
                ? 'bg-primary text-white'
                : 'hover:bg-gray-100 text-gray-800'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
