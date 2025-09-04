// types/lesson.ts
// Общие типы для расписания / урока

export type LessonStatus =
  | 'scheduled'   // запланировано
  | 'confirmed'   // подтверждено
  | 'cancelled'   // отменено
  | 'transfer'    // перенос
  | 'makeup'      // отработка / разовое занятие
  | 'draft'       // черновик / предварительно
  | 'ok';         // совместимость с прежними значениями

export type Lesson = {
  id: string;
  // аудитория/класс/комната — строка ('216', '222' и т.д.)
  auditorium: string;

  // Час начала (целое), например 9, 10, ... (мы используем часовой шаг)
  startHour: number;

  // Длительность в целых часах (можно расширить)
  durationHours: number;

  // id преподавателя (teacher)
  teacherId: string;

  // имя ученика (показательное поле)
  studentName: string;

  // статус урока (опционален)
  status?: LessonStatus;

  // кто создал запись (id пользователя)
  createdBy?: string;

  // дополнительные метки (эмодзи и т. п.)
  noteEmoji?: string;
  // дата создания/и т.д.
  createdAt?: string;
};
