// lib/schedule.ts
import type { Lesson } from '@/types/lesson';

/** Простая функция для генерации id в демо */
function makeId(prefix = 'l') {
  return `${prefix}${Math.random().toString(36).slice(2, 9)}`;
}

/** Список аудиторий (используется как строки в компонентах) */
export const AUDIENCES = ['216', '222', '223', '244', '260', '11A'] as const;

/** Демо-список уроков — убедитесь, что статусы совпадают с LessonStatus */
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
    status: 'confirmed', // теперь валидно (в LessonStatus)
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

/** Хелпер для получения (демо) */
export function getInitialLessons(): Promise<Lesson[]> {
  return Promise.resolve(demoLessons);
}
