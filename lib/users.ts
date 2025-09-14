// lib/users.ts
import type { User } from '@/types/user';

// Реэкспорт типа User, чтобы другие файлы могли импортировать его из "@/lib/users"
export type { User } from '@/types/user';

// Демонстрационные / начальные пользователи (можно заменить на реальные)
export const demoUsers: User[] = [
  {
    id: 't1',
    role: 'teacher',
    name: 'Елизавета П.',
    avatar: '/avatars/elizabeth.png',
    directions: ['Вокал'],
    phone: '+7 (900) 111-11-11',
    createdAt: '2024-01-01',
    color: '#7c3aed', // пример цвета педагога
  },
  {
    id: 't2',
    role: 'teacher',
    name: 'Алексей К.',
    avatar: '/avatars/alex.png',
    directions: ['Гитара'],
    phone: '+7 (900) 222-22-22',
    createdAt: '2024-02-01',
    color: '#f97316',
  },
  {
    id: 'a1',
    role: 'admin',
    name: 'Админ',
    avatar: '/avatars/admin.png',
    phone: '+7 (900) 000-00-00',
    createdAt: '2023-01-01',
  },
  {
    id: 's1',
    role: 'student',
    name: 'Иван Петров',
    avatar: '/avatars/student1.png',
    directions: ['Фортепиано'],
    phone: '+7 (900) 333-33-33',
    createdAt: '2024-03-01',
  },
];

// Асинхронные хелперы (имитация работы с БД/сервисом)
export function getAllUsers(): Promise<User[]> {
  return Promise.resolve(demoUsers.map(u => ({ ...u })));
}

export function getUserById(id: string): Promise<User | undefined> {
  return Promise.resolve(demoUsers.find(u => u.id === id));
}

export async function addUser(user: User): Promise<User> {
  demoUsers.push(user);
  return Promise.resolve(user);
}

export async function updateUser(id: string, patch: Partial<User>): Promise<User | null> {
  const idx = demoUsers.findIndex(u => u.id === id);
  if (idx === -1) return null;
  demoUsers[idx] = { ...demoUsers[idx], ...patch };
  return Promise.resolve(demoUsers[idx]);
}

export async function deleteUser(id: string): Promise<boolean> {
  const idx = demoUsers.findIndex(u => u.id === id);
  if (idx === -1) return false;
  demoUsers.splice(idx, 1);
  return Promise.resolve(true);
}

// default export для удобства
export default {
  demoUsers,
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
};
