// types/lesson.ts
export type LessonStatus =
  | 'scheduled'
  | 'ok'
  | 'cancelled'
  | 'confirmed'
  | 'transfered'
  | 'pending'
  | 'done';

export type Lesson = {
  id: string;
  // используем поле audience — единообразно по всему коду
  audience: string;
  startHour: number; // целое значение часа (например 9)
  durationHours?: number; // продолжительность в часах (1,2...)
  teacherId: string;
  studentName: string;
  status?: LessonStatus;
  createdBy?: string;
  createdAt?: string;
};
