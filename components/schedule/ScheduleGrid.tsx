// components/schedule/ScheduleGrid.tsx
'use client';

import React, { useMemo } from 'react';
import type { Lesson } from '@/types/lesson';
import type { User } from '@/types/user';

type Props = {
  initialLessons: Lesson[];
  teachers: User[]; // список преподавателей (для цвета/имени)
  audiences: string[]; // список аудиторий, например ['216','222',...]
  startHour?: number; // например 9
  endHour?: number; // например 22
  onLessonClick?: (lesson: Lesson) => void;
};

function hourLabel(h: number) {
  return `${String(h).padStart(2, '0')}:00`;
}

// Простейшая детерминированная функция цвета по id преподавателя
function teacherColor(id?: string) {
  if (!id) return 'hsl(0 0% 90%)';
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash << 5) - hash + id.charCodeAt(i);
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue} 70% 45%)`;
}

export default function ScheduleGrid({
  initialLessons,
  teachers,
  audiences,
  startHour = 9,
  endHour = 22,
  onLessonClick,
}: Props) {
  const hours = useMemo(() => {
    const arr: number[] = [];
    for (let h = startHour; h < endHour; h++) arr.push(h);
    return arr;
  }, [startHour, endHour]);

  // covered set to skip cells that are part of a rowspan from earlier hours
  const covered = new Set<string>(); // key: `${aud}_${hour}`

  return (
    <div className="w-full overflow-auto">
      <table className="table-auto border-collapse w-full">
        <thead>
          <tr>
            <th className="sticky left-0 z-10 bg-white border px-3 py-2 w-24">Время</th>
            {audiences.map((a) => (
              <th key={a} className="border px-4 py-2 min-w-[220px] text-left bg-gray-50">
                {a}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {hours.map((hour) => (
            <tr key={hour}>
              <td className="border px-2 py-3 text-sm text-gray-700">{hourLabel(hour)}</td>

              {audiences.map((aud) => {
                // если этот слот покрыт предыдущим rowspan — пропускаем (null в react table)
                if (covered.has(`${aud}_${hour}`)) return null;

                // ищем урок, который начинается именно в этом часу и в этой аудитории
                const lesson = initialLessons.find(
                  (l) => l.auditorium === aud && l.startHour === hour
                );

                if (lesson) {
                  // помечаем покрытые часы (следующие) для этой аудитории
                  for (let k = 1; k < lesson.durationHours; k++) {
                    covered.add(`${aud}_${hour + k}`);
                  }

                  // найдём преподавателя для отображения имени (если есть)
                  const teacher = teachers?.find((t) => t.id === lesson.teacherId);

                  return (
                    <td
                      key={aud}
                      rowSpan={Math.max(1, lesson.durationHours)}
                      className="border px-3 py-2 align-top"
                    >
                      <div
                        role="button"
                        onClick={() => onLessonClick?.(lesson)}
                        className="rounded p-3 cursor-pointer select-none"
                        style={{
                          background: teacherColor(lesson.teacherId),
                          color: '#fff',
                        }}
                      >
                        <div className="font-semibold text-sm">{lesson.studentName ?? '—'}</div>
                        <div className="text-xs opacity-90">
                          {teacher?.name ?? lesson.teacherId} • {lesson.durationHours}ч
                        </div>
                        <div className="text-xs opacity-80 mt-1">Ауд.: {lesson.auditorium}</div>
                      </div>
                    </td>
                  );
                }

                // пустая ячейка (с возможностью кликнуть чтобы создать)
                return <td key={aud} className="border px-3 py-2" />;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
