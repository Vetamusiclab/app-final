export type Role = 'student' | 'teacher' | 'admin';

export interface Session {
  role: Role;
  userId: string;
  token: string;
}
