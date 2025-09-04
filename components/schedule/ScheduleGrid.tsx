'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import BookingModal from './BookingModal';
import type { User } from '@/types/user';

type Lesson = {
  id: string;
  teacherId: string;
  studentName?: string;
  auditorium: string;
  startHour: number; // e.g. 9, 14
  durationHours: number; // integer >=1
  status?: 'ok' | 'cancelled' | 'transfer';
};

type Props = {
  initialLessons?: Lesson[];
  teachers?: User[]; // для выбора преподавателя
  auditoriums?: string[]; // список аудиторий (колонки)
  currentUser?: User | null; // для прав доступа
  teacherColors?: Record<string, string>; // mapping teacherId -> color
};

const ROW_HEIGHT = 72; // px per hour (you can tweak)
const START_HOUR = 9;
const END_HOUR = 22; // inclusive

export default function ScheduleGrid({
  initialLessons = [],
  teachers = [],
  auditoriums = ['216', '222', '223', '244', '260', '11A'],
  currentUser = null,
  teacherColors = {},
}: Props) {
  const [lessons, setLessons] = useState<Lesson[]>(initialLessons);
  const [colWidths, setColWidths] = useState<number[]>(
    () => auditoriums.map(() => 260)
  );
  const resizingRef = useRef<{ idx: number; startX: number; startW: number } | null>(null);

  // modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalInit, setModalInit] = useState<{ auditorium?: string; hour?: number } | null>(null);

  // times array (hours from START_HOUR to END_HOUR)
  const hours = useMemo(() => {
    const arr: number[] = [];
    for (let h = START_HOUR; h <= END_HOUR; h++) arr.push(h);
    return arr;
  }, []);

  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      if (!resizingRef.current) return;
      const { idx, startX, startW } = resizingRef.current;
      const dx = e.clientX - startX;
      setColWidths((prev) => {
        const next = [...prev];
        const newW = Math.max(140, Math.round(startW + dx));
        next[idx] = newW;
        return next;
      });
    }
    function onUp() {
      resizingRef.current = null;
      document.body.style.userSelect = '';
    }
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, []);

  function startResize(idx: number, e: React.MouseEvent) {
    resizingRef.current = { idx, startX: e.clientX, startW: colWidths[idx] };
    document.body.style.userSelect = 'none';
  }

  function openCreateModal(auditorium: string, hour: number) {
    setModalInit({ auditorium, hour });
    setModalOpen(true);
  }

  function createLesson(data: Omit<Lesson, 'id'>) {
    const newLesson: Lesson = { ...data, id: String(Date.now() + Math.random()) };
    setLessons((s) => [...s, newLesson]);
    setModalOpen(false);
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <div className="inline-flex items-start gap-4">
          {/* Time column (left) */}
          <div style={{ minWidth: 100 }} className="flex-shrink-0">
            <div className="sticky top-0 bg-white z-10 p-2 border rounded-t-md">Время</div>
            <div>
              {hours.map((h) => (
                <div
                  key={h}
                  style={{ height: ROW_HEIGHT }}
                  className="border-b flex items-center justify-center text-sm text-gray-600"
                >
                  {String(h).padStart(2, '0')}:00
                </div>
              ))}
            </div>
          </div>

          {/* Auditorium columns */}
          {auditoriums.map((aud, idx) => (
            <div
              key={aud}
              className="relative flex-shrink-0 bg-white border rounded"
              style={{ minWidth: colWidths[idx] }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-2 border-b sticky top-0 bg-white z-10">
                <div className="font-medium">{aud}</div>
                <div
                  onMouseDown={(e) => startResize(idx, e)}
                  className="w-2 h-6 cursor-col-resize"
                  title="Изменить ширину"
                />
              </div>

              {/* Column body */}
              <div style={{ position: 'relative' }}>
                {/* Empty hourly rows */}
                <div>
                  {hours.map((h) => (
                    <div
                      key={h}
                      onDoubleClick={() => {
                        // double click to create at this hour (if allowed)
                        if (currentUser && (currentUser.role === 'teacher' || currentUser.role === 'admin')) {
                          openCreateModal(aud, h);
                        }
                      }}
                      style={{ height: ROW_HEIGHT }}
                      className="border-b hover:bg-gray-50 cursor-default"
                      title={currentUser && (currentUser.role === 'teacher' || currentUser.role === 'admin') ? 'Двойной клик — добавить урок' : ''}
                    />
                  ))}
                </div>

                {/* Render lessons for this auditorium */}
                {lessons
                  .filter((L) => L.auditorium === aud)
                  .map((L) => {
                    const top = (L.startHour - START_HOUR) * ROW_HEIGHT;
                    const height = L.durationHours * ROW_HEIGHT - 6;
                    const color = teacherColors[L.teacherId] ?? '#60A5FA';
                    const isCancelled = L.status === 'cancelled';
                    return (
                      <div
                        key={L.id}
                        className="absolute left-2 right-2 rounded-md p-2 shadow-md text-sm text-white overflow-hidden"
                        style={{
                          top,
                          height,
                          background: isCancelled ? '#ef4444' : color,
                        }}
                        title={`${L.studentName ?? '—'} — ${L.durationHours} ч`}
                      >
                        <div className="font-medium truncate">{L.studentName ?? '(Занятие)'}</div>
                        <div className="text-xs opacity-90">
                          {teachers.find((t) => t.id === L.teacherId)?.name ?? 'Преподаватель'} • {L.startHour}:00
                          {L.status === 'transfer' ? ' ⏱' : ''}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <BookingModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={(payload) => createLesson(payload)}
        defaultAuditorium={modalInit?.auditorium}
        defaultHour={modalInit?.hour}
        teachers={teachers}
        auditoriums={auditoriums}
      />
    </div>
  );
}
