import type { Role } from './auth';

export interface User {
  id: string;
  role: Role;
  name: string;
  email: string;
  avatarUrl?: string;
  directions?: string[]; // вокал, гитара и т.д.
}
