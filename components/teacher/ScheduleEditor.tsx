// components/teacher/ScheduleEditor.tsx
'use client';

import React, { useState } from 'react';

type Props = {
  onCreate?: (payload: { title: string; start: string; end: string }) => Promise<void> | void;
};

export default function ScheduleEditor({ onCreate }: Props) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('10:00');
  const [durationMin, setDurationMin] = useState(60);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    if (!title || !date || !startTime) {
      alert('Заполните заголовок, дату и время');
      return;
    }
    const start = new Date(`${date}T${startTime}:00`).toISOString();
    const end = new Date(new Date(start).getTime() + durationMin * 60 * 1000).toISOString();

    setLoading(true);
    try {
      if (onCreate) {
        await onCreate({ title, start, end });
      }
      // clear
      setTitle('');
      setDate('');
      setStartTime('10:00');
      setDurationMin(60);
    } catch (err) {
      console.error(err);
      alert('Ошибка при создании');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <div className="mb-2">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Название занятия"
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div className="flex gap-2 mb-2">
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="px-3 py-2 border rounded" />
        <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="px-3 py-2 border rounded" />
        <input type="number" value={durationMin} onChange={(e) => setDurationMin(Number(e.target.value))} className="w-24 px-3 py-2 border rounded" />
      </div>

      <div className="flex gap-2">
        <button type="submit" disabled={loading} className="px-4 py-2 bg-primary text-white rounded">
          {loading ? 'Создание...' : 'Создать слот'}
        </button>
      </div>
    </form>
  );
      }
