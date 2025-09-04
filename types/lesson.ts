// types/lesson.ts
export type LessonStatus = 'scheduled' | 'ok' | 'canceled' | 'transfer';

export type Lesson = {
  id: string;
  auditorium: string;       // '216', '222' и т.д.
  startHour: number;        // час начала, целое (9,10,...)
  durationHours: number;    // длительность в часах, целое >=1
  teacherId: string;        // id преподавателя (из users)
  studentName?: string;
  status?: LessonStatus;
  createdBy?: string;       // id того, кто создал (teacher/admin)
  createdAt?: string;       // ISO string
};
