'use client';

import { User } from '@/lib/users';

export default function UserList({ users }: { users: User[] }) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-bold mb-4">Список пользователей</h3>
      <ul className="divide-y divide-gray-200">
        {users.map((user) => (
          <li key={user.id} className="py-2 flex justify-between">
            <span>{user.name}</span>
            <span className="text-sm text-gray-500">{user.role}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
