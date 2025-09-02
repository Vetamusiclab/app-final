// components/teacher/ScheduleList.tsx
'use client';

import React, { useEffect, useState } from 'react';
import type { Session } from '@/types/session';
import ScheduleEditor from '@/components/teacher/ScheduleEditor';

type Props = {
  initialSessions: Session[];
  teacherId: string;
};

export default function ScheduleList({ initialSessions, teacherId }: Props) {
  const [sessions, setSessions] = useState<Session[]>(initialSessions ?? []);
  const [loading, setLoading] = useState(false);

  // helper to refresh from server (in case another client changed data)
  async function refresh() {
    setLoading(true);
    try {
      const res = await fetch(`/api/sessions?teacherId=${teacherId}`);
      const data = await res.json();
      setSessions(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function onCreate(newSession: { title: string; start: string; end: string }) {
    try {
      const res = await fetch('/api/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          teacherId,
          title: newSession.title,
          start: newSession.start,
          end: newSession.end,
          status: 'free',
        }),
      });
      if (!res.ok) throw new Error('Create failed');
      const created = await res.json();
      setSessions((s) => [created, ...s]);
    } catch (err) {
      console.error(err);
      alert('Ошибка при создании занятия');
    }
  }

  async function onDelete(id: string) {
    if (!confirm('Удалить занятие?')) return;
    try {
      const res = await fetch(`/api/sessions?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setSessions((s) => s.filter((x) => x.id !== id));
    } catch (err) {
      console.error(err);
      alert('Ошибка при удалении');
    }
  }

  async function toggleBooked(session: Session) {
    try {
      const updated = { ...session, status: session.status === 'booked' ? 'free' : 'booked' };
      const res = await fetch('/api/sessions', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: session.id, status: updated.status }),
      });
      if (!res.ok) throw new Error('Update failed');
      const json = await res.json();
      setSessions((s) => s.map((it) => (it.id === json.id ? json : it)));
    } catch (err) {
      console.error(err);
      alert('Ошибка при обновлении статуса');
    }
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <strong>Учитель:</strong> {teacherId}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={refresh} className="px-3 py-1 border rounded">Обновить</button>
        </div>
      </div>

      <div className="mb-6">
        <ScheduleEditor onCreate={onCreate} />
      </div>

      {loading && <div className="text-sm text-gray-500 mb-2">Обновление...</div>}

      <div className="space-y-3">
        {sessions.length === 0 && <div className="text-gray-500">Сеансов не найдено</div>}
        {sessions.map((s) => (
          <div key={s.id} className="p-3 border rounded flex items-center justify-between">
            <div>
              <div className="font-medium">{s.title}</div>
              <div className="text-sm text-gray-500">
                {new Date(s.start).toLocaleString()} — {new Date(s.end).toLocaleTimeString()}
              </div>
              <div className="text-xs text-gray-400">Статус: {s.status}</div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleBooked(s)}
                className={`px-3 py-1 rounded text-sm ${
                  s.status === 'booked' ? 'bg-yellow-500 text-black' : 'bg-green-600 text-white'
                }`}
              >
                {s.status === 'booked' ? 'Освободить' : 'Пометить занятие занятым'}
              </button>

              <button onClick={() => onDelete(s.id)} className="px-3 py-1 text-sm border rounded text-red-600">Удалить</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
        }
