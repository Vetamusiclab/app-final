// components/teacher/TeacherSchedule.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import type { Slot } from '@/types/schedule';

type Props = {
  teacherId: string;
  teacherName: string;
};

export default function TeacherSchedule({ teacherId, teacherName }: Props) {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState<string | null>(null);

  // форма добавления слота
  const [dt, setDt] = useState<string>(''); // datetime-local

  const ordered = useMemo(
    () => [...slots].sort((a, b) => a.timeISO.localeCompare(b.timeISO)),
    [slots]
  );

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/teacher/schedule?teacherId=${encodeURIComponent(teacherId)}`, { cache: 'no-store' });
      const data = await res.json();
      if (!res.ok || !data?.ok) throw new Error(data?.error || 'Failed to load');
      setSlots(data.slots as Slot[]);
    } catch (e: any) {
      setError(e?.message || 'Ошибка загрузки');
    } finally {
      setLoading(false);
    }
  }

  async function add() {
    if (!dt) return;
    try {
      const timeISO = dt; // значение из <input type="datetime-local"> уже похоже на YYYY-MM-DDTHH:mm
      const res = await fetch('/api/teacher/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ teacherId, timeISO }),
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) throw new Error(data?.error || 'Failed to add');
      setSlots(prev => [...prev, data.slot as Slot]);
      setDt('');
    } catch (e: any) {
      alert(e?.message || 'Не удалось добавить слот');
    }
  }

  async function toggleBooked(id: string, booked: boolean) {
    try {
      const res = await fetch('/api/teacher/schedule', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ teacherId, id, booked }),
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) throw new Error(data?.error || 'Failed to update');
      setSlots(prev => prev.map(s => (s.id === id ? (data.slot as Slot) : s)));
    } catch (e: any) {
      alert(e?.message || 'Не удалось обновить слот');
    }
  }

  async function remove(id: string) {
    if (!confirm('Удалить слот?')) return;
    try {
      const res = await fetch(`/api/teacher/schedule?teacherId=${encodeURIComponent(teacherId)}&id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) throw new Error(data?.error || 'Failed to delete');
      setSlots(prev => prev.filter(s => s.id !== id));
    } catch (e: any) {
      alert(e?.message || 'Не удалось удалить слот');
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teacherId]);

  return (
    <div>
      <div className="mb-4">
        <div className="text-sm text-gray-500">Преподаватель</div>
        <div className="text-lg font-medium">{teacherName}</div>
      </div>

      {/* форма */}
      <div className="mb-5 flex flex-col sm:flex-row gap-3 items-start">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Дата и время</label>
          <input
            type="datetime-local"
            value={dt}
            onChange={(e) => setDt(e.target.value)}
            className="px-3 py-2 border rounded"
          />
        </div>
        <button
          onClick={add}
          className="px-4 py-2 rounded text-white bg-orange-500 hover:bg-orange-600"
        >
          Добавить слот
        </button>
      </div>

      {/* список */}
      <div className="space-y-3">
        {loading && <div className="text-sm text-gray-500">Загрузка…</div>}
        {error && !loading && <div className="text-sm text-red-600">{error}</div>}
        {!loading && !error && ordered.length === 0 && (
          <div className="text-sm text-gray-500">Слотов пока нет — добавьте первый.</div>
        )}

        {ordered.map((slot) => (
          <div
            key={slot.id}
            className={`p-3 rounded border flex items-center justify-between ${
              slot.booked ? 'bg-red-50 border-red-100' : 'bg-green-50 border-green-100'
            }`}
          >
            <div>
              <div className="font-medium">
                {formatLocal(slot.timeISO)}
              </div>
              <div className="text-xs text-gray-600">
                {slot.booked ? 'Забронировано' : 'Свободно'}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleBooked(slot.id, !slot.booked)}
                className={`px-3 py-1 rounded text-white ${slot.booked ? 'bg-orange-500 hover:bg-orange-600' : 'bg-orange-500 hover:bg-orange-600'}`}
              >
                {slot.booked ? 'Снять бронь' : 'Отметить занятие'}
              </button>
              <button
                onClick={() => remove(slot.id)}
                className="px-3 py-1 border rounded text-sm"
              >
                Удалить
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function formatLocal(iso: string) {
  // безопасное форматирование без внешних пакетов
  try {
    const d = new Date(iso);
    const dd = d.toLocaleDateString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit' });
    const tt = d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
    return `${dd} ${tt}`;
  } catch {
    return iso;
  }
}
