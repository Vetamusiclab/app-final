// types/user.ts

export type TutorLevel = 'Basic' | 'Progressive' | 'Prive';
export type UserRole = 'student' | 'teacher' | 'admin';

export interface User {
  id: string;
  role: UserRole;
  name: string;
  email?: string;
  avatarUrl?: string;
  tutorLevel?: TutorLevel;
  directions?: string[]; // для учеников: вокал, гитара и т.д.
}
