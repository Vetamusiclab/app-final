// lib/users.ts
import type { User } from '@/types/user';

/**
 * Демо-данные пользователей. Хранятся в памяти.
 * Для аватарок положи файл по пути /public/avatars/default.png
 */
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

/** Возвращает всех пользователей (асинхронно, под будущий бэкенд) */
export async function getAllUsers(): Promise<User[]> {
  return demoUsers;
}

/** Находит пользователя по id */
export async function getUserById(id: string): Promise<User | undefined> {
  return demoUsers.find((u) => u.id === id);
}

/**
 * Дополнительно даю default-экспорт — на случай,
 * если где-то случайно импортировали по умолчанию.
 */
const UsersLib = { demoUsers, getAllUsers, getUserById };
export default UsersLib;
