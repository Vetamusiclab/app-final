// types/schedule.ts
export type LessonStatus = 'planned' | 'done' | 'canceled';

export type Lesson = {
  id: string;
  teacherId: string;
  startISO: string;         // начало занятия
  endISO: string;           // конец занятия
  subject: string;          // предмет/направление
  studentName: string;      // имя ученика
  comment?: string;         // комментарий педагога
  status: LessonStatus;     // planned | done | canceled
  replacementTeacherName?: string; // если была замена
};

export type LessonsResponse = {
  ok: true;
  teacherId: string;
  lessons: Lesson[];
};
