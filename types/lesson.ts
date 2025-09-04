// types/lesson.ts
export type LessonStatus = 'scheduled' | 'cancelled' | 'transfer' | 'makeup';

export type Lesson = {
  id: string;
  // аудитория/аудитории — одна аудитория для занятия
  audience: string;
  // час начала, целое (например 9, 10, 14)
  startHour: number;
  // длительность в часах (может быть дробной, но пока используем целые)
  durationHours: number;
  teacherId: string;
  studentName: string;
  status?: LessonStatus;
  createdBy?: string;
};
