// components/schedule/BookingModal.tsx
'use client';

import React, { useEffect, useMemo, useState } from 'react';
import type { User } from '@/types/user';
import type { Lesson, LessonStatus } from '@/types/lesson';

export type LessonPayload = {
  teacherId: string;
  studentName?: string;
  auditorium: string;
  startHour: number;
  durationHours: number;
  status?: LessonStatus;
};

export default function BookingModal({
  open,
  onClose,
  onCreate,
  defaultAuditorium,
  defaultHour,
  teachers = [],
  auditoriums = [],
}: {
  open: boolean;
  onClose: () => void;
  onCreate: (payload: LessonPayload) => void;
  defaultAuditorium?: string;
  defaultHour?: number;
  teachers?: User[];
  auditoriums?: string[];
}) {
  const [studentName, setStudentName] = useState('');
  const [teacherId, setTeacherId] = useState<string>(teachers[0]?.id ?? '');
  const [auditorium, setAuditorium] = useState<string>(defaultAuditorium ?? (auditoriums[0] ?? ''));
  const [startHour, setStartHour] = useState<number>(defaultHour ?? 9);
  const [durationHours, setDurationHours] = useState<number>(1);
  const [status, setStatus] = useState<Lesson['status']>('ok');

  useEffect(() => {
    if (open) {
      setTeacherId(teachers[0]?.id ?? '');
      setAuditorium(defaultAuditorium ?? (auditoriums[0] ?? ''));
      setStartHour(defaultHour ?? 9);
      setDurationHours(1);
      setStudentName('');
      setStatus('ok');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, defaultAuditorium, defaultHour, teachers, auditoriums]);

  const hours = useMemo(() => {
    const arr: number[] = [];
    for (let h = 9; h <= 22; h++) arr.push(h);
    return arr;
  }, []);

  function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    if (!auditorium || !teacherId) return;
    onCreate({
      teacherId,
      studentName: studentName || '(Ученик)',
      auditorium,
      startHour,
      durationHours,
      status,
    });
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl p-6 z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Добавить занятие</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm text-gray-600">Ученик</label>
            <input
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="mt-1 w-full border px-3 py-2 rounded"
              placeholder="Имя ученика"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600">Преподаватель</label>
            <select
              value={teacherId}
              onChange={(e) => setTeacherId(e.target.value)}
              className="mt-1 w-full border px-3 py-2 rounded"
            >
              {teachers.map((t) => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-600">Аудитория</label>
              <select
                value={auditorium}
                onChange={(e) => setAuditorium(e.target.value)}
                className="mt-1 w-full border px-3 py-2 rounded"
              >
                {auditoriums.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-600">Начало</label>
              <select
                value={startHour}
                onChange={(e) => setStartHour(Number(e.target.value))}
                className="mt-1 w-full border px-3 py-2 rounded"
              >
                {hours.map((h) => (
                  <option key={h} value={h}>{String(h).padStart(2, '0')}:00</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-600">Длительность (ч)</label>
              <select
                value={durationHours}
                onChange={(e) => setDurationHours(Number(e.target.value))}
                className="mt-1 w-full border px-3 py-2 rounded"
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-600">Статус</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="mt-1 w-full border px-3 py-2 rounded"
              >
                <option value="ok">Обычное</option>
                <option value="transfer">Перенос / разовая</option>
                <option value="cancelled">Отмена</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded">Отмена</button>
            <button type="submit" className="px-4 py-2 bg-[#FF8A00] text-white rounded">Сохранить</button>
          </div>
        </form>
      </div>
    </div>
  );
}
