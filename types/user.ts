// types/user.ts
export type Role = 'student' | 'teacher' | 'admin';

export interface User {
  id: string;
  role: Role;
  name: string;
  avatar?: string;       // путь в /public, напр. '/avatars/default.png'
  directions?: string[]; // направления (вокал, ф-но и т.п.)
  phone?: string;
  createdAt?: string;
}
