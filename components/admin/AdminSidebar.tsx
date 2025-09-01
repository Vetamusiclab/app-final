"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "Главная" },
  { href: "/admin/users", label: "Пользователи" },
  { href: "/admin/courses", label: "Курсы" },
  { href: "/admin/settings", label: "Настройки" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#f5f5f5] p-4 border-r border-gray-200">
      <h2 className="mb-6 text-xl font-bold text-[#111]">Админ-панель</h2>
      <nav className="flex flex-col gap-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
              pathname === link.href
                ? "bg-[#6BCB77] text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
