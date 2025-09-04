// components/schedule/BookingModal.tsx
'use client';

import React, { useEffect, useState } from 'react';
import type { Lesson } from '@/types/lesson';
import type { User } from '@/types/user';

type Props = {
  initialSlot?: { audience: string; hour: number } | null;
  lesson?: Lesson | null;
  teachers: User[];
  audiences: string[];
  startHour: number;
  endHour: number;
  onClose: () => void;
  onSave: (payload: Partial<Lesson> | Lesson) => void;
  onDelete: (id: string) => void;
};

export default function BookingModal({
  initialSlot,
  lesson,
  teachers,
  audiences,
  startHour,
  endHour,
  onClose,
  onSave,
  onDelete,
}: Props) {
  const [auditorium, setAuditorium] = useState<string>(initialSlot?.audience ?? lesson?.auditorium ?? audiences[0]);
  const [startHourState, setStartHourState] = useState<number>(initialSlot?.hour ?? lesson?.startHour ?? startHour);
  const [durationHours, setDurationHours] = useState<number>(lesson?.durationHours ?? 1);
  const [teacherId, setTeacherId] = useState<string>(lesson?.teacherId ?? teachers[0]?.id ?? '');
  const [studentName, setStudentName] = useState<string>(lesson?.studentName ?? '');

  useEffect(() => {
    if (lesson) {
      setAuditorium(lesson.auditorium);
      setStartHourState(lesson.startHour ?? startHour);
      setDurationHours(lesson.durationHours ?? 1);
      setTeacherId(lesson.teacherId);
      setStudentName(lesson.studentName ?? '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson]);

  const hoursOptions = [];
  for (let h = startHour; h < endHour; h++) hoursOptions.push(h);

  function handleSave() {
    const payload: Partial<Lesson> | Lesson = lesson
      ? { ...lesson, auditorium, startHour: Number(startHourState), durationHours: Number(durationHours), teacherId, studentName }
      : { auditorium, startHour: Number(startHourState), durationHours: Number(durationHours), teacherId, studentName, status: 'scheduled' };
    onSave(payload);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">{lesson ? 'Редактировать занятие' : 'Создать занятие'}</h3>

        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <div className="text-xs text-gray-600">Аудитория</div>
            <select value={auditorium} onChange={(e) => setAuditorium(e.target.value)} className="mt-1 w-full border px-2 py-2 rounded">
              {audiences.map((a) => <option key={a} value={a}>{a}</option>)}
            </select>
          </label>

          <label className="block">
            <div className="text-xs text-gray-600">Преподаватель</div>
            <select value={teacherId} onChange={(e) => setTeacherId(e.target.value)} className="mt-1 w-full border px-2 py-2 rounded">
              {teachers.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
          </label>

          <label className="block">
            <div className="text-xs text-gray-600">Время (час)</div>
            <select value={startHourState} onChange={(e) => setStartHourState(Number(e.target.value))} className="mt-1 w-full border px-2 py-2 rounded">
              {hoursOptions.map((h) => <option key={h} value={h}>{String(h).padStart(2, '0')}:00</option>)}
            </select>
          </label>

          <label className="block">
            <div className="text-xs text-gray-600">Длительность (часов)</div>
            <select value={durationHours} onChange={(e) => setDurationHours(Number(e.target.value))} className="mt-1 w-full border px-2 py-2 rounded">
              {[1,2,3,4].map((d) => <option key={d} value={d}>{d} ч</option>)}
            </select>
          </label>

          <label className="col-span-2 block">
            <div className="text-xs text-gray-600">Ученик / Комментарий</div>
            <input value={studentName} onChange={(e) => setStudentName(e.target.value)} className="mt-1 w-full border px-2 py-2 rounded" />
          </label>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-2">
            <button onClick={handleSave} className="px-4 py-2 bg-primary text-white rounded">Сохранить</button>
            <button onClick={onClose} className="px-4 py-2 border rounded">Отмена</button>
          </div>

          {lesson && (
            <button
              onClick={() => lesson && onDelete(lesson.id)}
              className="px-3 py-2 bg-red-100 text-red-700 rounded"
            >
              Удалить
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
