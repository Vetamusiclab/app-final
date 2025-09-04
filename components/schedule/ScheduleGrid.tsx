// components/schedule/ScheduleGrid.tsx
'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { Lesson } from '@/types/lesson';
import type { User } from '@/types/user';

type Props = {
  initialLessons: Lesson[];
  teachers: User[]; // список преподавателей (для цвета/имени)
  audiences: string[]; // список аудиторий, например ['216','222',...]
  currentUser?: User;
  startHour?: number; // например 9
  endHour?: number; // например 22
  onLessonClick?: (lesson: Lesson) => void;
};

function hourLabel(h: number) {
  return `${String(h).padStart(2, '0')}:00`;
}

// Простейшая детерминированная функция цвета по id преподавателя
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
  currentUser,
  startHour = 9,
  endHour = 22,
  onLessonClick,
}: Props) {
  const hours = useMemo(() => {
    const arr: number[] = [];
    for (let h = startHour; h < endHour; h++) arr.push(h);
    return arr;
  }, [startHour, endHour]);

  // состояния ширин колонок по аудиториям (в px)
  const [colWidths, setColWidths] = useState<Record<string, number>>({});

  // инициализация ширин при смене аудиторий
  useEffect(() => {
    const initial: Record<string, number> = {};
    audiences.forEach((a) => {
      // если уже есть — сохраняем, иначе дефолт 260
      initial[a] = colWidths[a] ?? 260;
    });
    setColWidths(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audiences]);

  // реф для текущего ресайза
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

  // covered для пропуска ячеек rowspan
  const covered = useRef(new Set<string>());

  // обновляем covered каждый рендер
  useEffect(() => {
    covered.current = new Set();
  }, [initialLessons, audiences, hours]);

  return (
    <div className="w-full overflow-auto border rounded bg-white">
      <table className="table-fixed border-collapse w-full">
        <thead>
          <tr>
            <th
              className="sticky left-0 z-20 bg-white border-r px-3 py-2 text-sm"
              style={{ width: 88, minWidth: 88 }}
            >
              Время
            </th>

            {audiences.map((a) => (
              <th
                key={a}
                className="border px-2 py-2 text-left align-top relative"
                style={{
                  width: colWidths[a],
                  minWidth: colWidths[a],
                  maxWidth: 'none',
                }}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="font-medium">{a}</div>
                  {/* резайзер */}
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
          {hours.map((hour) => {
            return (
              <tr key={hour}>
                <td className="border px-2 py-3 text-sm text-gray-700 sticky left-0 bg-white z-10">
                  {hourLabel(hour)}
                </td>

                {audiences.map((aud) => {
                  // если покрыто - возвращаем null (пропускаем ячейку)
                  if (covered.current.has(`${aud}_${hour}`)) return null;

                  const lesson = initialLessons.find(
                    (l) => l.auditorium === aud && l.startHour === hour
                  );

                  if (lesson) {
                    // помечаем покрытое время
                    for (let k = 1; k < Math.max(1, lesson.durationHours); k++) {
                      covered.current.add(`${aud}_${hour + k}`);
                    }

                    const teacher = teachers?.find((t) => t.id === lesson.teacherId);
                    const isByCurrentUser = currentUser?.id === lesson.createdBy || currentUser?.id === lesson.teacherId;

                    return (
                      <td
                        key={aud}
                        rowSpan={Math.max(1, lesson.durationHours)}
                        className="border px-2 py-2 align-top"
                        style={{ verticalAlign: 'top' }}
                      >
                        <div
                          role="button"
                          onClick={() => onLessonClick?.(lesson)}
                          className={`rounded p-3 cursor-pointer select-none transition-shadow ${
                            isByCurrentUser ? 'ring-2 ring-offset-1' : ''
                          }`}
                          style={{
                            background: teacherColor(lesson.teacherId),
                            color: '#fff',
                          }}
                        >
                          <div className="font-semibold text-sm truncate">{lesson.studentName ?? '—'}</div>
                          <div className="text-xs opacity-90">
                            {teacher?.name ?? lesson.teacherId} • {lesson.durationHours}ч
                          </div>
                          <div className="text-xs opacity-80 mt-1">Ауд.: {lesson.auditorium}</div>
                        </div>
                      </td>
                    );
                  }

                  // пустая клетка — позволит кликнуть для создания (если нужно)
                  return <td key={aud} className="border px-2 py-6" style={{ minWidth: colWidths[aud] }} />;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
