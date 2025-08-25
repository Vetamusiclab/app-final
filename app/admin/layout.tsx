import Sidebar from "@/components/layout/Sidebar";
import type { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }){
  const items = [
    { href: "/admin", label: "Панель" },
    { href: "/admin/users", label: "Пользователи" },
    { href: "/admin/schedule", label: "Расписание" },
    { href: "/admin/reports", label: "Отчёты" },
    { href: "/admin/import", label: "Импорт" },
  ];
  return (
    <div className="flex gap-6">
      <Sidebar title="Админ" items={items} />
      <div className="flex-1">{children}</div>
    </div>
  );
}
