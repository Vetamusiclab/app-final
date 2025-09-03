// components/schedule/ScheduleGrid.tsx
'use client';

import React, { useState, useMemo } from 'react';
import type { Lesson } from '@/types/lesson';
import type { User } from '@/types/user';
import BookingModal from '@/components/schedule/BookingModal';
import dayjs from 'dayjs';

type Props = {
  initialLessons: Lesson[];
  teachers: User[];
  audiences: string[];
  currentUser: User; // who is "logged in" for permissions
};

/** helper: hours slots 08:00..20:00 */
function generateSlots(start = 8, end = 20) {
  const arr: string[] = [];
  for (let h = start; h <= end; h++) {
    arr.push(String(h).padStart(2, '0') + ':00');
  }
  return arr;
}

function hexToLuma(hex: string | undefined) {
  if (!hex) return 1;
  const clean = hex.replace('#', '');
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  // relative luminance
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
}

export default function ScheduleGrid({ initialLessons, teachers, audiences, currentUser }: Props) {
  const [lessons, setLessons] = useState<Lesson[]>(initialLessons ?? []);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalInitial, setModalInitial] = useState<Partial<Lesson> | undefined>();
  const [modalSlot, setModalSlot] = useState<string>('09:00');

  const slots = useMemo(() => generateSlots(8, 20), []);

  function openForSlot(audience: string, time: string) {
    const existing = lessons.filter((l) => l.audience === audience && l.time === time);
    if (existing.length > 0) {
      // warn but allow
      const names = existing.map((e) => `${getTeacherName(e.teacherId)} → ${e.studentName}`).join(', ');
      if (!confirm(`Aудитория ${audience} в ${time} уже занята: ${names}. Создать ещё урок?`)) return;
    }
    setModalInitial({ audience, time });
    setModalSlot(time);
    setModalOpen(true);
  }

  function onSave(lesson: Lesson) {
    setLessons((s) => {
      const existsIdx = s.findIndex((x) => x.id === lesson.id);
      if (existsIdx >= 0) {
        const copy = [...s];
        copy[existsIdx] = lesson;
        return copy;
      }
      return [...s, lesson];
    });
  }

  function onDelete(id: string) {
    setLessons((s) => s.filter((l) => l.id !== id));
  }

  function getTeacherName(id: string) {
    return teachers.find((t) => t.id === id)?.name ?? id;
  }

  function getTeacherColor(id: string) {
    return teachers.find((t) => t.id === id)?.color ?? '#cccccc';
  }

  function canEdit() {
    return currentUser.role === 'teacher' || currentUser.role === 'admin';
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Расписание (аудитории сверху)</h2>
        <div className="text-sm text-gray-600">Вы вошли как: {currentUser.name} ({currentUser.role})</div>
      </div>

      <div className="overflow-auto border rounded">
        <table className="w-full table-fixed border-collapse">
          <thead>
            <tr>
              <th className="w-32 p-2 border-r">Время</th>
              {audiences.map((a) => (
                <th key={a} className="p-2 text-center border-r">
                  {a}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {slots.map((time) => (
              <tr key={time} className="align-top">
                <td className="p-2 border-t border-r text-sm font-medium">{time}</td>

                {audiences.map((aud) => {
                  const cellLessons = lessons.filter((l) => l.time === time && l.audience === aud);
                  return (
                    <td
                      key={aud + time}
                      className="p-1 border-t hover:bg-gray-50 align-top"
                      onDoubleClick={() => {
                        if (!canEdit()) return;
                        openForSlot(aud, time);
                      }}
                    >
                      <div className="min-h-[64px]">
                        {cellLessons.length === 0 && (
                          <div className="h-full flex items-center justify-center">
                            {canEdit() ? (
                              <button
                                onClick={() => openForSlot(aud, time)}
                                className="px-2 py-1 text-sm border rounded"
                              >
                                + Запланировать
                              </button>
                            ) : (
                              <span className="text-xs text-gray-400">Свободно</span>
                            )}
                          </div>
                        )}

                        {cellLessons.map((ls) => {
                          const bg = ls.status === 'cancelled' ? '#FF5E5E' : getTeacherColor(ls.teacherId);
                          const textColor = hexToLuma(bg) > 0.6 ? '#111' : '#fff';
                          return (
                            <div
                              key={ls.id}
                              className="mb-1 p-2 rounded shadow-sm relative"
                              style={{ background: bg, color: textColor }}
                            >
                              <div className="flex items-center justify-between gap-2">
                                <div className="text-sm font-medium">
                                  {ls.status === 'one-off' ? '⏱️ ' : ''}
                                  {ls.studentName}
                                </div>
                                <div className="text-xs opacity-90">{getTeacherName(ls.teacherId)}</div>
                              </div>
                              <div className="text-[11px] opacity-90">
                                {ls.note}
                              </div>

                              {canEdit() && (
                                <div className="absolute top-1 right-1 flex gap-1">
                                  <button
                                    title="Редактировать"
                                    onClick={() => {
                                      setModalInitial(ls);
                                      setModalSlot(ls.time);
                                      setModalOpen(true);
                                    }}
                                    className="px-1 py-0.5 bg-white/20 rounded text-[10px]"
                                  >
                                    ✎
                                  </button>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
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
        onClose={() => {
          setModalOpen(false);
          setModalInitial(undefined);
        }}
        initial={modalInitial}
        slotTime={modalSlot}
        teachers={teachers}
        audiences={audiences}
        currentUserId={currentUser.id}
        onDelete={(id) => onDelete(id)}
        onSave={(l) => onSave(l)}
      />
      <div className="mt-2 text-xs text-gray-500">
        Подсказка: два способа создать урок — нажмите «+ Запланировать» в ячейке (если вы — педагог/админ) или двойной клик по ячейке.
      </div>
    </div>
  );
}
