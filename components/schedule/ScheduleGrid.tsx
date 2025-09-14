'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { Lesson } from '@/types/lesson';
import type { User } from '@/types/user';
import ScheduleControls from './ScheduleControls';
import BookingModal from './BookingModal'; // если у вас другой путь — исправьте

type Props = {
  initialLessons: Lesson[];
  teachers: User[]; // для цветов/имен
  audiences: string[]; // ['216','222',...]
  currentUser?: User | null;
  startHour?: number; // e.g. 9
  endHour?: number; // e.g. 22
};

const DEFAULT_AUD_COL = 220;
const DEFAULT_TIME_COL = 80;
const MIN_COL = 60;

export default function ScheduleGrid({
  initialLessons,
  teachers,
  audiences,
  currentUser,
  startHour = 9,
  endHour = 22,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // 1) формируем последовательность колонок: time, aud, aud, time, aud, aud, time...
  const columns = useMemo(() => {
    const cols: Array<{ type: 'time' | 'aud'; audience?: string }> = [];
    cols.push({ type: 'time' });
    for (let i = 0; i < audiences.length; i += 2) {
      cols.push({ type: 'aud', audience: audiences[i] });
      if (audiences[i + 1]) cols.push({ type: 'aud', audience: audiences[i + 1] });
      cols.push({ type: 'time' });
    }
    return cols;
  }, [audiences]);

  // 2) колонки ширины (в пикселях)
  const initialWidths = useMemo(() => {
    return columns.map((c) => (c.type === 'time' ? DEFAULT_TIME_COL : DEFAULT_AUD_COL));
  }, [columns]);

  const [widths, setWidths] = useState<number[]>(initialWidths);
  // если audiences меняются, сбросим ширины к дефолтным
  useEffect(() => setWidths(initialWidths), [initialWidths]);

  // 3) масштаб и fit-to-screen
  const [scale, setScale] = useState<number>(1);
  const [fitToScreen, setFitToScreen] = useState<boolean>(true);

  // recompute required width
  const requiredWidth = useMemo(() => widths.reduce((s, w) => s + w, 0), [widths]);

  // recompute auto-scale when fitToScreen or container resized
  useEffect(() => {
    if (!fitToScreen) return;
    function updateScale() {
      const el = containerRef.current;
      if (!el) return;
      const cw = el.clientWidth || el.getBoundingClientRect().width;
      if (requiredWidth === 0) return;
      const newScale = Math.min(1, cw / requiredWidth);
      setScale(+newScale.toFixed(3));
    }
    updateScale();
    const ro = new ResizeObserver(updateScale);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener('resize', updateScale);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateScale);
    };
  }, [requiredWidth, fitToScreen]);

  // 4) column resizing logic (drag)
  const dragging = useRef<{
    leftIndex: number;
    startX: number;
    startLeft: number;
    startRight: number;
  } | null>(null);

  useEffect(() => {
    function onMove(e: MouseEvent) {
      if (!dragging.current) return;
      const { leftIndex, startX, startLeft, startRight } = dragging.current;
      const dx = e.clientX - startX;
      let newLeft = Math.max(MIN_COL, startLeft + dx);
      let newRight = Math.max(MIN_COL, startRight - dx);
      // if right would be < MIN, adjust left accordingly
      if (newRight < MIN_COL) {
        const deficit = MIN_COL - newRight;
        newRight = MIN_COL;
        newLeft = Math.max(MIN_COL, newLeft - deficit);
      }
      setWidths((prev) => {
        const next = [...prev];
        next[leftIndex] = newLeft;
        next[leftIndex + 1] = newRight;
        return next;
      });
    }
    function onUp() {
      dragging.current = null;
      // if user had fitToScreen = true, we might want to recompute scale
      if (fitToScreen) {
        // force recompute by toggling
        setFitToScreen(true);
      }
    }
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [fitToScreen]);

  function onResizerMouseDown(index: number, e: React.MouseEvent) {
    const leftIndex = index;
    dragging.current = {
      leftIndex,
      startX: e.clientX,
      startLeft: widths[leftIndex],
      startRight: widths[leftIndex + 1],
    };
    e.preventDefault();
  }

  // helper: find lesson that starts at hour & audience
  function lessonAt(audience: string, hour: number) {
    return initialLessons.find((l) => {
      const aud = (l as any).audience ?? (l as any).auditorium;
      return aud === audience && Math.floor(l.startHour) === hour;
    });
  }

  // get teacher color
  function teacherColor(teacherId?: string) {
    const t = teachers.find((x) => x.id === teacherId);
    return t?.color ?? '#9ca3af';
  }

  // hours rows
  const hours = useMemo(() => {
    const arr: number[] = [];
    for (let h = startHour; h < endHour; h++) arr.push(h);
    return arr;
  }, [startHour, endHour]);

  // selected slot / modal stuff
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState<{ audience?: string; hour?: number; lesson?: Lesson } | null>(null);

  function handleCellClick(audience?: string, hour?: number, lesson?: Lesson) {
    setModalData({ audience, hour, lesson });
    setOpenModal(true);
  }

  // reset columns
  function resetColumns() {
    setWidths(initialWidths);
    setScale(1);
    setFitToScreen(true);
  }

  // build grid CSS template columns
  const gridTemplateColumns = widths.map((w) => `${w}px`).join(' ');

  return (
    <div className="w-full">
      <ScheduleControls
        scale={scale}
        setScale={(v) => { setScale(v); if (!fitToScreen) setFitToScreen(false); }}
        fitToScreen={fitToScreen}
        setFitToScreen={setFitToScreen}
        resetColumns={resetColumns}
      />

      <div ref={containerRef} className="relative w-full overflow-auto border rounded" style={{ minHeight: 300 }}>
        {/* wrapper to scale */}
        <div
          className="origin-top-left"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: '0 0',
          }}
        >
          {/* grid headers */}
          <div
            className="grid items-stretch"
            style={{
              gridTemplateColumns,
            }}
          >
            {/* header row */}
            {columns.map((col, ci) => (
              <div
                key={`h-${ci}`}
                className={`p-2 text-sm font-medium bg-gray-50 border-r border-b flex items-center justify-center relative`}
                style={{ minHeight: 36 }}
              >
                {col.type === 'time' ? 'Время' : `Аудитория ${col.audience}`}
                {/* resizer placed to the RIGHT of this column if next exists */}
                {ci < columns.length - 1 && (
                  <div
                    onMouseDown={(e) => onResizerMouseDown(ci, e)}
                    className="absolute right-0 top-0 bottom-0 w-2 -mr-1 cursor-col-resize"
                    style={{ zIndex: 50 }}
                    title="Изменить ширину"
                  />
                )}
              </div>
            ))}
          </div>

          {/* body rows */}
          <div>
            {hours.map((hour) => (
              <div
                key={`row-${hour}`}
                className="grid"
                style={{
                  gridTemplateColumns,
                  // each row's height (you can adjust)
                }}
              >
                {columns.map((col, ci) => {
                  if (col.type === 'time') {
                    return (
                      <div
                        key={`cell-${hour}-${ci}`}
                        className="p-2 border-r border-b bg-white text-sm flex items-center justify-center sticky left-0"
                        style={{ minHeight: 56 }}
                      >
                        {`${hour}:00`}
                      </div>
                    );
                  } else {
                    const aud = col.audience!;
                    const lesson = lessonAt(aud, hour);
                    const isCancelled = lesson?.status === 'cancelled' || lesson?.status === 'canceled';
                    const bg = lesson ? (isCancelled ? '#fee2e2' : teacherColor(lesson.teacherId)) : 'transparent';
                    const textColor = lesson ? '#fff' : '#111827';
                    return (
                      <div
                        key={`cell-${hour}-${aud}-${ci}`}
                        onClick={() => handleCellClick(aud, hour, lesson)}
                        className={`p-2 border-r border-b text-sm cursor-pointer select-none`}
                        style={{
                          minHeight: 56,
                          background: lesson ? bg : 'transparent',
                          color: lesson ? textColor : undefined,
                        }}
                        title={lesson ? `${lesson.studentName} — ${lesson.teacherId}` : `Свободно — ${aud} ${hour}:00`}
                      >
                        {lesson ? (
                          <div className="flex flex-col">
                            <div className="font-semibold truncate">{lesson.studentName || '—'}</div>
                            <div className="text-xs truncate opacity-90">
                              {teachers.find((t) => t.id === lesson.teacherId)?.name ?? lesson.teacherId}
                              {lesson.durationHours ? ` • ${lesson.durationHours}ч` : ''}
                              {lesson.status === 'transfer' && ' ⏱'}
                              {lesson.status === 'cancelled' && ' ❌'}
                            </div>
                          </div>
                        ) : (
                          <div className="text-xs text-gray-500">—</div>
                        )}
                      </div>
                    );
                  }
                })}
              </div>
            ))}
          </div>

          {/* legend / teachers colors */}
          <div className="mt-4 p-3 bg-white border rounded">
            <div className="text-sm font-medium mb-2">Легенда — педагоги</div>
            <div className="flex flex-wrap gap-2">
              {teachers.map((t) => (
                <div key={t.id} className="flex items-center gap-2 px-2 py-1 border rounded">
                  <div style={{ width: 16, height: 16, background: t.color ?? '#9ca3af', borderRadius: 4 }} />
                  <div className="text-sm">{t.name} {t.directions ? `• ${t.directions.join(', ')}` : ''}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* BookingModal — показываем при клике */}
      {openModal && modalData && (
        <BookingModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          initialSlot={modalData.audience ? { audience: modalData.audience, hour: modalData.hour } : undefined}
          initialLesson={modalData.lesson ?? undefined}
          teachers={teachers}
          audiences={audiences}
          startHour={startHour}
          endHour={endHour}
          onSave={(lesson) => {
            // интеграция: здесь вы должны сохранить урок через API / lib
            console.log('save lesson', lesson);
            setOpenModal(false);
          }}
          onDelete={(id) => {
            console.log('delete', id);
            setOpenModal(false);
          }}
        />
      )}
    </div>
  );
                                                           }
