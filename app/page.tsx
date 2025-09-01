"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-[#FF6F00]"
      >
        Добро пожаловать в MUSIC.LAB
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col gap-4"
      >
        <Link
          href="/login"
          className="rounded-2xl bg-[#6BCB77] px-6 py-3 text-lg font-semibold text-white shadow-md hover:scale-105 transition"
        >
          Войти
        </Link>
      </motion.div>
    </main>
  );
}
