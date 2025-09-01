"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function LoginPage() {
  const { role } = useParams();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // пока заглушка
    if (role === "student") router.push("/student");
    if (role === "teacher") router.push("/teacher");
    if (role === "admin") router.push("/admin");
  };

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md rounded-2xl border border-[#FFE0B2] p-8 shadow-md"
      >
        <h1 className="text-xl font-bold text-[#FF6F00] mb-6 text-center">
          Вход ({role})
        </h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Логин"
            className="w-full rounded-xl border p-3 focus:outline-none focus:ring-2 focus:ring-[#6BCB77]"
            required
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Пароль"
              className="w-full rounded-xl border p-3 focus:outline-none focus:ring-2 focus:ring-[#6BCB77]"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-sm text-[#6BCB77]"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Скрыть" : "Показать"}
            </button>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full rounded-xl bg-[#6BCB77] py-3 font-semibold text-white shadow-md hover:scale-105 transition"
          >
            Войти
          </button>
        </form>

        <div className="mt-4 flex justify-between text-sm">
          <button onClick={() => alert("Функция восстановления пароля в разработке")} className="text-[#6BCB77] hover:underline">
            Забыли пароль?
          </button>
          <button onClick={() => router.push("/login")} className="text-[#6BCB77] hover:underline">
            Назад
          </button>
        </div>
      </motion.div>
    </main>
  );
}
