// types/user.ts
export type Role = 'student' | 'teacher' | 'admin';

export type User = {
  id: string;
  role: Role;
  name: string;
  avatar?: string; // relative path in /public (e.g. '/avatars/default.png')
  directions?: string[]; // направления (фортепиано, вокал...)
  phone?: string;
  createdAt?: string;
  // прочие поля при расширении
};
