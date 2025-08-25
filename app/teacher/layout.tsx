import Sidebar from "@/components/layout/Sidebar";
import type { ReactNode } from "react";

export default function TeacherLayout({ children }: { children: ReactNode }){
  const items = [
    { href: "/teacher", label: "Ученики" },
    { href: "/teacher/schedule", label: "Расписание" },
    { href: "/teacher/salary", label: "Зарплата" },
  ];
  return (
    <div className="flex gap-6">
      <Sidebar title="Преподаватель" items={items} />
      <div className="flex-1">{children}</div>
    </div>
  );
}
