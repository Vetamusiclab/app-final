// components/schedule/ScheduleGrid.tsx
'use client';

import React, { useMemo, useState } from 'react';
import type { Lesson } from '@/types/lesson';
import type { User } from '@/types/user';

type Props = {
  initialLessons: Lesson[];
  teachers: User[];
  // допускаем и readonly и обычный массив
  audiences: ReadonlyArray<string> | string[];
  currentUser: User;
  startHour?: number; // default 9
  endHour?: number;   // default 22
};

export default function ScheduleGrid({
  initialLessons,
  teachers,
  audiences,
  currentUser,
  startHour = 9,
  endHour = 22,
}: Props) {
  // приводим audiences к обычному массиву для внутреннего использования
  const audienceList = Array.from(audiences);

  // ширина колонок: по умолчанию 260px, можно регулировать
  const [colWidths, setColWidths] = useState(() =>
    audienceList.map(() => 260)
  );

  const hours = useMemo(() => {
    const arr: number[] = [];
    for (let h = startHour; h <= endHour - 1; h++) arr.push(h);
    return arr;
  }, [startHour, endHour]);

  function incWidth(i: number, delta = 20) {
    setColWidths((w) => w.map((v, idx) => (idx === i ? Math.max(120, v + delta) : v)));
  }

  // helper: find lesson that starts at hour & audience
  function lessonAt(audience: string, hour: number) {
    return initialLessons.find((l) => l.audience === audience && l.startHour === hour);
  }

  return (
    <div className="overflow-x-auto border rounded bg-white p-2">
      <div style={{ minWidth: Math.max(700, audienceList.length * 240) }}>
        {/* Header (audiences) */}
        <div className="flex items-stretch">
          <div style={{ width: 120 }} className="flex items-center justify-center border-r">
            <div className="text-sm text-muted">Время</div>
          </div>

          {audienceList.map((aud, i) => (
            <div
              key={aud}
              className="border-r flex flex-col"
              style={{ width: colWidths[i], minWidth: 120 }}
            >
              <div className="flex items-center justify-between px-3 py-2 bg-gray-50">
                <div className="font-semibold">{aud}</div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => incWidth(i, -20)}
                    className="px-2 py-1 text-xs border rounded"
                    aria-label="Уменьшить колонку"
                  >
                    −
                  </button>
                  <button
                    onClick={() => incWidth(i, +20)}
                    className="px-2 py-1 text-xs border rounded"
                    aria-label="Увеличить колонку"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* column body: rows per hour */}
              <div>
                {hours.map((hour) => {
                  const lesson = lessonAt(aud, hour);
                  if (!lesson) {
                    return (
                      <div
                        key={aud + hour}
                        className="h-16 border-b px-3 text-sm text-gray-600 flex items-center"
                      >
                        {`${hour}:00`}
                      </div>
                    );
                  }

                  // render lesson block spanning duration (visual only)
                  const duration = Math.max(1, Math.round(lesson.durationHours));
                  const height = 64 * duration; // 64px per hour row
                  const teacher = teachers.find((t) => t.id === lesson.teacherId);
                  const isCancelled = lesson.status === 'cancelled';

                  return (
                    <div
                      key={lesson.id}
                      className={`m-2 rounded px-3 py-2 shadow-sm text-sm ${
                        isCancelled ? 'bg-red-100 text-red-800' : 'bg-[#fff7ed] text-[#7a2e00]'
                      }`}
                      style={{ height }}
                    >
                      <div className="font-medium">{lesson.studentName}</div>
                      <div className="text-xs text-gray-500">
                        {teacher ? teacher.name : lesson.teacherId} • {lesson.startHour}:00 — {lesson.startHour + duration}:00
                        {lesson.status === 'transfer' && <span className="ml-2">⏱</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
