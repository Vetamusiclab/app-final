'use client';

import { useState } from 'react';

type User = {
  id: number;
  name: string;
  role: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'Админ', role: 'admin' },
    { id: 2, name: 'Иван Петров', role: 'teacher' },
    { id: 3, name: 'Мария Сидорова', role: 'student' },
  ]);

  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('student');

  const addUser = () => {
    if (!newName.trim()) return;
    const newUser: User = {
      id: Date.now(),
      name: newName,
      role: newRole,
    };
    setUsers([...users, newUser]);
    setNewName('');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Пользователи</h1>

      {/* Таблица */}
      <table className="w-full border-collapse mb-6">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2 text-left">ID</th>
            <th className="border p-2 text-left">Имя</th>
            <th className="border p-2 text-left">Роль</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="hover:bg-gray-100">
              <td className="border p-2">{u.id}</td>
              <td className="border p-2">{u.name}</td>
              <td className="border p-2">{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Форма добавления */}
      <div className="flex gap-4 items-center">
        <input
          type="text"
          placeholder="Имя пользователя"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="border p-2 rounded-lg"
        />
        <select
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
          className="border p-2 rounded-lg"
        >
          <option value="student">Ученик</option>
          <option value="teacher">Преподаватель</option>
          <option value="admin">Админ</option>
        </select>
        <button
          onClick={addUser}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-accent transition"
        >
          Добавить
        </button>
      </div>
    </div>
  );
}
