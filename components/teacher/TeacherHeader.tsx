// components/teacher/TeacherHeader.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

export default function TeacherHeader({ name, avatar }: { name: string; avatar?: string }) {
  return (
    <header className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 relative rounded-full overflow-hidden bg-gray-100">
          <Image src={avatar ?? '/avatars/default.png'} alt={name} fill style={{ objectFit: 'cover' }} />
        </div>
        <div>
          <div className="text-lg font-semibold">{name}</div>
          <div className="text-sm text-gray-500">Преподаватель</div>
        </div>
      </div>

      <nav className="flex items-center gap-3">
        <Link href="/teacher" className="text-sm px-3 py-1 rounded hover:bg-gray-100">Профиль</Link>
        <Link href="/teacher/schedule" className="text-sm px-3 py-1 rounded bg-primary text-white">Расписание</Link>
        <Link href="/teacher/salary" className="text-sm px-3 py-1 rounded hover:bg-gray-100">Калькулятор</Link>
      </nav>
    </header>
  );
}
