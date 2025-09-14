// lib/users.ts
import type { User as UserType } from '@/types/user';

// реэкспорт типа, чтобы компоненты могли импортировать и из lib/users
export type { User as UserType } from '@/types/user';

// Демонстрационные пользователи
export const demoUsers: UserType[] = [
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
    // можно добавить цвет для заливки расписания:
    // color: '#7c3aed',
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

// Асинхронные хелперы (имитируют работу с сервером)
export function getAllUsers(): Promise<UserType[]> {
  return Promise.resolve(demoUsers);
}

export function getUserById(id: string): Promise<UserType | undefined> {
  return Promise.resolve(demoUsers.find((u) => u.id === id));
}

// Утилиты работы с демо-данными (локальное редактирование)
export async function addUser(user: UserType): Promise<UserType> {
  demoUsers.push(user);
  return user;
}

export async function deleteUser(id: string): Promise<boolean> {
  const idx = demoUsers.findIndex((u) => u.id === id);
  if (idx === -1) return false;
  demoUsers.splice(idx, 1);
  return true;
}

export default demoUsers;
