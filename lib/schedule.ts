// lib/schedule.ts
import type { Lesson } from '@/types/lesson';

/** Генератор простых id для демо */
function makeId(prefix = 'l') {
  return `${prefix}${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * Список аудиторий.
 * Важно: экспортируем как mutable string[] чтобы нигде не возникали ошибки с readonly tuple.
 */
export const AUDIENCES: string[] = ['216', '222', '223', '244', '260', '11A'];

/**
 * Демо-данные уроков. Поля и статусы соответствуют types/lesson.ts
 */
export const demoLessons: Lesson[] = [
  {
    id: makeId(),
    auditorium: '216',
    startHour: 10,
    durationHours: 1,
    teacherId: 't1',
    studentName: 'Иван Петров',
    status: 'scheduled',
    createdBy: 't1',
    createdAt: new Date().toISOString(),
  },
  {
    id: makeId(),
    auditorium: '222',
    startHour: 11,
    durationHours: 2,
    teacherId: 't2',
    studentName: 'Анна Смирнова',
    status: 'confirmed',
    createdBy: 'a1',
    createdAt: new Date().toISOString(),
  },
  {
    id: makeId(),
    auditorium: '223',
    startHour: 14,
    durationHours: 1,
    teacherId: 't1',
    studentName: 'Мария',
    status: 'ok',
    createdBy: 't1',
    createdAt: new Date().toISOString(),
  },
  {
    id: makeId(),
    auditorium: '244',
    startHour: 16,
    durationHours: 1,
    teacherId: 't3',
    studentName: 'Пётр',
    status: 'transfer',
    createdBy: 't3',
    createdAt: new Date().toISOString(),
  },
  {
    id: makeId(),
    auditorium: '260',
    startHour: 9,
    durationHours: 1,
    teacherId: 't2',
    studentName: 'Юлия',
    status: 'canceled',
    createdBy: 't2',
    createdAt: new Date().toISOString(),
  },
];

/**
 * Экспортированные хелперы — называются так, как их ждут страницы:
 * - getAllLessons() — для server components, возвращает Promise<Lesson[]>
 * - getLessonById(id)
 * - createLesson / updateLesson / deleteLesson — простая локальная логика для демо
 *
 * (Позже легко заменить на реальные API-запросы)
 */

export function getAllLessons(): Promise<Lesson[]> {
  return Promise.resolve(demoLessons);
}

export function getLessonById(id: string): Promise<Lesson | undefined> {
  return Promise.resolve(demoLessons.find((l) => l.id === id));
}

export function createLesson(newLesson: Omit<Lesson, 'id' | 'createdAt'>): Promise<Lesson> {
  const lesson: Lesson = {
    ...newLesson,
    id: makeId(),
    createdAt: new Date().toISOString(),
  };
  demoLessons.push(lesson);
  return Promise.resolve(lesson);
}

export function updateLesson(id: string, patch: Partial<Lesson>): Promise<Lesson | undefined> {
  const idx = demoLessons.findIndex((l) => l.id === id);
  if (idx === -1) return Promise.resolve(undefined);
  demoLessons[idx] = { ...demoLessons[idx], ...patch };
  return Promise.resolve(demoLessons[idx]);
}

export function deleteLesson(id: string): Promise<boolean> {
  const idx = demoLessons.findIndex((l) => l.id === id);
  if (idx === -1) return Promise.resolve(false);
  demoLessons.splice(idx, 1);
  return Promise.resolve(true);
}
