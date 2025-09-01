"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function RoleSelectPage() {
  const router = useRouter();

  const roles = [
    { label: "Ученик", icon: "🎓", value: "student" },
    { label: "Преподаватель", icon: "🎵", value: "teacher" },
    { label: "Админ", icon: "🛠️", value: "admin" },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold text-[#FF6F00]"
      >
        Выберите роль
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {roles.map((role, i) => (
          <motion.div
            key={role.value}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
          >
            <Card
              className="cursor-pointer rounded-2xl border border-[#FFE0B2] p-6 text-center shadow-md hover:scale-105 transition"
              onClick={() => router.push(`/login/${role.value}`)}
            >
              <CardContent>
                <div className="text-5xl mb-2">{role.icon}</div>
                <div className="text-lg font-semibold">{role.label}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <button
        onClick={() => router.push("/")}
        className="mt-6 text-[#6BCB77] hover:underline"
      >
        Назад на главную
      </button>
    </main>
  );
}
