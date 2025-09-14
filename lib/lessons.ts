// lib/lessons.ts
import type { Lesson } from '@/types/lesson';

function makeId(prefix = 'l') {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * Демонстрационные уроки.
 * Используем поле `audience` (и при необходимости можно поставить auditorium: same)
 */
export const lessons: Lesson[] = [
  {
    id: makeId(),
    audience: '216',
    // auditorium: '216', // не обязательно; поле поддерживается типом
    startHour: 10,
    durationHours: 1,
    teacherId: 't1',
    studentName: 'Иван Петров',
    status: 'ok',
    createdBy: 't1',
    createdAt: new Date().toISOString(),
  },
  {
    id: makeId(),
    audience: '222',
    startHour: 11,
    durationHours: 1,
    teacherId: 't2',
    studentName: 'Анна Смирнова',
    status: 'confirmed',
    createdBy: 'a1',
    createdAt: new Date().toISOString(),
  },
];

export function getAllLessons(): Lesson[] {
  return lessons;
}

export function addLesson(lesson: Lesson): Lesson {
  lessons.push(lesson);
  return lesson;
}

export function deleteLesson(id: string): boolean {
  const idx = lessons.findIndex((l) => l.id === id);
  if (idx === -1) return false;
  lessons.splice(idx, 1);
  return true;
}
