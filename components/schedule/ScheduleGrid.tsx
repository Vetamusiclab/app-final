// components/schedule/ScheduleGrid.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import type { Lesson } from '@/types/lesson';
import type { User } from '@/types/user';

type ActiveCell = { auditorium: string; hour: number } | null;

type Props = {
  initialLessons: Lesson[];
  teachers: User[]; // список преподавателей (id, name и т.д.)
  audiences: string[]; // ['216','222', ...]
  currentUser: User | null;
  startHour?: number; // default 9
  endHour?: number; // default 22
};

const DEFAULT_COL_WIDTH = 180; // px
const TIMES_COL_WIDTH = 100; // px

// несколько аккуратных цветов для преподавателей (можно заменить на брендовые)
const DEFAULT_COLORS = [
  '#FF8A00', // orange
  '#7C3AED', // purple
  '#0EA5A4', // teal
  '#F97316', // amber
  '#06B6D4', // cyan
  '#F43F5E', // rose
  '#10B981', // emerald
];

function getColorForId(id: string) {
  let sum = 0;
  for (let i = 0; i < id.length; i++) sum = (sum << 5) - sum + id.charCodeAt(i);
  const idx = Math.abs(sum) % DEFAULT_COLORS.length;
  return DEFAULT_COLORS[idx];
}

export default function ScheduleGrid({
  initialLessons,
  teachers,
  audiences,
  currentUser,
  startHour = 9,
  endHour = 22,
}: Props) {
  const hours = Array.from({ length: endHour - startHour + 1 }, (_, i) => startHour + i);

  const storageKey = `schedule_col_widths_${audiences.join('_')}`;

  const [lessons, setLessons] = useState<Lesson[]>(initialLessons ?? []);
  const [colWidths, setColWidths] = useState<number[]>(
    () =>
      (() => {
        try {
          const raw = typeof window !== 'undefined' ? localStorage.getItem(storageKey) : null;
          if (raw) {
            const parsed = JSON.parse(raw) as number[];
            if (Array.isArray(parsed) && parsed.length === audiences.length) return parsed;
          }
        } catch (e) {}
        return audiences.map(() => DEFAULT_COL_WIDTH);
      })()
  );

  // drag state for resizing
  const dragRef = useRef<{ index: number; startX: number; startWidth: number } | null>(null);
  useEffect(() => {
    function onMove(e: MouseEvent) {
      if (!dragRef.current) return;
      const { index, startX, startWidth } = dragRef.current;
      const dx = e.clientX - startX;
      const next = [...colWidths];
      next[index] = Math.max(80, Math.round(startWidth + dx));
      setColWidths(next);
    }
    function onUp() {
      if (!dragRef.current) return;
      // save
      try {
        localStorage.setItem(storageKey, JSON.stringify(colWidths));
      } catch {}
      dragRef.current = null;
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    }
    if (dragRef.current) {
      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onUp);
    }
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colWidths, storageKey]);

  function startResize(e: React.MouseEvent, index: number) {
    e.preventDefault();
    dragRef.current = { index, startX: e.clientX, startWidth: colWidths[index] };
    // listeners set in effect
  }

  // visual feedback & modal
  const [activeCell, setActiveCell] = useState<ActiveCell>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pressingCell, setPressingCell] = useState<string | null>(null); // key for temporary animation

  function handleCellClick(auditorium: string, hour: number) {
    const key = `${auditorium}_${hour}`;
    // quick visual feedback
    setPressingCell(key);
    setTimeout(() => setPressingCell(null), 180);

    // show loading then open modal (simulate async)
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setActiveCell({ auditorium, hour });
    }, 250); // small delay so user sees spinner if network slow
  }

  // create lesson (example)
  function createLesson(payload: Partial<Lesson>) {
    setIsLoading(true);
    setTimeout(() => {
      const newLesson: Lesson = {
        id: `l_${Date.now()}`,
        auditorium: payload.auditorium || audiences[0],
        startHour: payload.startHour || startHour,
        durationHours: payload.durationHours || 1,
        teacherId: payload.teacherId || (currentUser?.id ?? 'unknown'),
        studentName: payload.studentName || 'Новый ученик',
        createdBy: currentUser?.id,
        status: 'ok',
      };
      setLessons((s) => [...s, newLesson]);
      setIsLoading(false);
      setActiveCell(null);
    }, 600);
  }

  function cancelLesson(id: string) {
    setIsLoading(true);
    setTimeout(() => {
      setLessons((s) => s.filter((x) => x.id !== id));
      setIsLoading(false);
      setActiveCell(null);
    }, 500);
  }

  function findLesson(aud: string, h: number) {
    return lessons.find((l) => l.auditorium === aud && l.startHour === h);
  }

  function getTeacherName(id?: string) {
    if (!id) return '—';
    const t = teachers.find((x) => x.id === id);
    return t?.name ?? id;
  }

  return (
    <div className="relative">
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/40">
          <div className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      <div className="flex border rounded overflow-hidden" style={{ minHeight: 200 }}>
        {/* times column */}
        <div style={{ width: TIMES_COL_WIDTH }} className="bg-gray-50 border-r flex-shrink-0">
          <div className="h-12 flex items-center justify-center font-semibold">Время</div>
          {hours.map((h) => (
            <div key={h} className="h-20 flex items-center justify-center border-t text-sm">
              {h}:00
            </div>
          ))}
        </div>

        {/* audiences columns */}
        <div className="overflow-auto" style={{ flex: 1 }}>
          <div style={{ display: 'flex', minWidth: audiences.length * 80 }}>
            {audiences.map((aud, i) => (
              <div
                key={aud}
                style={{ width: colWidths[i], minWidth: 80 }}
                className="border-l last:border-r"
              >
                <div className="h-12 flex items-center justify-center font-semibold bg-white sticky top-0 z-10 border-b">
                  <span>{aud}</span>
                  {/* resizer handle: positioned on the right edge */}
                  <div
                    onMouseDown={(e) => startResize(e, i)}
                    className="absolute right-0 top-0 h-full w-2 cursor-col-resize"
                    style={{ transform: 'translateX(-1px)' }}
                    aria-hidden
                  />
                </div>

                {hours.map((h) => {
                  const lesson = findLesson(aud, h);
                  const cellKey = `${aud}_${h}`;
                  return (
                    <div
                      key={cellKey}
                      onClick={() => handleCellClick(aud, h)}
                      className={`h-20 border-t p-1 cursor-pointer transition-transform duration-150 ${
                        pressingCell === cellKey ? 'scale-95' : ''
                      }`}
                    >
                      {lesson ? (
                        <div
                          className="h-full rounded p-2 text-white flex flex-col justify-center"
                          style={{
                            background: getColorForId(lesson.teacherId),
                            height: '100%',
                          }}
                        >
                          <div className="font-medium truncate">{lesson.studentName}</div>
                          <div className="text-xs opacity-90">{getTeacherName(lesson.teacherId)}</div>
                          {lesson.durationHours > 1 && (
                            <div className="text-xs opacity-80">⏱ {lesson.durationHours} ч</div>
                          )}
                        </div>
                      ) : (
                        <div className="h-full flex items-center justify-center text-sm text-gray-400">—</div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for active cell */}
      {activeCell && (
        <div className="fixed inset-0 z-60 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setActiveCell(null)}
            aria-hidden
          />
          <div className="bg-white rounded-lg p-6 z-70 w-[min(720px,95%)] shadow-lg">
            <h3 className="text-lg font-semibold mb-3">
              {activeCell.auditorium} · {activeCell.hour}:00
            </h3>

            <div className="mb-4">
              <div className="text-sm text-gray-600 mb-2">Существующие занятия в этом слоте:</div>
              <div className="space-y-2 max-h-40 overflow-auto">
                {lessons
                  .filter((l) => l.auditorium === activeCell.auditorium && l.startHour === activeCell.hour)
                  .map((l) => (
                    <div
                      key={l.id}
                      className="flex items-center justify-between p-2 border rounded"
                    >
                      <div>
                        <div className="font-medium">{l.studentName}</div>
                        <div className="text-xs text-gray-500">{getTeacherName(l.teacherId)}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => cancelLesson(l.id)}
                          className="text-sm text-red-600 px-3 py-1 rounded border"
                        >
                          Отменить
                        </button>
                      </div>
                    </div>
                  ))}

                {lessons.filter((l) => l.auditorium === activeCell.auditorium && l.startHour === activeCell.hour).length === 0 && (
                  <div className="text-sm text-gray-500">Свободно</div>
                )}
              </div>
            </div>

            <div className="mb-4">
              <div className="text-sm text-gray-600 mb-2">Создать новое занятие</div>
              <div className="flex gap-2 items-center">
                <select id="teacher" className="border px-3 py-2 rounded" defaultValue={currentUser?.id ?? ''}>
                  {teachers.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>

                <input id="student" placeholder="Имя ученика" className="border px-3 py-2 rounded flex-1" />

                <select id="duration" defaultValue="1" className="border px-3 py-2 rounded">
                  <option value="1">1 час</option>
                  <option value="1.5">1.5 часа</option>
                  <option value="2">2 часа</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button onClick={() => setActiveCell(null)} className="px-4 py-2 rounded border">
                Закрыть
              </button>
              <button
                onClick={() => {
                  // read fields
                  const teacherSelect = (document.getElementById('teacher') as HTMLSelectElement | null)!;
                  const studentInput = (document.getElementById('student') as HTMLInputElement | null)!;
                  const durationSelect = (document.getElementById('duration') as HTMLSelectElement | null)!;
                  createLesson({
                    auditorium: activeCell.auditorium,
                    startHour: activeCell.hour,
                    durationHours: Number(durationSelect.value),
                    teacherId: teacherSelect?.value || currentUser?.id,
                    studentName: studentInput?.value || 'Новый ученик',
                  });
                }}
                className="px-4 py-2 rounded bg-primary text-white"
              >
                Создать
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
