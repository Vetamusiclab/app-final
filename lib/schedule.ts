// lib/schedule.ts
import type { Lesson } from '@/types/lesson';

export const AUDIENCES = ['216', '222', '223', '244', '260', '11A'];

// helper — generate stable id without uuid dependency
function makeId(prefix = 'l') {
  return prefix + '_' + Math.random().toString(36).slice(2, 9);
}

// Demo lessons (time in HH:MM, hourly slots 08:00–20:00)
export const initialLessons: Lesson[] = [
  {
    id: makeId(),
    audience: '216',
    time: '10:00',
    teacherId: 't1',
    studentName: 'Иван Петров',
    status: 'scheduled',
    createdBy: 't1'
  },
  {
    id: makeId(),
    audience: '222',
    time: '11:00',
    teacherId: 't2',
    studentName: 'Анна Смирнова',
    status: 'one-off',
    createdBy: 'a1'
  },
  {
    id: makeId(),
    audience: '223',
    time: '14:00',
    teacherId: 't3',
    studentName: 'Пётр Орлов',
    status: 'cancelled',
    createdBy: 't3'
  }
];

export function getInitialLessons(): Promise<Lesson[]> {
  return Promise.resolve(initialLessons);
}
