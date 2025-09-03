// types/lesson.ts
export type LessonStatus = 'scheduled' | 'cancelled' | 'one-off';

export type Lesson = {
  id: string;
  audience: string;      // e.g. '216'
  time: string;          // '09:00' (slot)
  teacherId: string;
  studentName: string;
  status: LessonStatus;
  note?: string;
  createdBy?: string;    // user id who created the lesson (admin/teacher)
};
