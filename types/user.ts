// types/user.ts

export type TutorLevel = 'Basic' | 'Progressive' | 'Prive';

export type User = {
  id: string;
  name: string;
  role: 'student' | 'teacher' | 'admin';
  avatar?: string;
  tutorLevel?: TutorLevel;
};
