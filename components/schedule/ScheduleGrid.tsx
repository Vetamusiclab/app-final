// components/schedule/ScheduleGrid.tsx
'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { Lesson } from '@/types/lesson';
import type { User } from '@/types/user';
import BookingModal from '@/components/schedule/BookingModal';

type Props = {
  initialLessons: Lesson[];
  teachers: User[];
  audiences: string[]; // mutable array of audience ids/names
  currentUser?: User | null;
  startHour?: number;
  endHour?: number;
};

function hourLabel(h: number) {
  return `${String(h).padStart(2, '0')}:00`;
}

function teacherColor(id?: string) {
  if (!id) return 'hsl(0 0% 92%)';
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash << 5) - hash + id.charCodeAt(i);
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue} 72% 42%)`;
}

export default function ScheduleGrid({
  initialLessons,
  teachers,
  audiences,
  currentUser = null,
  startHour = 9,
  endHour = 22,
}: Props) {
  const [lessons, setLessons] = useState<Lesson[]>(initialLessons ?? []);
  const [zoom, setZoom] = useState<number>(1);
  const hours = useMemo(() => {
    const arr: number[] = [];
    for (let h = startHour; h <= endHour - 1; h++) arr.push(h);
    return arr;
  }, [startHour, endHour]);

  useEffect(() => setLessons(initialLessons ?? []), [initialLessons]);

  // column widths
  const [colWidths, setColWidths] = useState<Record<string, number>>(() => {
    const map: Record<string, number> = {};
    audiences.forEach((a) => (map[a] = 260));
    return map;
  });

  // resize handling
  const resizingRef = useRef<{ aud: string; startX: number; startWidth: number } | null>(null);
  function handleMouseDownResize(e: React.MouseEvent, aud: string) {
    e.preventDefault();
    resizingRef.current = { aud, startX: e.clientX, startWidth: colWidths[aud] ?? 260 };

    function onMove(ev: MouseEvent) {
      if (!resizingRef.current) return;
      const dx = ev.clientX - resizingRef.current.startX;
      const newW = Math.max(120, Math.round(resizingRef.current.startWidth + dx));
      setColWidths((prev) => ({ ...prev, [resizingRef.current!.aud]: newW }));
    }
    function onUp() {
      resizingRef.current = null;
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    }
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }

  // cover map to skip cells that are spanned by earlier rowspans
  const covered = useRef(new Set<string>());
  useEffect(() => {
    covered.current = new Set();
  }, [lessons, audiences, hours]);

  // modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalLesson, setModalLesson] = useState<Lesson | null>(null);
  const [modalDefaults, setModalDefaults] = useState<{ aud?: string; hour?: number }>({});

  function openNewCell(aud: string, hour: number) {
    setModalLesson(null);
    setModalDefaults({ aud, hour });
    setModalOpen(true);
  }

  function openEdit(lesson: Lesson) {
    setModalLesson(lesson);
    setModalDefaults({});
    setModalOpen(true);
  }

  function saveLesson(l: Lesson) {
    setLessons((prev) => {
      const exists = prev.find((x) => x.id === l.id);
      if (exists) {
        return prev.map((x) => (x.id === l.id ? l : x));
      } else {
        // ensure no exact overlap for same auditorium & hour; allow conflict but warn? For now replace overlapping exact start
        return [...prev.filter((x) => !(x.auditorium === l.auditorium && x.startHour === l.startHour)), l];
      }
    });
  }

  function deleteLesson(id: string) {
    setLessons((prev) => prev.filter((x) => x.id !== id));
  }

  return (
    <div className="w-full">
      <div className="mb-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setZoom((z) => Math.max(0.6, +(z - 0.1).toFixed(2)))}
            className="px-2 py-1 border rounded"
            aria-label="zoom out"
          >
            −
          </button>
          <div className="text-sm px-2">Масштаб: {(zoom * 100).toFixed(0)}%</div>
          <button
            onClick={() => setZoom((z) => Math.min(1.6, +(z + 0.1).toFixed(2)))}
            className="px-2 py-1 border rounded"
            aria-label="zoom in"
          >
            +
          </button>
        </div>

        <div className="text-sm text-gray-500">
          Подсказка: перетащи правую границу заголовка аудиторий чтобы изменить ширину колонки. Нажми на ячейку чтобы добавить/редактировать.
        </div>
      </div>

      <div
        className="overflow-auto border rounded bg-white"
        style={{ transformOrigin: 'top left', transform: `scale(${zoom})` }}
      >
        <table className="table-fixed border-collapse w-max min-w-full">
          <thead>
            <tr>
              <th
                className="sticky left-0 z-20 bg-white border-r px-3 py-2 text-sm"
                style={{ width: 90, minWidth: 90 }}
              >
                Время
              </th>

              {audiences.map((a) => (
                <th
                  key={a}
                  className="border px-2 py-2 text-left align-top relative"
                  style={{
                    width: colWidths[a],
                    minWidth: 120,
                    maxWidth: 'none',
                  }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="font-medium">{a}</div>
                    <div
                      onMouseDown={(e) => handleMouseDownResize(e, a)}
                      className="w-2 h-full cursor-col-resize -mr-1"
                      title="Изменить ширину"
                      style={{ touchAction: 'none' }}
                    />
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {hours.map((hour) => (
              <tr key={hour}>
                <td className="border px-2 py-3 text-sm text-gray-700 sticky left-0 bg-white z-10">
                  {hourLabel(hour)}
                </td>

                {audiences.map((aud) => {
                  // skip cell if covered by rowspan
                  if (covered.current.has(`${aud}_${hour}`)) return null;

                  const lesson = lessons.find((l) => l.auditorium === aud && l.startHour === hour);

                  if (lesson) {
                    for (let k = 1; k < Math.max(1, lesson.durationHours); k++) {
                      covered.current.add(`${aud}_${hour + k}`);
                    }

                    const teacher = teachers?.find((t) => t.id === lesson.teacherId);
                    const isMine = currentUser?.id === lesson.createdBy || currentUser?.id === lesson.teacherId;
                    const bg = lesson.status === 'canceled' ? '#ef4444' : teacherColor(lesson.teacherId);

                    return (
                      <td
                        key={`${aud}_${hour}`}
                        rowSpan={Math.max(1, lesson.durationHours)}
                        className="border px-2 py-2 align-top"
                        style={{ verticalAlign: 'top' }}
                      >
                        <div
                          role="button"
                          onClick={() => openEdit(lesson)}
                          className={`rounded p-3 cursor-pointer select-none transition-shadow hover:shadow-lg`}
                          style={{
                            background: bg,
                            color: '#fff',
                            boxShadow: isMine ? '0 4px 18px rgba(0,0,0,0.14)' : undefined,
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <div className="font-semibold text-sm truncate">{lesson.studentName}</div>
                            {lesson.status === 'transfer' && <div title="Перенос">⏱️</div>}
                            {lesson.status === 'canceled' && <div title="Отменен">❌</div>}
                          </div>
                          <div className="text-xs opacity-90 mt-1">
                            {teacher?.name ?? lesson.teacherId} • {lesson.durationHours} ч
                          </div>
                          <div className="text-xs opacity-80 mt-1">Ауд.: {lesson.auditorium}</div>
                        </div>
                      </td>
                    );
                  }

                  // пустая клетка — кликабельна
                  return (
                    <td
                      key={`${aud}_${hour}`}
                      className="border px-2 py-6"
                      style={{ minWidth: colWidths[aud] }}
                      onClick={() => openNewCell(aud, hour)}
                    >
                      <div className="h-full w-full flex items-center justify-center text-sm text-gray-400 hover:text-gray-700 cursor-pointer select-none">
                        +
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
        onClose={() => setModalOpen(false)}
        onSave={saveLesson}
        onDelete={deleteLesson}
        initial={modalLesson}
        teachers={teachers}
        audiences={audiences}
        defaultAuditorium={modalDefaults.aud}
        defaultStartHour={modalDefaults.hour}
        currentUser={currentUser}
      />
    </div>
  );
}
