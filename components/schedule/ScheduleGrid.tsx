// components/schedule/ScheduleGrid.tsx
'use client';

import React, { useMemo, useState } from 'react';
import type { Lesson } from '@/types/lesson';
import type { User } from '@/types/user';

type Props = {
  initialLessons: Lesson[];
  teachers: User[]; // для легенды/цветов
  audiences: string[];
  currentUser: User;
  startHour?: number;
  endHour?: number;
};

const DEFAULT_AUD_WIDTH = 240;
const TIME_WIDTH = 84;
const ROW_HEIGHT = 64;

function hashToColor(id: string) {
  const palette = ['#7C3AED', '#F97316', '#06B6D4', '#EF4444', '#10B981', '#6366F1', '#F59E0B'];
  let sum = 0;
  for (let i = 0; i < id.length; i++) sum = (sum * 31 + id.charCodeAt(i)) % 10000;
  return palette[sum % palette.length];
}

export default function ScheduleGrid({
  initialLessons,
  teachers,
  audiences,
  currentUser,
  startHour = 9,
  endHour = 22,
}: Props) {
  const [lessons, setLessons] = useState<Lesson[]>(initialLessons ?? []);
  // составляем последовательность колонок: Time, aud, aud, Time, aud, aud ...
  const sequence = useMemo(() => {
    const seq: { type: 'time' | 'aud'; key?: string }[] = [];
    seq.push({ type: 'time' });
    for (let i = 0; i < audiences.length; i += 2) {
      const a1 = audiences[i];
      const a2 = audiences[i + 1];
      if (a1) seq.push({ type: 'aud', key: a1 });
      if (a2) seq.push({ type: 'aud', key: a2 });
      seq.push({ type: 'time' });
    }
    return seq;
  }, [audiences]);

  const [colWidths, setColWidths] = useState<number[]>(
    () => sequence.map((c) => (c.type === 'time' ? TIME_WIDTH : DEFAULT_AUD_WIDTH))
  );
  const [scale, setScale] = useState<number>(1);

  // modal state
  const [modal, setModal] = useState<{ open: boolean; hour?: number; audience?: string; lesson?: Lesson | null }>({
    open: false,
    hour: undefined,
    audience: undefined,
    lesson: null,
  });

  const hours = useMemo(() => {
    const arr: number[] = [];
    for (let h = startHour; h < endHour; h++) arr.push(h);
    return arr;
  }, [startHour, endHour]);

  const teacherColors = useMemo(() => {
    const map = new Map<string, string>();
    for (const t of teachers) {
      map.set(t.id, (t as any).color || hashToColor(t.id || t.name || 'x'));
    }
    return map;
  }, [teachers]);

  function lessonStartAt(aud: string, hour: number) {
    return lessons.find((l) => l.audience === aud && Number(l.startHour) === Number(hour));
  }
  function lessonCovering(aud: string, hour: number) {
    return lessons.find((l) => {
      const s = Number(l.startHour);
      const d = Number(l.durationHours ?? 1);
      return l.audience === aud && s < hour && s + d > hour;
    });
  }

  function startResize(colIndex: number, startX: number) {
    const init = colWidths[colIndex];
    function onMove(e: MouseEvent) {
      const dx = e.clientX - startX;
      const newW = Math.max(60, Math.round(init + dx));
      setColWidths((prev) => {
        const copy = [...prev];
        copy[colIndex] = newW;
        return copy;
      });
    }
    function onUp() {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    }
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }

  function openModal(audience?: string, hour?: number, lesson?: Lesson | null) {
    setModal({ open: true, audience, hour, lesson: lesson ?? null });
  }
  function closeModal() {
    setModal({ open: false, audience: undefined, hour: undefined, lesson: null });
  }
  function saveLesson(payload: Partial<Lesson> & { id?: string }) {
    if (payload.id) {
      setLessons((prev) => prev.map((p) => (p.id === payload.id ? ({ ...p, ...payload } as Lesson) : p)));
    } else {
      const newL: Lesson = {
        id: `l_${Date.now()}`,
        audience: (payload.audience as string) || modal.audience || audiences[0],
        startHour: payload.startHour ?? modal.hour ?? startHour,
        durationHours: payload.durationHours ?? 1,
        teacherId: payload.teacherId ?? currentUser?.id ?? 'system',
        studentName: payload.studentName ?? '—',
        status: (payload as any).status ?? 'scheduled',
        createdBy: currentUser?.id ?? 'system',
        createdAt: new Date().toISOString(),
      };
      setLessons((prev) => [...prev, newL]);
    }
    closeModal();
  }

  return (
    <div className="w-full">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-sm text-gray-600">Расписание</div>
        <div className="flex items-center gap-2">
          <button onClick={() => setScale((s) => Math.max(0.5, +(s - 0.1).toFixed(2)))} className="px-2 py-1 border rounded">
            −
          </button>
          <div className="text-sm px-2">{Math.round(scale * 100)}%</div>
          <button onClick={() => setScale((s) => Math.min(2, +(s + 0.1).toFixed(2)))} className="px-2 py-1 border rounded">
            +
          </button>
        </div>
      </div>

      <div className="overflow-auto border rounded" style={{ transform: `scale(${scale})`, transformOrigin: 'left top' }}>
        <table className="schedule-table w-max border-collapse" style={{ borderSpacing: 0 }}>
          <colgroup>{sequence.map((_, i) => <col key={i} style={{ width: `${colWidths[i]}px` }} />)}</colgroup>
          <thead className="sticky top-0 bg-white">
            <tr>
              {sequence.map((col, i) =>
                col.type === 'time' ? (
                  <th key={i} className="p-2 text-left text-sm font-medium border-b border-r bg-gray-50">Время</th>
                ) : (
                  <th key={i} className="p-2 text-left text-sm font-medium border-b border-r bg-gray-50 relative">
                    <div className="flex items-center justify-between">
                      <div className="truncate">{col.key}</div>
                      <div
                        onMouseDown={(e) => {
                          e.preventDefault();
                          startResize(i, e.clientX);
                        }}
                        className="absolute right-0 top-0 h-full w-2 cursor-col-resize"
                        title="Изменить ширину"
                      />
                    </div>
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody>
            {hours.map((hour) => (
              <tr key={hour} style={{ height: ROW_HEIGHT }}>
                {sequence.map((col, ci) => {
                  if (col.type === 'time') {
                    return (
                      <td key={ci} className="p-2 border-r border-b bg-gray-50 text-sm font-medium sticky left-0">
                        {String(hour).padStart(2, '0')}:00
                      </td>
                    );
                  } else {
                    const aud = col.key!;
                    const covering = lessonCovering(aud, hour);
                    if (covering) return null;
                    const lesson = lessonStartAt(aud, hour);
                    if (lesson) {
                      const dur = Number(lesson.durationHours ?? 1);
                      const teacher = teachers.find((t) => t.id === lesson.teacherId);
                      const color = (teacher && (teacher as any).color) || hashToColor(lesson.teacherId || lesson.createdBy || lesson.id);
                      return (
                        <td key={ci} rowSpan={dur} className="p-2 align-top cursor-pointer" onClick={() => openModal(aud, hour, lesson)}>
                          <div className="h-full rounded-md shadow-sm" style={{ background: `${color}22`, border: `2px solid ${color}` }}>
                            <div className="p-2">
                              <div className="text-sm font-semibold" style={{ color }}>{lesson.studentName}</div>
                              <div className="text-xs text-gray-600">{teacher?.name ?? '—'}</div>
                              <div className="text-xs text-gray-500 mt-1">{`${hour}:00 — ${hour + dur}:00`}</div>
                              <div className="text-xs mt-2 text-gray-600">Аудитория: {aud}</div>
                            </div>
                          </div>
                        </td>
                      );
                    }
                    return (
                      <td key={ci} className="p-2 border-r border-b" onClick={() => openModal(aud, hour, null)}>
                        <div className="h-full min-h-[48px]" />
                      </td>
                    );
                  }
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Легенда */}
      <div className="mt-4 bg-white p-4 rounded shadow">
        <h3 className="text-sm font-medium mb-3">Легенда — педагоги</h3>
        <div className="grid grid-cols-3 gap-3">
          {teachers.map((t) => {
            const col = teacherColors.get(t.id) || hashToColor(t.id || t.name || '');
            return (
              <div key={t.id} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-md flex items-center justify-center" style={{ background: col, color: 'white' }}>
                  🎤
                </div>
                <div>
                  <div className="text-sm font-medium">{t.name}</div>
                  <div className="text-xs text-gray-500">{(t.directions || []).join(', ')}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={closeModal} />
          <div className="relative bg-white rounded-lg p-6 w-[420px] z-10 shadow-lg">
            <h4 className="text-lg font-semibold mb-3">{modal.lesson ? 'Редактировать занятие' : 'Создать занятие'}</h4>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-600">Аудитория</label>
                <select id="aud-select" defaultValue={modal.audience} className="w-full px-3 py-2 border rounded mt-1">
                  {audiences.map((a) => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-600">Час начала</label>
                <select id="hour-select" defaultValue={String(modal.hour ?? startHour)} className="w-full px-3 py-2 border rounded mt-1">
                  {Array.from({ length: endHour - startHour }).map((_, i) => {
                    const h = startHour + i;
                    return <option key={h} value={String(h)}>{String(h).padStart(2, '0')}:00</option>;
                  })}
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-600">Длительность (ч)</label>
                <input id="duration-input" defaultValue={(modal.lesson?.durationHours ?? 1).toString()} type="number" min={1} max={8} className="w-full px-3 py-2 border rounded mt-1"/>
              </div>
              <div>
                <label className="text-xs text-gray-600">Ученик</label>
                <input id="student-input" defaultValue={modal.lesson?.studentName ?? ''} className="w-full px-3 py-2 border rounded mt-1"/>
              </div>

              <div className="flex items-center justify-end gap-2 mt-4">
                <button onClick={closeModal} className="px-3 py-2 border rounded">Отмена</button>
                <button onClick={() => {
                  const aud = (document.getElementById('aud-select') as HTMLSelectElement).value;
                  const hr = Number((document.getElementById('hour-select') as HTMLSelectElement).value);
                  const dur = Number((document.getElementById('duration-input') as HTMLInputElement).value || 1);
                  const student = (document.getElementById('student-input') as HTMLInputElement).value || '—';
                  if (modal.lesson) {
                    saveLesson({ id: modal.lesson.id, audience: aud, startHour: hr, durationHours: dur, studentName: student });
                  } else {
                    saveLesson({ audience: aud, startHour: hr, durationHours: dur, studentName: student, teacherId: currentUser?.id });
                  }
                }} className="px-4 py-2 bg-indigo-600 text-white rounded">Сохранить</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
                    }
