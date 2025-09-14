// lib/schedule.ts
import type { Lesson as LessonType } from '@/types/lesson';
export type { Lesson as LessonType } from '@/types/lesson';

/**
 * Небольшая утилита для генерации id (демо)
 */
function makeId(prefix = 'ls'): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * Нормализует lesson: гарантируем поле audience (поддерживаем legacy auditorium)
 */
function normalizeLesson(input: Partial<LessonType> & { auditorium?: string }): LessonType {
  // создаём объект LessonType, подставляя дефолты
  const audience = input.audience ?? input.auditorium ?? (input as any).audience ?? '';
  const l: LessonType = {
    id: input.id ?? makeId(),
    audience,
    auditorium: input.auditorium ?? input.audience ?? audience,
    startHour: input.startHour ?? 9,
    durationHours: input.durationHours ?? 1,
    teacherId: input.teacherId ?? '',
    studentName: input.studentName ?? '',
    status: input.status ?? undefined,
    createdBy: input.createdBy ?? undefined,
    createdAt: input.createdAt ?? new Date().toISOString(),
  };
  return l;
}

/**
 * Демонстрационные уроки
 */
export const demoLessons: LessonType[] = [
  normalizeLesson({
    id: 'l1',
    audience: '216',
    startHour: 10,
    durationHours: 1,
    teacherId: 't1',
    studentName: 'Иван Петров',
    status: 'ok',
    createdBy: 't1',
    createdAt: '2024-08-01T10:00:00.000Z',
  }),
  normalizeLesson({
    id: 'l2',
    audience: '222',
    startHour: 11,
    durationHours: 1,
    teacherId: 't2',
    studentName: 'Анна Смирнова',
    status: 'confirmed',
    createdBy: 'a1',
    createdAt: new Date().toISOString(),
  }),
];

/**
 * Асинхронные хелперы (имитируют запросы)
 */
export function getAllLessons(): Promise<LessonType[]> {
  // возвращаем копию массива (чтобы не мутировать напрямую)
  return Promise.resolve(demoLessons.map((d) => ({ ...d })));
}

export function getLessonById(id: string): Promise<LessonType | undefined> {
  return Promise.resolve(demoLessons.find((l) => l.id === id));
}

export function addLesson(raw: Partial<LessonType> & { auditorium?: string }): Promise<LessonType> {
  const l = normalizeLesson(raw);
  demoLessons.push(l);
  return Promise.resolve(l);
}

export function updateLesson(id: string, patch: Partial<LessonType> & { auditorium?: string }): Promise<LessonType | null> {
  const idx = demoLessons.findIndex((l) => l.id === id);
  if (idx === -1) return Promise.resolve(null);
  const merged = { ...demoLessons[idx], ...patch };
  // normalized audience/auditorium
  const normalized = normalizeLesson(merged as Partial<LessonType> & { auditorium?: string });
  demoLessons[idx] = normalized;
  return Promise.resolve(normalized);
}

export function deleteLesson(id: string): Promise<boolean> {
  const idx = demoLessons.findIndex((l) => l.id === id);
  if (idx === -1) return Promise.resolve(false);
  demoLessons.splice(idx, 1);
  return Promise.resolve(true);
}

export default {
  demoLessons,
  getAllLessons,
  getLessonById,
  addLesson,
  updateLesson,
  deleteLesson,
};
