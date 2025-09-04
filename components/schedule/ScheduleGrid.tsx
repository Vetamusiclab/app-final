// components/schedule/ScheduleGrid.tsx
'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { Lesson } from '@/types/lesson';
import type { User } from '@/types/user';
import BookingModal from './BookingModal';
import ScheduleControls from './ScheduleControls';

type Props = {
  initialLessons: Lesson[];
  teachers: User[];
  audiences: string[]; // e.g. ['216','222',...]
  currentUser: User;
  startHour?: number; // default 9
  endHour?: number;   // default 22 (last visible start hour will be endHour-1)
};

export default function ScheduleGrid({
  initialLessons,
  teachers,
  audiences,
  currentUser,
  startHour = 9,
  endHour = 22,
}: Props) {
  // hours 9..21 when endHour = 22
  const hours = useMemo(() => {
    const arr: number[] = [];
    for (let h = startHour; h < endHour; h++) arr.push(h);
    return arr;
  }, [startHour, endHour]);

  const timeColWidth = 88;
  const defaultColWidth = 260;
  const minColWidth = 120;
  const rowHeight = 64;

  // local lessons state (so edits show immediately)
  const [lessons, setLessons] = useState<Lesson[]>(() => initialLessons ?? []);

  useEffect(() => setLessons(initialLessons ?? []), [initialLessons]);

  // per-audience widths (px)
  const [colWidths, setColWidths] = useState<number[]>(
    () => audiences.map(() => defaultColWidth)
  );

  // when audiences change, reset widths
  useEffect(() => setColWidths(audiences.map(() => defaultColWidth)), [audiences.join(',')]);

  // zoom scale
  const [scale, setScale] = useState<number>(1);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  // dragging column resize
  const dragRef = useRef<{ startX: number; colIndex: number; startWidth: number } | null>(null);

  function onHandleMouseDown(e: React.MouseEvent, idx: number) {
    dragRef.current = { startX: e.clientX, colIndex: idx, startWidth: colWidths[idx] };
    e.preventDefault();
  }

  useEffect(() => {
    function onMove(e: MouseEvent) {
      const drag = dragRef.current;
      if (!drag) return;
      const delta = e.clientX - drag.startX;
      setColWidths((prev) => {
        const next = [...prev];
        next[drag.colIndex] = Math.max(minColWidth, Math.round(drag.startWidth + delta));
        return next;
      });
    }
    function onUp() {
      dragRef.current = null;
    }
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, []);

  // Fit to screen: set scale so all columns fit into container width
  function fitToScreen() {
    const container = containerRef.current;
    if (!container) return;
    const totalColsWidth = timeColWidth + colWidths.reduce((a, b) => a + b, 0);
    const available = container.clientWidth - 16; // padding
    const newScale = Math.min(1, available / totalColsWidth);
    setScale(Number(newScale.toFixed(3)));
  }

  // recompute fit on resize
  useEffect(() => {
    fitToScreen();
    const onResize = () => fitToScreen();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colWidths]);

  // helpers to add/update/delete lessons locally
  function createLocalLesson(payload: Omit<Lesson, 'id' | 'createdAt'>) {
    const id = `l${Math.random().toString(36).slice(2, 9)}`;
    const newLesson: Lesson = { ...payload, id, createdAt: new Date().toISOString() };
    setLessons((s) => [...s, newLesson]);
    return newLesson;
  }

  function updateLocalLesson(id: string, patch: Partial<Lesson>) {
    setLessons((s) => s.map((l) => (l.id === id ? { ...l, ...patch } : l)));
  }

  function deleteLocalLesson(id: string) {
    setLessons((s) => s.filter((l) => l.id !== id));
  }

  // position helpers for grid
  const gridTemplateColumns = `${timeColWidth}px ${colWidths.map((w) => `${w}px`).join(' ')}`;
  const totalGridRows = hours.length + 1; // +1 for header row

  // map teacherId => color
  const teacherColors: Record<string, string> = useMemo(() => {
    const palette = [
      '#f97316', // orange
      '#06b6d4', // cyan
      '#7c3aed', // purple
      '#ef4444', // red
      '#10b981', // green
      '#eab308', // amber
      '#3b82f6', // blue
      '#db2777', // pink
    ];
    const map: Record<string, string> = {};
    let i = 0;
    for (const t of teachers) {
      map[t.id] = palette[i % palette.length];
      i++;
    }
    // ensure currentUser has color if teacher
    if (currentUser && !map[currentUser.id]) {
      map[currentUser.id] = palette[i % palette.length];
    }
    return map;
  }, [teachers, currentUser]);

  // occupied set so we can avoid drawing duplicate "lesson tiles"
  const occupied = useMemo(() => {
    const set = new Set<string>();
    lessons.forEach((l) => {
      for (let i = 0; i < (l.durationHours || 1); i++) {
        set.add(`${l.auditorium}-${(l.startHour ?? 0) + i}`);
      }
    });
    return set;
  }, [lessons]);

  // modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [initialSlot, setInitialSlot] = useState<{ audience: string; hour: number } | null>(null);

  function openCreate(aud: string, hour: number) {
    setEditingLesson(null);
    setInitialSlot({ audience: aud, hour });
    setModalOpen(true);
  }
  function openEdit(lesson: Lesson) {
    setEditingLesson(lesson);
    setInitialSlot(null);
    setModalOpen(true);
  }

  // click handlers for cells
  function onCellClick(aud: string, hour: number) {
    // if cell is covered by an existing lesson start, open that lesson
    const start = lessons.find((l) => l.auditorium === aud && l.startHour === hour);
    if (start) {
      openEdit(start);
      return;
    }
    // else open create modal
    openCreate(aud, hour);
  }

  return (
    <div className="flex flex-col gap-3">
      <ScheduleControls
        scale={scale}
        setScale={setScale}
        fitToScreen={fitToScreen}
      />

      <div ref={containerRef} className="rounded border bg-white p-2 overflow-auto">
        <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>
          <div
            ref={gridRef}
            style={{
              display: 'grid',
              gridTemplateColumns,
              gridAutoRows: `${rowHeight}px`,
              gap: '1px',
              background: '#e5e7eb',
              alignItems: 'stretch',
            }}
          >
            {/* Header time cell */}
            <div className="bg-gray-100 flex items-center justify-center font-medium" style={{ gridColumn: '1', gridRow: '1' }}>
              <div>Время / Аудитории</div>
            </div>

            {/* Audience headers (row 1) with drag handles */}
            {audiences.map((aud, idx) => (
              <div
                key={`aud-head-${aud}`}
                className="bg-gray-100 flex items-center justify-center font-medium relative"
                style={{ gridColumn: 2 + idx, gridRow: 1 }}
              >
                <div className="px-2 truncate">{aud}</div>

                {/* handle */}
                <div
                  onMouseDown={(e) => onHandleMouseDown(e, idx)}
                  className="absolute right-0 top-0 bottom-0 w-2 cursor-col-resize"
                  title="Переместите для изменения ширины"
                />
              </div>
            ))}

            {/* Time column cells (first column, rows 2..N) */}
            {hours.map((h, rIdx) => (
              <div
                key={`time-${h}`}
                className="bg-white flex items-center justify-center text-sm text-gray-700"
                style={{ gridColumn: '1', gridRow: `${rIdx + 2}` }}
              >
                {String(h).padStart(2, '0')}:00
              </div>
            ))}

            {/* Empty slot cells for each audience/hour to create the grid */}
            {hours.map((h, rIdx) =>
              audiences.map((aud, cIdx) => (
                <div
                  key={`cell-${aud}-${h}`}
                  className="bg-white relative"
                  style={{ gridColumn: 2 + cIdx, gridRow: `${rIdx + 2}` }}
                >
                  {/* clickable transparent layer */}
                  <button
                    onClick={() => onCellClick(aud, h)}
                    className="absolute inset-0 w-full h-full text-left hover:bg-gray-50"
                    aria-label={`Аудитория ${aud} ${h}:00`}
                  />
                </div>
              ))
            )}

            {/* Render lesson tiles as grid items that can span rows */}
            {lessons.map((l) => {
              const colIndex = audiences.indexOf(l.auditorium);
              if (colIndex === -1) return null;
              const rowStart = (l.startHour ?? startHour) - startHour + 2; // +2 because header + time header
              const rowSpan = Math.max(1, l.durationHours ?? 1);
              const gridCol = 2 + colIndex;
              const teacherColor = teacherColors[l.teacherId] ?? '#9ca3af';
              const isCanceled = l.status === 'canceled';
              return (
                <div
                  key={`lesson-${l.id}`}
                  role="button"
                  onClick={() => openEdit(l)}
                  style={{
                    gridColumn: gridCol,
                    gridRow: `${rowStart} / span ${rowSpan}`,
                    zIndex: 10,
                  }}
                >
                  <div
                    className="m-1 p-2 rounded shadow-md h-full overflow-hidden text-left"
                    style={{
                      background: isCanceled ? '#fecaca' : teacherColor,
                      color: '#111827',
                      minHeight: '0',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}
                  >
                    <div className="font-semibold truncate">{l.studentName ?? '—'}</div>
                    <div className="text-xs truncate">
                      {teachers.find((t) => t.id === l.teacherId)?.name ?? '—'} • {l.durationHours} ч
                    </div>
                    {l.status === 'transfer' && <div className="text-xs">⏱ перенос</div>}
                    {l.status === 'canceled' && <div className="text-xs">❌ отмена</div>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Booking modal */}
      {modalOpen && (
        <BookingModal
          initialSlot={initialSlot}
          lesson={editingLesson}
          teachers={teachers}
          audiences={audiences}
          startHour={startHour}
          endHour={endHour}
          onClose={() => {
            setModalOpen(false);
            setEditingLesson(null);
            setInitialSlot(null);
          }}
          onSave={(payload) => {
            if ((payload as Lesson).id) {
              // update
              updateLocalLesson((payload as Lesson).id, payload as Partial<Lesson>);
            } else {
              const created = createLocalLesson(payload as Omit<Lesson, 'id' | 'createdAt'>);
              // nothing else needed; we already updated state
            }
            setModalOpen(false);
          }}
          onDelete={(id) => {
            deleteLocalLesson(id);
            setModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
