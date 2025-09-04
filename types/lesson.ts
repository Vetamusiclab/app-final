// types/lesson.ts
export type LessonStatus = 'ok' | 'scheduled' | 'cancelled' | 'transfer';

export type Lesson = {
  id: string;
  teacherId: string;
  studentName?: string;
  auditorium: string;      // пример: "216", "11A"
  startHour: number;       // час начала, целое (9..22)
  durationHours: number;   // длительность в часах (1, 2 ...)
  status?: LessonStatus;
  createdBy?: string;      // id того, кто создал запись
  note?: string;
};
