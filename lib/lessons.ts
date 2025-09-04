// lib/lessons.ts
import type { Lesson } from '@/types/lesson';

// Демонстрационные уроки — можно позже заменить хранением в БД.
export const demoLessons: Lesson[] = [
  {
    id: 'lesson-1',
    teacherId: 't1',
    studentName: 'Иван Петров',
    auditorium: '216',
    startHour: 10,
    durationHours: 1,
    status: 'ok',
    createdBy: 'a1',
  },
  {
    id: 'lesson-2',
    teacherId: 't1',
    studentName: 'Анна Смирнова',
    auditorium: '222',
    startHour: 12,
    durationHours: 2,
    status: 'transfer',
    createdBy: 't1',
  },
];

export function getAllLessons(): Promise<Lesson[]> {
  return Promise.resolve(demoLessons);
}

export function getLessonById(id: string): Promise<Lesson | undefined> {
  return Promise.resolve(demoLessons.find((l) => l.id === id));
}
