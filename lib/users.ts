// lib/users.ts
import type { User } from '@/types/user';

export const demoUsers: User[] = [
  {
    id: 't1',
    role: 'teacher',
    name: 'Вета Гулливер',
    avatar: '/avatars/default.png',
    directions: ['Вокал'],
    phone: '+7 900 555 66 77',
    createdAt: '2020-02-14',
    color: '#FF6F00' // основной бренд — оранжевый
  },
  {
    id: 't2',
    role: 'teacher',
    name: 'Алексей Смирнов',
    avatar: '/avatars/default.png',
    directions: ['Гитара'],
    phone: '+7 900 111 22 33',
    createdAt: '2021-05-10',
    color: '#6BCB77' // акцентный зелёный
  },
  {
    id: 't3',
    role: 'teacher',
    name: 'Мария Иванова',
    avatar: '/avatars/default.png',
    directions: ['Фортепиано'],
    phone: '+7 900 222 33 44',
    createdAt: '2022-01-12',
    color: '#6FA8FF' // синий
  },
  {
    id: 'a1',
    role: 'admin',
    name: 'Администратор',
    avatar: '/avatars/default.png',
    phone: '+7 900 000 00 00',
    createdAt: '2019-01-01',
    color: '#000000'
  },
  {
    id: 's1',
    role: 'student',
    name: 'Иван Петров',
    avatar: '/avatars/default.png',
    directions: ['Гитара'],
    phone: '+7 999 111 22 33',
    createdAt: '2024-08-01'
  }
];

export function getAllUsers(): Promise<User[]> {
  return Promise.resolve(demoUsers);
}

export function getUserById(id: string) {
  return Promise.resolve(demoUsers.find((u) => u.id === id));
}
