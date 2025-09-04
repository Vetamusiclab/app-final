// lib/schedule.ts
import type { Lesson } from '@/types/lesson';

function makeId() {
  return 'l_' + Math.random().toString(36).slice(2, 9);
}

// Список аудиторий (можно расширять в будущем из админки)
export const AUDIENCES = ['216', '222', '223', '244', '260', '11A'] as const;
export const AUDIENCES_LIST: string[] = Array.from(AUDIENCES) as string[];

// Простейшие демо-уроки — соответствуют типу Lesson (обрати внимание: поле auditorium)
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
    auditorium: '216',
    startHour: 12,
    durationHours: 1,
    teacherId: 't1',
    studentName: 'Мария Иванова',
    status: 'ok',
    createdBy: 't1',
    createdAt: new Date().toISOString(),
  },
];

export function getAllLessons(): Promise<Lesson[]> {
  return Promise.resolve(demoLessons);
}
