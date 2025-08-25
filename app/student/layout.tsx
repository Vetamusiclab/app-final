import Sidebar from "@/components/layout/Sidebar";
import type { ReactNode } from "react";

export default function StudentLayout({ children }: { children: ReactNode }){
  const items = [
    { href: "/student", label: "Главная" },
    { href: "/student/schedule", label: "Расписание" },
    { href: "/student/materials", label: "Материалы" },
    { href: "/student/subscription", label: "Абонемент" },
    { href: "/student/achievements", label: "Достижения" },
  ];
  return (
    <div className="flex gap-6">
      <Sidebar title="Ученик" items={items} />
      <div className="flex-1">{children}</div>
    </div>
  );
}
