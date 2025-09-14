// lib/schedule.ts
import type { Lesson } from '@/types/lesson';

// аудитории вынесены сюда, чтобы page.tsx не экспортировал произвольные переменные
export const AUDIENCES: string[] = ['216', '222', '223', '244', '260', '11A'];

// простая util для id
function makeId(prefix = 'l') {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}

// демо-данные уроков — убедитесь, что статус соответствует LessonStatus в types
export const demoLessons: Lesson[] = [
  {
    id: makeId(),
    audience: '216',
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
    audience: '222',
    startHour: 12,
    durationHours: 2,
    teacherId: 't2',
    studentName: 'Анна Смирнова',
    status: 'confirmed',
    createdBy: 'a1',
    createdAt: new Date().toISOString(),
  },
  {
    id: makeId(),
    audience: '260',
    startHour: 18,
    durationHours: 1,
    teacherId: 't1',
    studentName: 'Разовое занятие',
    status: 'ok',
    createdBy: 't1',
    createdAt: new Date().toISOString(),
  },
];

// экспортируем функцию получения уроков (в будущем можно заменить fetch)
export function getAllLessons(): Promise<Lesson[]> {
  return Promise.resolve(demoLessons);
}

// получение уроков по аудитории (удобно в будущем)
export function getLessonsByAudience(aud: string): Promise<Lesson[]> {
  return Promise.resolve(demoLessons.filter((l) => l.audience === aud));
}
