// lib/schedule.ts
import type { Lesson } from '@/types/lesson';
export type { Lesson } from '@/types/lesson';

/**
 * Список аудиторий (именованный экспорт) — не readonly, чтобы TypeScript не ругался
 * Можно расширять в будущем (админ будет добавлять новые).
 */
export const AUDIENCES: string[] = ['216', '222', '223', '244', '260', '11A'];

/** Генератор простых id для демо */
function makeId(prefix = 'ls'): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * Нормализация lesson — гарантируем поле audience,
 * поддерживаем legacy-поле auditorium.
 */
function normalizeLesson(raw: Partial<Lesson> & { auditorium?: string }): Lesson {
  const audience = raw.audience ?? raw.auditorium ?? (raw as any).audience ?? '';
  return {
    id: raw.id ?? makeId(),
    // положим оба поля для совместимости (audience каноническое)
    audience,
    auditorium: raw.auditorium ?? raw.audience ?? audience,
    startHour: raw.startHour ?? 9,
    durationHours: raw.durationHours ?? 1,
    teacherId: raw.teacherId ?? '',
    studentName: raw.studentName ?? '',
    status: raw.status ?? undefined,
    createdBy: raw.createdBy ?? undefined,
    createdAt: raw.createdAt ?? new Date().toISOString(),
  };
}

/** Демонстрационные уроки */
export const demoLessons: Lesson[] = [
  normalizeLesson({
    id: 'l_1',
    audience: '216',
    startHour: 10,
    durationHours: 1,
    teacherId: 't1',
    studentName: 'Иван Петров',
    status: 'ok',
    createdBy: 't1',
    createdAt: new Date().toISOString(),
  }),
  normalizeLesson({
    id: 'l_2',
    audience: '222',
    startHour: 12,
    durationHours: 1,
    teacherId: 't2',
    studentName: 'Анна Смирнова',
    status: 'confirmed',
    createdBy: 'a1',
    createdAt: new Date().toISOString(),
  }),
];

/** Асинхронные хелперы для работы с уроками */
export function getAllLessons(): Promise<Lesson[]> {
  // возвращаем копию
  return Promise.resolve(demoLessons.map(l => ({ ...l })));
}

export function getLessonById(id: string): Promise<Lesson | undefined> {
  return Promise.resolve(demoLessons.find(l => l.id === id));
}

export function addLesson(raw: Partial<Lesson> & { auditorium?: string }): Promise<Lesson> {
  const l = normalizeLesson(raw);
  demoLessons.push(l);
  return Promise.resolve(l);
}

export function updateLesson(id: string, patch: Partial<Lesson> & { auditorium?: string }): Promise<Lesson | null> {
  const idx = demoLessons.findIndex(l => l.id === id);
  if (idx === -1) return Promise.resolve(null);
  const merged = { ...demoLessons[idx], ...patch };
  const normalized = normalizeLesson(merged as Partial<Lesson> & { auditorium?: string });
  demoLessons[idx] = normalized;
  return Promise.resolve(normalized);
}

export function deleteLesson(id: string): Promise<boolean> {
  const idx = demoLessons.findIndex(l => l.id === id);
  if (idx === -1) return Promise.resolve(false);
  demoLessons.splice(idx, 1);
  return Promise.resolve(true);
}

export default {
  AUDIENCES,
  demoLessons,
  getAllLessons,
  getLessonById,
  addLesson,
  updateLesson,
  deleteLesson,
};
