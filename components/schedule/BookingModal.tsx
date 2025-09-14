'use client';

import React, { useEffect, useState } from 'react'; import type { User } from '@/types/user';

// Простой, максимально совместимый BookingModal. // Чтобы избежать конфликтов типов между разными версиями Lesson в проекте // (auditorium vs audience, разные значения статуса) — здесь используем any // для урока при сохранении. Это предотвращает ошибки сборки, пока не // унифицируем types/lesson.ts.

type InitialSlot = { audience?: string; hour?: number } | null;

type Props = { open: boolean; onClose: () => void; onSave: (lesson: any) => void; // any — чтобы не зависеть от точной формы Lesson onDelete?: (id: string) => void; initialLesson?: any | null; initialSlot?: InitialSlot; teachers: User[]; audiences: string[]; startHour: number; // e.g. 9 endHour?: number; // e.g. 22 };

export default function BookingModal({ open, onClose, onSave, onDelete, initialLesson = null, initialSlot = null, teachers, audiences, startHour, endHour = 22, }: Props) { // Поддерживаем оба варианта названия поля: audience и auditorium const defaultAudience = (initialSlot && initialSlot.audience) ?? (initialLesson && (initialLesson.audience ?? initialLesson.auditorium)) ?? audiences[0];

const defaultHour = (initialSlot && initialSlot.hour) ?? (initialLesson && initialLesson.startHour) ?? startHour; const defaultDuration = (initialLesson && initialLesson.durationHours) ?? 1; const defaultTeacherId = (initialLesson && initialLesson.teacherId) ?? (teachers?.[0]?.id ?? ''); const defaultStudent = (initialLesson && initialLesson.studentName) ?? '';

const [audience, setAudience] = useState<string>(defaultAudience); const [startHourState, setStartHourState] = useState<number>(defaultHour); const [durationHours, setDurationHours] = useState<number>(defaultDuration); const [teacherId, setTeacherId] = useState<string>(defaultTeacherId); const [studentName, setStudentName] = useState<string>(defaultStudent); const [status, setStatus] = useState<string>((initialLesson && initialLesson.status) ?? 'scheduled');

useEffect(() => { if (!open) return; setAudience(defaultAudience); setStartHourState(defaultHour); setDurationHours(defaultDuration); setTeacherId(defaultTeacherId); setStudentName(defaultStudent); setStatus((initialLesson && initialLesson.status) ?? 'scheduled'); // eslint-disable-next-line react-hooks/exhaustive-deps }, [open, initialLesson, initialSlot]);

function makeId() { return les_${Date.now().toString(36)}_${Math.floor(Math.random() * 9000 + 1000)}; }

function handleSave() { const id = (initialLesson && initialLesson.id) ?? makeId();

// Собираем объект занятия в нейтральной форме. Поле аудитории добавляем
// как audience (совместимо с новой схемой). Если где-то используется
// auditorium — позже приведём к единому виду в types/lesson.ts
const lesson = {
  id,
  audience,
  // сохраняем старое поле auditorium для совместимости (если в других местах используется оно)
  auditorium: audience,
  startHour: startHourState,
  durationHours,
  teacherId,
  studentName: studentName || '—',
  status,
  createdBy: (initialLesson && initialLesson.createdBy) ?? teacherId ?? 'system',
  createdAt: (initialLesson && initialLesson.createdAt) ?? new Date().toISOString(),
} as any;

onSave(lesson);
onClose();

}

function handleDelete() { if (!initialLesson || !onDelete) return; if (!confirm('Удалить занятие?')) return; onDelete(initialLesson.id); onClose(); }

if (!open) return null;

return ( <div className="fixed inset-0 z-50 flex items-center justify-center"> <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

<div className="relative z-10 w-full max-w-2xl mx-4">
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">
          {initialLesson ? 'Редактировать занятие' : 'Добавить занятие'}
        </h3>
        <button onClick={onClose} aria-label="Закрыть" className="text-gray-500 hover:text-gray-700">✕</button>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <label className="flex flex-col text-sm">
            Аудитория
            <select value={audience} onChange={(e) => setAudience(e.target.value)} className="mt-1 px-3 py-2 border rounded">
              {audiences.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </label>

          <label className="flex flex-col text-sm">
            Преподаватель
            <select value={teacherId} onChange={(e) => setTeacherId(e.target.value)} className="mt-1 px-3 py-2 border rounded">
              {teachers.map((t) => (
                <option key={t.id} value={t.id}>{t.name}{t.role === 'admin' ? ' (адм.)' : ''}</option>
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
            <select value={durationHours} onChange={(e) => setDurationHours(Number(e.target.value))} className="mt-1 px-3 py-2 border rounded">
              <option value={1}>1</option>
              <option value={1.5}>1.5</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
          </label>

          <label className="flex flex-col text-sm">
            Статус
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="mt-1 px-3 py-2 border rounded">
              <option value="scheduled">Запланировано</option>
              <option value="confirmed">Подтверждено</option>
              <option value="ok">Выполнено</option>
              <option value="cancelled">Отменено</option>
            </select>
          </label>
        </div>

        <label className="flex flex-col text-sm">
          Ученик / заметка
          <input type="text" value={studentName} onChange={(e) => setStudentName(e.target.value)} placeholder="Имя ученика или комментарий" className="mt-1 px-3 py-2 border rounded" />
        </label>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div>
          {initialLesson && onDelete ? (
            <button onClick={handleDelete} className="px-4 py-2 border rounded text-red-600 hover:bg-red-50">Удалить</button>
          ) : null}
        </div>

        <div className="flex gap-2">
          <button onClick={onClose} className="px-4 py-2 border rounded">Отмена</button>
          <button onClick={handleSave} className="px-4 py-2 bg-primary text-white rounded hover:opacity-95">Сохранить</button>
        </div>
      </div>
    </div>
  </div>
</div>

); }

