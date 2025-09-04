// components/schedule/BookingModal.tsx
'use client';

import React, { useEffect, useState } from 'react';
import type { Lesson } from '@/types/lesson';

type Props = {
  open: boolean;
  onClose: () => void;
  // если редактируем существующий урок — передаем initialLesson
  initialLesson?: Lesson | null;
  // callback при сохранении — можно сохранять на сервер позже
  onSave?: (lesson: Lesson) => void;
  defaultHour?: number;
  defaultAuditorium?: string;
  teachers?: { id: string; name: string }[]; // для селектора (опционально)
};

export default function BookingModal({
  open,
  onClose,
  initialLesson = null,
  onSave,
  defaultHour = 10,
  defaultAuditorium = '216',
  teachers = [],
}: Props) {
  // локальное состояние формы
  const [studentName, setStudentName] = useState<string>(initialLesson?.studentName ?? '');
  const [startHour, setStartHour] = useState<number>(initialLesson?.startHour ?? defaultHour);
  const [durationHours, setDurationHours] = useState<number>(initialLesson?.durationHours ?? 1);
  const [auditorium, setAuditorium] = useState<string>(initialLesson?.auditorium ?? defaultAuditorium);
  const [teacherId, setTeacherId] = useState<string>(initialLesson?.teacherId ?? (teachers[0]?.id ?? ''));
  // status может быть undefined — безопаснее, чем ставить значение, не входящее в тип
  const [status, setStatus] = useState<Lesson['status'] | undefined>(initialLesson?.status);

  useEffect(() => {
    if (open) {
      // при открытии модального окна инициализируем поля (если пришел initial)
      setStudentName(initialLesson?.studentName ?? '');
      setStartHour(initialLesson?.startHour ?? defaultHour);
      setDurationHours(initialLesson?.durationHours ?? 1);
      setAuditorium(initialLesson?.auditorium ?? defaultAuditorium);
      setTeacherId(initialLesson?.teacherId ?? (teachers[0]?.id ?? ''));
      setStatus(initialLesson?.status);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, initialLesson]);

  function handleSave() {
    const payload: Lesson = {
      id: initialLesson?.id ?? `l_${Date.now()}`,
      auditorium,
      startHour,
      durationHours,
      teacherId: teacherId || 'unknown',
      studentName: studentName || '—',
      status: status ?? 'scheduled',
      createdBy: initialLesson?.createdBy ?? teacherId || 'system',
      createdAt: initialLesson?.createdAt ?? new Date().toISOString(),
    };

    onSave?.(payload);
    onClose();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      <div className="relative z-10 w-full max-w-lg bg-white rounded-2xl p-6 shadow-xl">
        <h3 className="text-lg font-semibold mb-4">Запись на урок</h3>

        <div className="space-y-3">
          <label className="block">
            <div className="text-xs text-gray-600 mb-1">Ученик</div>
            <input
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              placeholder="Имя ученика"
            />
          </label>

          <div className="flex gap-2">
            <label className="flex-1">
              <div className="text-xs text-gray-600 mb-1">Аудитория</div>
              <input
                value={auditorium}
                onChange={(e) => setAuditorium(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                placeholder="216"
              />
            </label>

            <label className="w-28">
              <div className="text-xs text-gray-600 mb-1">Час</div>
              <input
                type="number"
                min={0}
                max={23}
                value={startHour}
                onChange={(e) => setStartHour(Number(e.target.value))}
                className="w-full px-3 py-2 border rounded"
              />
            </label>

            <label className="w-28">
              <div className="text-xs text-gray-600 mb-1">Длительность (ч)</div>
              <input
                type="number"
                min={1}
                max={8}
                value={durationHours}
                onChange={(e) => setDurationHours(Number(e.target.value))}
                className="w-full px-3 py-2 border rounded"
              />
            </label>
          </div>

          <label>
            <div className="text-xs text-gray-600 mb-1">Преподаватель</div>
            <select
              value={teacherId}
              onChange={(e) => setTeacherId(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            >
              {teachers.length === 0 ? (
                <option value="">{'Нет преподавателей'}</option>
              ) : (
                teachers.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))
              )}
            </select>
          </label>

          <label>
            <div className="text-xs text-gray-600 mb-1">Статус</div>
            <select
              value={status ?? ''}
              onChange={(e) => setStatus((e.target.value as Lesson['status']) || undefined)}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">(по умолчанию)</option>
              <option value="scheduled">Запланировано</option>
              <option value="confirmed">Подтверждено</option>
              <option value="ok">OK</option>
              <option value="makeup">Отработка</option>
              <option value="transfer">Перенос</option>
              <option value="cancelled">Отменено</option>
              <option value="draft">Черновик</option>
            </select>
          </label>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Отмена
          </button>
          <button onClick={handleSave} className="px-4 py-2 bg-primary text-white rounded">
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
}
