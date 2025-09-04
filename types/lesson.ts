// types/lesson.ts
export type LessonStatus = 'scheduled' | 'ok' | 'canceled' | 'transfer' | 'confirmed';

export type Lesson = {
  id: string;
  auditorium: string;       // '216', '222', '11A' и т.д.
  startHour: number;        // целое число, час начала (9,10,...)
  durationHours: number;    // длительность в часах (целое >= 1)
  teacherId: string;        // id преподавателя (из users)
  studentName?: string;
  status?: LessonStatus;
  createdBy?: string;       // id того, кто создал урок
  createdAt?: string;       // ISO дата
};
