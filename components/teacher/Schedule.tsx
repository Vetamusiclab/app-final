// components/teacher/Schedule.tsx
'use client';

import React, { useState } from 'react';
import type { Session } from '@/types/session';

type Props = { sessions: Session[] };

export default function Schedule({ sessions }: Props) {
  const [list, setList] = useState<Session[]>(sessions);

  function toggleCancel(id: string) {
    setList((s) => s.map((it) => (it.id === id ? { ...it, status: it.status === 'cancelled' ? 'free' : 'cancelled' } : it)));
  }

  return (
    <div>
      {list.length === 0 && <div className="text-gray-500">Сессии не найдены</div>}
      <div className="space-y-3">
        {list.map((s) => (
          <div key={s.id} className="p-4 bg-white rounded shadow flex items-center justify-between">
            <div>
              <div className="font-medium">{s.title}</div>
              <div className="text-sm text-gray-500">
                {new Date(s.start).toLocaleString()} — {new Date(s.end).toLocaleTimeString()}
              </div>
              <div className="text-xs mt-1">
                Статус: <span className="font-medium">{s.status}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {s.status === 'free' ? (
                <button
                  onClick={() => {
                    // локальное бронирование (демо)
                    setList((cur) => cur.map((it) => (it.id === s.id ? { ...it, status: 'booked', studentId: 'demo-stu' } : it)));
                  }}
                  className="px-3 py-1 bg-primary text-white rounded"
                >
                  Забронировать
                </button>
              ) : (
                <button onClick={() => toggleCancel(s.id)} className="px-3 py-1 border rounded">
                  {s.status === 'cancelled' ? 'Восстановить' : 'Отменить'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
