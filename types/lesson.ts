// types/lesson.ts
export type LessonStatus = 'ok' | 'scheduled' | 'cancelled' | 'transfer';

export type Lesson = {
  id: string;
  teacherId: string;
  studentName?: string;
  auditorium: string;      // например "216"
  startHour: number;       // целое: 9..22 (часы начала)
  durationHours: number;   // длительность в часах (1,2,...)
  status?: LessonStatus;
  createdBy?: string;      // id пользователя, который создал запись
};
