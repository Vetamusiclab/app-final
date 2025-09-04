// components/schedule/ScheduleGrid.tsx
'use client';

import React, { useMemo, useState } from 'react';
import type { Lesson } from '@/types/lesson';
import type { User } from '@/types/user';
import BookingModal, { LessonPayload } from './BookingModal';

type Props = {
  initialLessons: Lesson[];
  teachers: User[];
  audiences: string[]; // ['216','222',...]
  currentUser: User;
};

export default function ScheduleGrid({ initialLessons, teachers, audiences, currentUser }: Props) {
  const [lessons, setLessons] = useState<Lesson[]>(initialLessons ?? []);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDefaults, setModalDefaults] = useState<{aud?:string; hour?:number}>({});

  const hours = useMemo(() => {
    const arr: number[] = [];
    for (let h = 9; h <= 22; h++) arr.push(h);
    return arr;
  }, []);

  function openAdd(aud: string, hour: number) {
    setModalDefaults({ aud, hour });
    setModalOpen(true);
  }

  function handleCreate(payload: LessonPayload) {
    const newLesson: Lesson = {
      id: `lesson-${Date.now()}`,
      teacherId: payload.teacherId,
      studentName: payload.studentName,
      auditorium: payload.auditorium,
      startHour: payload.startHour,
      durationHours: payload.durationHours,
      status: payload.status ?? 'ok',
      createdBy: currentUser?.id,
    };
    setLessons((s) => [...s, newLesson]);
    setModalOpen(false);
  }

  // helper to find lesson that starts at hour in auditorium (simple)
  function findLessonAt(aud: string, hour: number) {
    return lessons.find((l) => l.auditorium === aud && l.startHour === hour);
  }

  function teacherNameById(id?: string) {
    return teachers.find((t) => t.id === id)?.name ?? id ?? '—';
  }

  return (
    <div>
      <div className="overflow-auto border rounded">
        <table className="w-full table-fixed">
          <thead className="bg-gray-50">
            <tr>
              <th className="w-32 p-2 border-r">Время</th>
              {audiences.map((a) => (
                <th key={a} className="p-2 text-left">{a}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {hours.map((h) => (
              <tr key={h} className="odd:bg-white even:bg-gray-50">
                <td className="p-2 text-sm font-medium border-r">{String(h).padStart(2, '0')}:00</td>

                {audiences.map((a) => {
                  const l = findLessonAt(a, h);
                  return (
                    <td key={a} className="p-2 align-top border">
                      {l ? (
                        <div className={`p-2 rounded`} title={`${l.studentName} — ${teacherNameById(l.teacherId)}`}>
                          <div className="font-semibold">{l.studentName}</div>
                          <div className="text-xs text-gray-600">{teacherNameById(l.teacherId)}</div>
                          <div className="text-xs mt-1">
                            {l.durationHours} ч. {l.status === 'cancelled' ? ' (Отмена)' : l.status === 'transfer' ? ' (Перенос)' : ''}
                          </div>
                        </div>
                      ) : (
                        <div className="text-xs text-gray-400">
                          <button
                            onClick={() => openAdd(a, h)}
                            className="text-sm px-2 py-1 rounded border hover:bg-gray-100"
                          >
                            Добавить
                          </button>
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <BookingModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={handleCreate}
        defaultAuditorium={modalDefaults.aud}
        defaultHour={modalDefaults.hour}
        teachers={teachers}
        auditoriums={audiences}
      />
    </div>
  );
}
