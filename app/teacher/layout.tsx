// app/teacher/layout.tsx
import type { ReactNode } from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Teacher — MusicLab',
};

export default function TeacherLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto p-6">
        <header className="mb-6">
          <Link href="/" className="text-sm text-gray-600 hover:underline">← На главную</Link>
        </header>

        <main>{children}</main>
      </div>
    </div>
  );
}
