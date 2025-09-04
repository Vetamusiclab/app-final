// types/lesson.ts
export type LessonStatus =
  | 'scheduled'
  | 'confirmed'
  | 'ok'
  | 'makeup'
  | 'transfer'
  | 'cancelled'
  | 'draft';

export type Lesson = {
  id: string;
  // Название поля для аудитории — единообразно используем "auditorium"
  auditorium: string;
  // Час (целое) начала занятия, например 9, 10, ... 21
  startHour: number;
  // Длительность в часах (целое)
  durationHours: number;
  teacherId: string;
  studentName?: string;
  status?: LessonStatus;
  createdBy?: string;
  createdAt?: string;
};
