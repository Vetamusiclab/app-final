// components/schedule/BookingModal.tsx
'use client';

import React, { useEffect, useState } from 'react';
import type { User } from '@/types/user';
import type { Lesson } from '@/types/lesson';

type InitialSlot = {
  audience?: string;
  hour?: number;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (lesson: Lesson) => void;
  onDelete?: (id: string) => void;
  initialLesson?: Lesson | null;
  initialSlot?: InitialSlot | null;
  teachers: User[];
  audiences: string[];
  startHour: number; // e.g. 9
  endHour?: number; // optional
};

export default function BookingModal({
  open,
  onClose,
  onSave,
  onDelete,
  initialLesson = null,
  initialSlot = null,
  teachers,
  audiences,
  startHour,
  endHour = 22,
}: Props) {
  // compute sensible defaults w/o mixing || and ??
  const defaultAudience = initialSlot?.audience ?? initialLesson?.audience ?? audiences[0];
  const defaultHour = initialSlot?.hour ?? initialLesson?.startHour ?? startHour;
  const defaultDuration = initialLesson?.durationHours ?? 1;
  const defaultTeacherId = initialLesson?.teacherId ?? teachers?.[0]?.id ?? '';
  const defaultStudent = initialLesson?.studentName ?? '';

  // Status values used in project historically: 'scheduled', 'confirmed', 'ok', 'cancelled'
  // We type status as Lesson['status'] if available
  const [audience, setAudience] = useState<string>(defaultAudience);
  const [startHourState, setStartHourState] = useState<number>(defaultHour);
  const [durationHours, setDurationHours] = useState<number>(defaultDuration);
  const [teacherId, setTeacherId] = useState<string>(defaultTeacherId);
  const [studentName, setStudentName] = useState<string>(defaultStudent);
  const [status, setStatus] = useState<Lesson['status']>(
    (initialLesson?.status ?? 'scheduled') as Lesson['status']
  );

  useEffect(() => {
    if (!open) return;
    // when opened update states to reflect current initialLesson/slot
    setAudience(defaultAudience);
    setStartHourState(defaultHour);
    setDurationHours(defaultDuration);
    setTeacherId(defaultTeacherId);
    setStudentName(defaultStudent);
    setStatus((initialLesson?.status ?? 'scheduled') as Lesson['status']);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, initialLesson, initialSlot]);

  function makeId() {
    return `les_${Date.now().toString(36)}_${Math.floor(Math.random() * 9000 + 1000)}`;
  }

  function handleSave() {
    const id = initialLesson?.id ?? makeId();

    const lesson: Lesson = {
      // keep fields that project expects. If your Lesson type contains more fields add them here.
      id,
      audience,
      startHour: startHourState,
      durationHours,
      teacherId,
      studentName: studentName || '—',
      status: status,
      createdBy: initialLesson?.createdBy ?? teacherId ?? 'system',
      createdAt: initialLesson?.createdAt ?? new Date().toISOString(),
    } as Lesson;

    onSave(lesson);
    onClose();
  }

  function handleDelete() {
    if (!initialLesson || !onDelete) return;
    if (!confirm('Вы уверены, что хотите удалить занятие?')) return;
    onDelete(initialLesson.id);
    onClose();
  }

  if (!open) return null;

  return (
    // simple modal without external deps
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      <div className="relative z-10 w-full max-w-xl mx-4">
        <div className="bg-white rounded-2xl shadow-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">
              {initialLesson ? 'Редактировать занятие' : 'Добавить занятие'}
            </h3>
            <button
              onClick={onClose}
              aria-label="Закрыть"
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <label className="flex flex-col text-sm">
                Аудитория
                <select
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  className="mt-1 px-3 py-2 border rounded"
                >
                  {audiences.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col text-sm">
                Преподаватель
                <select
                  value={teacherId}
                  onChange={(e) => setTeacherId(e.target.value)}
                  className="mt-1 px-3 py-2 border rounded"
                >
                  {teachers.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} {t.role === 'admin' ? '(адм.)' : ''}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <label className="flex flex-col text-sm">
                Время (час)
                <input
                  type="number"
                  min={startHour}
                  max={endHour}
                  value={startHourState}
                  onChange={(e) => setStartHourState(Number(e.target.value))}
                  className="mt-1 px-3 py-2 border rounded"
                />
              </label>

              <label className="flex flex-col text-sm">
                Длительность (ч)
                <select
                  value={durationHours}
                  onChange={(e) => setDurationHours(Number(e.target.value))}
                  className="mt-1 px-3 py-2 border rounded"
                >
                  <option value={1}>1</option>
                  <option value={1.5}>1.5</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                </select>
              </label>

              <label className="flex flex-col text-sm">
                Статус
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as Lesson['status'])}
                  className="mt-1 px-3 py-2 border rounded"
                >
                  <option value="scheduled">Запланировано</option>
                  <option value="confirmed">Подтверждено</option>
                  <option value="ok">Выполнено</option>
                  <option value="cancelled">Отменено</option>
                </select>
              </label>
            </div>

            <label className="flex flex-col text-sm">
              Ученик / Комментарий
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Имя ученика или заметка"
                className="mt-1 px-3 py-2 border rounded"
              />
            </label>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex gap-2">
              {initialLesson && onDelete ? (
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 border rounded text-red-600 hover:bg-red-50"
                >
                  Удалить
                </button>
              ) : null}
            </div>

            <div className="flex gap-2">
              <button onClick={onClose} className="px-4 py-2 border rounded">
                Отмена
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-primary text-white rounded hover:opacity-95"
              >
                Сохранить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
      }
