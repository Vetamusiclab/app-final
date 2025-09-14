// components/schedule/ScheduleLegend.tsx
'use client';

import React from 'react';
import type { User } from '@/types/user';
import { Mic, Music, User as UserIcon } from 'lucide-react';

export default function ScheduleLegend({ teachers, getColor }: { teachers: User[]; getColor: (id: string) => string }) {
  function getIconForTeacher(t?: User | null) {
    if (!t) return UserIcon;
    const dirs = (t.directions || []).map((d: string) => d.toLowerCase());
    if (dirs.some((d: string) => d.includes('вокал'))) return Mic;
    if (dirs.some((d: string) => d.includes('фортепиано') || d.includes('форт'))) return Music;
    return UserIcon;
  }

  return (
    <div className="mt-4 bg-white p-4 rounded shadow">
      <h3 className="text-sm font-medium mb-3">Легенда — педагоги</h3>
      <div className="grid grid-cols-3 gap-3">
        {teachers.map((t) => {
          const col = getColor(t.id);
          const Icon = getIconForTeacher(t);
          return (
            <div key={t.id} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-md flex items-center justify-center" style={{ background: col }}>
                <Icon size={16} color="#fff" />
              </div>
              <div>
                <div className="text-sm font-medium">{t.name}</div>
                <div className="text-xs text-gray-500">{(t.directions || []).join(', ')}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
