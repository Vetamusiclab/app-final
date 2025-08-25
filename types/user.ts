// types/user.ts

// Уровни наставников
export type TutorLevel = 'Basic' | 'Progressive' | 'Prive';

// Тип пользователя
export type User = {
  id: string;
  name: string;
  role: 'student' | 'teacher' | 'admin';
  avatar?: string;
  tutorLevel?: TutorLevel;
  email?: string; // добавлено поле email
  directions?: string[]; // для учеников с направлениями
};
