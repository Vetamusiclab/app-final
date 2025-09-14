// types/lesson.ts
export type LessonStatus =
  | 'scheduled'
  | 'confirmed'
  | 'ok'
  | 'cancelled'
  | 'transfer';

export interface Lesson {
  id: string;
  // Каноническое поле — используйте audience везде в коде.
  audience?: string;
  // legacy alias — чтобы старые объекты с 'auditorium' тоже проходили проверку типов.
  auditorium?: string;
  startHour: number; // например 9, 10, ...
  durationHours: number; // например 1, 1.5 и т.д.
  teacherId: string;
  studentName?: string;
  status?: LessonStatus;
  createdBy?: string;
  createdAt?: string;
}
