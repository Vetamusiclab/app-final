// components/schedule/BookingModal.tsx
'use client';

import React, { useEffect, useState } from 'react';

type Teacher = { id: string; name: string };
type InitialSlot = { audience?: string; hour?: number };

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (lesson: any) => void; // any — чтобы избежать жёсткой связки с общей моделью Lesson пока не унифицируем типы
  onDelete?: (id: string) => void;
  initialLesson?: any | null;
  initialSlot?: InitialSlot | null;
  teachers: Teacher[];
  audiences: string[];
  startHour: number; // например 9
  endHour?: number; // например 22
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
  // вычисляем дефолты
  const defaultAudience =
    initialSlot?.audience ??
    initialLesson?.audience ??
    initialLesson?.auditorium ??
    audiences?.[0] ??
    '';

  const defaultHour =
    initialSlot?.hour ?? initialLesson?.startHour ?? startHour ?? 9;

  const defaultDuration = initialLesson?.durationHours ?? 1;
  const defaultTeacherId = initialLesson?.teacherId ?? teachers?.[0]?.id ?? '';
  const defaultStudent = initialLesson?.studentName ?? '';

  const [audience, setAudience] = useState<string>(defaultAudience);
  const [startHourState, setStartHourState] = useState<number>(defaultHour);
  const [durationHours, setDurationHours] = useState<number>(defaultDuration);
  const [teacherId, setTeacherId] = useState<string>(defaultTeacherId);
  const [studentName, setStudentName] = useState<string>(defaultStudent);
  const [status, setStatus] = useState<string>(
    initialLesson?.status ?? 'scheduled'
  );

  // если открывается с другими initial props — синхронизируем стейты
  useEffect(() => {
    if (open) {
      setAudience(
        initialSlot?.audience ??
          initialLesson?.audience ??
          initialLesson?.auditorium ??
          audiences?.[0] ??
          ''
      );
      setStartHourState(
        initialSlot?.hour ?? initialLesson?.startHour ?? startHour ?? 9
      );
      setDurationHours(initialLesson?.durationHours ?? 1);
      setTeacherId(initialLesson?.teacherId ?? teachers?.[0]?.id ?? '');
      setStudentName(initialLesson?.studentName ?? '');
      setStatus(initialLesson?.status ?? 'scheduled');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, initialLesson, initialSlot]);

  if (!open) return null;

  function handleSave() {
    const lesson = {
      id: initialLesson?.id ?? `l_${Date.now()}`,
      audience: audience, // используем audience (совместимо с auditorium ниже)
      auditorium: audience, // дублируем поле для совместимости
      startHour: Number(startHourState),
      durationHours: Number(durationHours),
      teacherId,
      studentName: studentName || '—',
      status,
      createdBy: initialLesson?.createdBy ?? teacherId ?? 'system',
      createdAt: initialLesson?.createdAt ?? new Date().toISOString(),
    };

    onSave(lesson);
    onClose();
  }

  function handleDelete() {
    if (!initialLesson?.id) return;
    if (typeof onDelete === 'function') {
      if (confirm('Удалить занятие?')) {
        onDelete(initialLesson.id);
      }
    }
  }

  // часы для селекта
  const hours: number[] = [];
  const minH = Number(startHour ?? 9);
  const maxH = Number(endHour ?? 22);
  for (let h = minH; h <= maxH; h++) hours.push(h);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* panel */}
      <div className="relative z-10 w-full max-w-xl bg-white rounded-lg shadow-lg p-6 mx-4">
        <header className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">
            {initialLesson ? 'Редактировать занятие' : 'Создать занятие'}
          </h3>
          <button
            onClick={onClose}
            aria-label="Закрыть"
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </header>

        <div className="grid grid-cols-2 gap-3">
          <label className="flex flex-col">
            <span className="text-sm text-gray-600 mb-1">Аудитория</span>
            <select
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              className="px-2 py-2 border rounded"
            >
              {audiences.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col">
            <span className="text-sm text-gray-600 mb-1">Преподаватель</span>
            <select
              value={teacherId}
              onChange={(e) => setTeacherId(e.target.value)}
              className="px-2 py-2 border rounded"
            >
              {teachers.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col">
            <span className="text-sm text-gray-600 mb-1">Время (час)</span>
            <select
              value={startHourState}
              onChange={(e) => setStartHourState(Number(e.target.value))}
              className="px-2 py-2 border rounded"
            >
              {hours.map((h) => (
                <option key={h} value={h}>
                  {h}:00
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col">
            <span className="text-sm text-gray-600 mb-1">Длительность (часов)</span>
            <input
              type="number"
              min={0.5}
              step={0.5}
              value={durationHours}
              onChange={(e) => setDurationHours(Number(e.target.value))}
              className="px-2 py-2 border rounded"
            />
          </label>

          <label className="col-span-2 flex flex-col">
            <span className="text-sm text-gray-600 mb-1">Имя ученика</span>
            <input
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="ФИО ученика"
              className="px-2 py-2 border rounded"
            />
          </label>

          <label className="col-span-2 flex flex-col">
            <span className="text-sm text-gray-600 mb-1">Статус</span>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="px-2 py-2 border rounded"
            >
              <option value="scheduled">scheduled</option>
              <option value="confirmed">confirmed</option>
              <option value="ok">ok</option>
              <option value="cancelled">cancelled</option>
              <option value="transfer">transfer</option>
            </select>
          </label>
        </div>

        <footer className="mt-6 flex items-center justify-between">
          <div className="flex gap-2">
            {initialLesson && typeof onDelete === 'function' && (
              <button
                onClick={handleDelete}
                className="px-4 py-2 border rounded text-red-600"
              >
                Удалить
              </button>
            )}
          </div>

          <div className="flex gap-2">
            <button onClick={onClose} className="px-4 py-2 border rounded">
              Отмена
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-primary text-white rounded"
            >
              Сохранить
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
              }
