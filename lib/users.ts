// lib/users.ts
import type { User } from '@/types/user';

export const demoUsers: User[] = [
  {
    id: 'stu1',
    role: 'student',
    name: 'Иван Петров',
    avatar: '/avatars/default.png',
    directions: ['Гитара', 'Вокал'],
    phone: '+7 999 111 22 33',
    createdAt: '2024-08-01',
  },
  {
    id: 'stu2',
    role: 'student',
    name: 'Анна Смирнова',
    avatar: '/avatars/default.png',
    directions: ['Фортепиано'],
    phone: '+7 999 222 33 44',
    createdAt: '2024-09-02',
  },
  {
    id: 't1',
    role: 'teacher',
    name: 'Вета Гулливер',
    avatar: '/avatars/default.png',
    directions: ['Вокал'],
    phone: '+7 900 555 66 77',
    createdAt: '2020-02-14',
  },
  {
    id: 'a1',
    role: 'admin',
    name: 'Администратор',
    avatar: '/avatars/default.png',
    phone: '+7 900 000 00 00',
    createdAt: '2019-01-01',
  },
];

export function getAllUsers(): Promise<User[]> {
  return Promise.resolve(demoUsers);
}

export function getUserById(id: string): Promise<User | undefined> {
  return Promise.resolve(demoUsers.find((u) => u.id === id));
}

// реэкспорт типа User — чтобы импорты типа { User } из '@/lib/users' работали
export type { User };
