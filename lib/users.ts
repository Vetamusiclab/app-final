export type User = {
  id: number;
  name: string;
  role: 'Ученик' | 'Преподаватель' | 'Админ';
};

export const users: User[] = [
  { id: 1, name: 'Иван Иванов', role: 'Ученик' },
  { id: 2, name: 'Мария Петрова', role: 'Преподаватель' },
  { id: 3, name: 'Админ Тест', role: 'Админ' },
];
