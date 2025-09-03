// lib/scheduleStore.ts
import { randomUUID } from 'crypto';
import type { Lesson, LessonStatus } from '@/types/schedule';

type Store = Map<string, Lesson[]>;
const store: Store = new Map();

function ensureSeed(teacherId: string) {
  if (store.has(teacherId)) return;
  const today = new Date();
  const base = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 9, 0, 0));
  const mk = (offsetHours: number, durMin: number, subject: string, student: string, status: LessonStatus): Lesson => {
    const start = new Date(base.getTime() + offsetHours * 60 * 60 * 1000);
    const end = new Date(start.getTime() + durMin * 60 * 1000);
    return {
      id: randomUUID(),
      teacherId,
      startISO: start.toISOString(),
      endISO: end.toISOString(),
      subject,
      studentName: student,
      status,
    };
  };
  store.set(teacherId, [
    mk(0, 60, 'Вокал', 'Алина', 'planned'),
    mk(2, 45, 'Гитара', 'Данил', 'done'),
    mk(24 + 1, 60, 'Фортепиано', 'Марк', 'planned'),
  ]);
}

export function getLessons(teacherId: string): Lesson[] {
  ensureSeed(teacherId);
  return store.get(teacherId) ?? [];
}

export function addLesson(
  teacherId: string,
  startISO: string,
  durationMinutes: number,
  subject: string,
  studentName: string,
  comment?: string
): Lesson {
  ensureSeed(teacherId);
  const start = new Date(startISO);
  const end = new Date(start.getTime() + durationMinutes * 60 * 1000);
  const lesson: Lesson = {
    id: randomUUID(),
    teacherId,
    startISO: start.toISOString(),
    endISO: end.toISOString(),
    subject,
    studentName,
    comment,
    status: 'planned',
  };
  const arr = store.get(teacherId)!;
  arr.push(lesson);
  return lesson;
}

export function updateLesson(
  teacherId: string,
  id: string,
  patch: Partial<Omit<Lesson, 'id' | 'teacherId'> & { durationMinutes: number }>
): Lesson | null {
  ensureSeed(teacherId);
  const arr = store.get(teacherId)!;
  const i = arr.findIndex(l => l.id === id);
  if (i === -1) return null;

  let startISO = patch.startISO ?? arr[i].startISO;
  let endISO = patch.endISO ?? arr[i].endISO;

  if (patch.durationMinutes && (patch.startISO || patch.durationMinutes)) {
    const start = new Date(startISO);
    endISO = new Date(start.getTime() + patch.durationMinutes * 60 * 1000).toISOString();
  }

  const next: Lesson = {
    ...arr[i],
    ...patch,
    startISO,
    endISO,
  };
  arr[i] = next;
  return next;
}

export function removeLesson(teacherId: string, id: string): boolean {
  ensureSeed(teacherId);
  const arr = store.get(teacherId)!;
  const next = arr.filter(l => l.id !== id);
  const changed = next.length !== arr.length;
  store.set(teacherId, next);
  return changed;
}
