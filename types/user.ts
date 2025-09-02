// types/user.ts
export type Role = 'student' | 'teacher' | 'admin';

export type User = {
  id: string;
  role: Role;
  name: string;
  avatar?: string; // относительный путь в /public, например '/avatars/default.png'
  directions?: string[]; // направления (фортепиано, вокал...)
  phone?: string;
  createdAt?: string;
};
