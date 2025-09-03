// types/user.ts
export type Role = 'student' | 'teacher' | 'admin';

export type User = {
  id: string;
  role: Role;
  name: string;
  avatar?: string;
  directions?: string[];
  phone?: string;
  createdAt?: string;
};
