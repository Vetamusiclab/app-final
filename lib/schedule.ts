// lib/schedule.ts
import type { Lesson } from '@/types/lesson';

/** Небольшая утилита для генерации id */
function makeId(len = 8) {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let s = '';
  for (let i = 0; i < len; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return s;
}

/** Список аудиторий (по умолчанию) */
export const AUDIENCES = ['216', '222', '223', '244', '260', '11A'] as const;

/** Демонстрационные уроки — формат соответствует types/lesson.ts */
export const demoLessons: Lesson[] = [
  {
    id: makeId(),
    auditorium: '216',
    startHour: 10,
    durationHours: 1,
    teacherId: 't1',
    studentName: 'Иван Петров',
    status: 'ok',
    createdBy: 't1',
  },
  {
    id: makeId(),
    auditorium: '222',
    startHour: 12,
    durationHours: 2,
    teacherId: 't1',
    studentName: 'Анна Смирнова',
    status: 'ok',
    createdBy: 't1',
  },
  {
    id: makeId(),
    auditorium: '223',
    startHour: 16,
    durationHours: 1,
    teacherId: 't2',
    studentName: 'Мария Иванова',
    status: 'ok',
    createdBy: 't2',
  },
  // add more demo entries if нужно
];

export function getAllLessons(): Promise<Lesson[]> {
  return Promise.resolve(demoLessons);
}

export function getLessonsByAuditorium(auditorium: string): Promise<Lesson[]> {
  return Promise.resolve(demoLessons.filter(l => l.auditorium === auditorium));
}

export function getLessonById(id: string): Promise<Lesson | undefined> {
  return Promise.resolve(demoLessons.find(l => l.id === id));
}
