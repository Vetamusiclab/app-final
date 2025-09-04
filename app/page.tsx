'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { User, UserCheck, ShieldCheck } from 'lucide-react';

export default function Home() {
  const [showRoles, setShowRoles] = useState(false);
  const router = useRouter();

  const roles = [
    { key: 'student', label: 'Ученик', Icon: User },
    { key: 'teacher', label: 'Педагог', Icon: UserCheck },
    { key: 'admin', label: 'Админ', Icon: ShieldCheck },
  ];

  const modalVariants = {
    hidden: { opacity: 0, y: 20 },
    enter: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  function goToRoleLogin(role: string) {
    setShowRoles(false);
    router.push(`/login/${role}`);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#FFF7F0] via-[#FFF0E5] to-[#FFF7EF] px-4">
      <div className="text-center">
        {/* Логотип (если есть) */}
        <div className="mx-auto w-28 h-28 mb-6">
          {/* если положишь public/logo.png, сюда появится логотип */}
          <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-[#0B0B0B] mb-8 leading-tight">
          Творческая Лаборатория<br />Веты Гулливер
        </h1>

        <button
          onClick={() => setShowRoles(true)}
          className="inline-flex items-center gap-3 px-8 py-3 rounded-2xl bg-[#FF8A00] hover:bg-[#ff7a00] text-white font-semibold shadow-lg transition"
          aria-haspopup="dialog"
        >
          Войти
        </button>
      </div>

      {showRoles && (
        <motion.div
          initial="hidden"
          animate="enter"
          exit="exit"
          variants={modalVariants}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        >
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6">
            <h2 className="text-lg font-semibold mb-4">Выберите роль</h2>

            <div className="grid grid-cols-1 gap-3">
              {roles.map(({ key, label, Icon }) => (
                <motion.button
                  key={key}
                  onClick={() => goToRoleLogin(key)}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition"
                >
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br from-[#FFE6D0] to-[#FFD4A6]">
                    <Icon size={20} className="text-[#FF6A00]" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-sm">{label}</div>
                    <div className="text-xs text-gray-500">Войти как {label.toLowerCase()}</div>
                  </div>
                </motion.button>
              ))}
            </div>

            <div className="mt-4 text-right">
              <button
                onClick={() => setShowRoles(false)}
                className="text-sm text-gray-600 hover:underline"
              >
                Назад
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </main>
  );
}
