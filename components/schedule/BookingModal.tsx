// components/schedule/BookingModal.tsx
'use client';

import React, { useEffect, useState } from 'react';
import type { Lesson, LessonStatus } from '@/types/lesson';
import type { User } from '@/types/user';

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (lesson: Lesson) => void;
  onDelete?: (id: string) => void;
  initial?: Lesson | null;
  teachers: User[];
  audiences: string[];
  defaultAuditorium?: string;
  defaultStartHour?: number;
  currentUser?: User | null;
};

export default function BookingModal({
  open,
  onClose,
  onSave,
  onDelete,
  initial = null,
  teachers,
  audiences,
  defaultAuditorium,
  defaultStartHour,
  currentUser,
}: Props) {
  const [studentName, setStudentName] = useState(initial?.studentName ?? '');
  const [teacherId, setTeacherId] = useState(initial?.teacherId ?? teachers?.[0]?.id ?? '');
  const [auditorium, setAuditorium] = useState(initial?.auditorium ?? defaultAuditorium ?? audiences?.[0]);
  const [startHour, setStartHour] = useState<number>(initial?.startHour ?? defaultStartHour ?? 9);
  const [durationHours, setDurationHours] = useState<number>(initial?.durationHours ?? 1);
  const [status, setStatus] = useState<LessonStatus>(initial?.status ?? 'scheduled');

  useEffect(() => {
    if (open) {
      setStudentName(initial?.studentName ?? '');
      setTeacherId(initial?.teacherId ?? teachers?.[0]?.id ?? '');
      setAuditorium(initial?.auditorium ?? defaultAuditorium ?? audiences?.[0]);
      setStartHour(initial?.startHour ?? defaultStartHour ?? 9);
      setDurationHours(initial?.durationHours ?? 1);
      setStatus(initial?.status ?? 'scheduled');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, initial]);

  if (!open) return null;

  function handleSave() {
    // validation minimal
    if (!teacherId) {
      alert('Выберите преподавателя');
      return;
    }
    const lesson: Lesson = {
      id: initial?.id ?? `l_${Date.now().toString(36)}`,
      auditorium: auditorium ?? audiences[0],
      startHour,
      durationHours: Math.max(1, Math.round(durationHours)),
      teacherId,
      studentName: studentName || '—',
      status,
      createdBy: initial?.createdBy ?? currentUser?.id ?? 'system',
      createdAt: initial?.createdAt ?? new Date().toISOString(),
    };
    onSave(lesson);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-xl w-[min(720px,95%)] p-6 z-60">
        <h3 className="text-lg font-semibold mb-4">{initial ? 'Редактировать урок' : 'Новый урок'}</h3>

        <div className="grid grid-cols-2 gap-3">
          <label className="flex flex-col text-sm">
            Преподаватель
            <select
              value={teacherId}
              onChange={(e) => setTeacherId(e.target.value)}
              className="mt-1 p-2 border rounded"
            >
              {teachers.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col text-sm">
            Аудитория
            <select
              value={auditorium}
              onChange={(e) => setAuditorium(e.target.value)}
              className="mt-1 p-2 border rounded"
            >
              {audiences.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col text-sm">
            Начало (час)
            <input
              type="number"
              min={0}
              max={23}
              value={startHour}
              onChange={(e) => setStartHour(Number(e.target.value))}
              className="mt-1 p-2 border rounded"
            />
          </label>

          <label className="flex flex-col text-sm">
            Длительность (часы)
            <input
              type="number"
              min={1}
              max={8}
              value={durationHours}
              onChange={(e) => setDurationHours(Number(e.target.value))}
              className="mt-1 p-2 border rounded"
            />
          </label>

          <label className="flex flex-col text-sm col-span-2">
            Ученик / описание
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="mt-1 p-2 border rounded"
              placeholder="Имя ученика"
            />
          </label>

          <label className="flex flex-col text-sm">
            Статус
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as LessonStatus)}
              className="mt-1 p-2 border rounded"
            >
              <option value="scheduled">Запланирован</option>
              <option value="ok">Проведен</option>
              <option value="transfer">Перенос</option>
              <option value="canceled">Отменен</option>
            </select>
          </label>

          <div className="col-span-2 flex justify-between items-center mt-3">
            <div className="text-xs text-gray-500">
              Создан: {initial?.createdAt ? new Date(initial.createdAt).toLocaleString() : '—'} by{' '}
              {initial?.createdBy ?? currentUser?.id ?? '—'}
            </div>

            <div className="flex gap-2">
              {initial && onDelete && (
                <button
                  onClick={() => {
                    if (confirm('Удалить урок?')) {
                      onDelete(initial.id);
                      onClose();
                    }
                  }}
                  className="px-3 py-2 bg-red-50 text-red-700 border border-red-100 rounded"
                >
                  Удалить
                </button>
              )}

              <button onClick={onClose} className="px-3 py-2 border rounded">
                Отмена
              </button>
              <button onClick={handleSave} className="px-4 py-2 bg-primary text-white rounded">
                Сохранить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
