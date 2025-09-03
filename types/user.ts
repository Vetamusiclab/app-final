// types/user.ts
export type Role = 'student' | 'teacher' | 'admin';

export type User = {
  id: string;
  role: Role;
  name: string;
  avatar?: string; // e.g. '/avatars/default.png'
  directions?: string[]; // optional directions
  phone?: string;
  createdAt?: string;
  color?: string; // HEX color assigned to teacher (e.g. '#6BCB77')
};
