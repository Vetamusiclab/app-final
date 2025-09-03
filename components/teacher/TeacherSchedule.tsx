// components/teacher/TeacherSchedule.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import type { Lesson, LessonStatus } from '@/types/schedule';

type Props = { teacherId: string; teacherName: string };

const HOURS_FROM = 9;   // начало сетки (9:00)
const HOURS_TO = 21;    // конец сетки (21:00)
const STEP_MIN = 60;    // шаг строк (60 минут)

export default function TeacherSchedule({ teacherId, teacherName }: Props) {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // форма «добавить занятие»
  const [start, setStart] = useState<string>(''); // datetime-local
  const [duration, setDuration] = useState<number>(60);
  const [subject, setSubject] = useState<string>('Урок');
  const [student, setStudent] = useState<string>('');
  const [comment, setComment] = useState<string>('');

  // навигация по неделям
  const [weekStart, setWeekStart] = useState(startOfWeek(new Date()));

  const weekDays = useMemo(() => {
    const arr: Date[] = [];
    for (let i = 0; i < 7; i++) arr.push(addDays(weekStart, i));
    return arr;
  }, [weekStart]);

  const gridRows = useMemo(() => {
    const arr: string[] = [];
    for (let h = HOURS_FROM; h <= HOURS_TO; h += STEP_MIN / 60) {
      const hh = String(h).padStart(2, '0');
      arr.push(`${hh}:00`);
    }
    return arr;
  }, []);

  const weekLessons = useMemo(() => {
    return lessons.filter((l) => isSameWeek(new Date(l.startISO), weekStart));
  }, [lessons, weekStart]);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/teacher/schedule?teacherId=${encodeURIComponent(teacherId)}`, { cache: 'no-store' });
      const data = await res.json();
      if (!res.ok || !data?.ok) throw new Error(data?.error || 'Failed to load');
      setLessons(data.lessons as Lesson[]);
    } catch (e: any) {
      setError(e?.message || 'Ошибка загрузки');
    } finally {
      setLoading(false);
    }
  }

  async function addLessonRequest() {
    if (!start || !duration || !student.trim()) {
      alert('Укажите дату/время, длительность и имя ученика');
      return;
    }
    try {
      const res = await fetch('/api/teacher/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          teacherId,
          startISO: start,
          durationMinutes: duration,
          subject,
          studentName: student,
          comment,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) throw new Error(data?.error || 'Failed to add');
      setLessons((prev) => [...prev, data.lesson as Lesson]);
      // сброс формы
      setStart('');
      setDuration(60);
      setSubject('Урок');
      setStudent('');
      setComment('');
    } catch (e: any) {
      alert(e?.message || 'Не удалось добавить занятие');
    }
  }

  async function updateStatus(id: string, status: LessonStatus) {
    try {
      const res = await fetch('/api/teacher/schedule', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ teacherId, id, status }),
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) throw new Error(data?.error || 'Failed to update');
      setLessons((prev) => prev.map((l) => (l.id === id ? (data.lesson as Lesson) : l)));
    } catch (e: any) {
      alert(e?.message || 'Не удалось обновить статус');
    }
  }

  async function removeLesson(id: string) {
    if (!confirm('Удалить занятие?')) return;
    try {
      const res = await fetch(
        `/api/teacher/schedule?teacherId=${encodeURIComponent(teacherId)}&id=${encodeURIComponent(id)}`,
        { method: 'DELETE' }
      );
      const data = await res.json();
      if (!res.ok || !data?.ok) throw new Error(data?.error || 'Failed to delete');
      setLessons((prev) => prev.filter((l) => l.id !== id));
    } catch (e: any) {
      alert(e?.message || 'Не удалось удалить занятие');
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teacherId]);

  return (
    <div className="space-y-6">
      {/* Заголовок */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-500">Преподаватель</div>
          <div className="text-lg font-semibold">{teacherName}</div>
        </div>

        {/* Навигация по неделям */}
        <div className="flex items-center gap-2">
          <button
            className="px-3 py-2 rounded border"
            onClick={() => setWeekStart(addDays(weekStart, -7))}
          >
            ← Пред. неделя
          </button>
          <div className="text-sm text-gray-600">
            {formatRange(weekStart, addDays(weekStart, 6))}
          </div>
          <button
            className="px-3 py-2 rounded border"
            onClick={() => setWeekStart(addDays(weekStart, +7))}
          >
            След. неделя →
          </button>
        </div>
      </div>

      {/* Форма добавления */}
      <div className="bg-white rounded shadow p-4">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Дата и время</label>
            <input
              type="datetime-local"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Длительность (мин)</label>
            <input
              type="number"
              min={15}
              step={15}
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value || '0', 10))}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Предмет</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              placeholder="Вокал / Гитара …"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Ученик</label>
            <input
              type="text"
              value={student}
              onChange={(e) => setStudent(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              placeholder="Имя ученика"
            />
          </div>
          <div className="lg:col-span-1 sm:col-span-2">
            <label className="block text-sm text-gray-600 mb-1">Комментарий</label>
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              placeholder="Опционально"
            />
          </div>
        </div>
        <div className="mt-3">
          <button
            onClick={addLessonRequest}
            className="px-4 py-2 rounded text-white bg-orange-500 hover:bg-orange-600"
          >
            Добавить занятие
          </button>
        </div>
      </div>

      {/* Сетка расписания недели */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-[800px] w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-2 text-left text-xs font-medium text-gray-500 border"></th>
              {weekDays.map((d) => (
                <th key={d.toDateString()} className="p-2 text-left text-xs font-medium text-gray-500 border">
                  {weekdayLabel(d)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {gridRows.map((hhmm) => (
              <tr key={hhmm}>
                <td className="align-top p-2 text-xs text-gray-500 border w-20">{hhmm}</td>
                {weekDays.map((day) => {
                  const items = collectForCell(day, hhmm, weekLessons);
                  return (
                    <td key={day.toDateString() + hhmm} className="align-top p-2 border">
                      <div className="space-y-2">
                        {items.map((l) => (
                          <LessonCard
                            key={l.id}
                            lesson={l}
                            onDelete={() => removeLesson(l.id)}
                            onStatus={(s) => updateStatus(l.id, s)}
                          />
                        ))}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>

        {loading && <div className="p-4 text-sm text-gray-500">Загрузка…</div>}
        {error && !loading && <div className="p-4 text-sm text-red-600">{error}</div>}
      </div>
    </div>
  );
}

/* ---------- Вспомогательные компоненты/утилиты ---------- */

function LessonCard({
  lesson,
  onDelete,
  onStatus,
}: {
  lesson: Lesson;
  onDelete: () => void;
  onStatus: (s: LessonStatus) => void;
}) {
  const badge =
    lesson.status === 'planned'
      ? 'bg-green-100 text-green-700'
      : lesson.status === 'done'
      ? 'bg-gray-100 text-gray-700'
      : 'bg-red-100 text-red-700';

  return (
    <div className="border rounded p-2">
      <div className="flex items-center justify-between gap-2">
        <div className={`text-[11px] px-2 py-0.5 rounded ${badge}`}>{statusLabel(lesson.status)}</div>
        <div className="text-[11px] text-gray-500">
          {timeRange(lesson.startISO, lesson.endISO)}
        </div>
      </div>
      <div className="mt-1 text-sm font-medium">{lesson.subject}</div>
      <div className="text-xs text-gray-600">Ученик: {lesson.studentName}</div>
      {lesson.replacementTeacherName && (
        <div className="text-[11px] text-orange-600 mt-1">
          Замена: {lesson.replacementTeacherName}
        </div>
      )}
      {lesson.comment && <div className="text-xs text-gray-500 mt-1">{lesson.comment}</div>}

      <div className="mt-2 flex items-center gap-2">
        <select
          className="text-xs border rounded px-2 py-1"
          value={lesson.status}
          onChange={(e) => onStatus(e.target.value as LessonStatus)}
        >
          <option value="planned">Запланировано</option>
          <option value="done">Проведено</option>
          <option value="canceled">Отменено</option>
        </select>

        <button
          onClick={onDelete}
          className="ml-auto text-xs px-3 py-1 border rounded hover:bg-gray-50"
        >
          Удалить
        </button>
      </div>
    </div>
  );
}

function statusLabel(s: LessonStatus) {
  return s === 'planned' ? 'Запланировано' : s === 'done' ? 'Проведено' : 'Отменено';
}

function weekdayLabel(d: Date) {
  return d.toLocaleDateString(undefined, { weekday: 'short', day: '2-digit', month: '2-digit' });
}

function timeRange(startISO: string, endISO: string) {
  const st = new Date(startISO);
  const en = new Date(endISO);
  const f = (x: Date) => x.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
  return `${f(st)}–${f(en)}`;
}

function startOfWeek(d: Date) {
  const copy = new Date(d);
  const day = (copy.getDay() + 6) % 7; // 0=Mon
  copy.setHours(0, 0, 0, 0);
  copy.setDate(copy.getDate() - day);
  return copy;
}

function addDays(d: Date, n: number) {
  const c = new Date(d);
  c.setDate(c.getDate() + n);
  return c;
}

function isSameWeek(d: Date, weekStart: Date) {
  const ws = startOfWeek(d);
  return ws.toDateString() === weekStart.toDateString();
}

function collectForCell(day: Date, hhmm: string, lessons: Lesson[]) {
  const [H] = hhmm.split(':').map((x) => parseInt(x, 10));
  return lessons.filter((l) => {
    const s = new Date(l.startISO);
    return (
      s.getFullYear() === day.getFullYear() &&
      s.getMonth() === day.getMonth() &&
      s.getDate() === day.getDate() &&
      s.getHours() === H
    );
  });
}

function formatRange(a: Date, b: Date) {
  const opts: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit' };
  return `${a.toLocaleDateString(undefined, opts)} — ${b.toLocaleDateString(undefined, opts)}`;
}
