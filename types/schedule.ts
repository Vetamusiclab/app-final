export interface Lesson {
  id: string;
  studentId: string;
  teacherId: string;
  room?: string;
  direction: string; // предмет
  start: string; // ISO
  end: string;   // ISO
  comment?: string;
  replacedByTeacherId?: string; // временная замена
}
