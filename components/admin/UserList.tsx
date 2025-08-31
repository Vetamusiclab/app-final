// components/admin/UserList.tsx
'use client';

import { useState } from 'react';
import type { User } from '@/types/user';
import UserAvatar from '@/components/shared/UserAvatar';

type Props = {
  users: User[];
};

export default function UserList({ users }: Props) {
  const [list, setList] = useState<User[]>(users);
  const [query, setQuery] = useState('');

  function onDelete(id: string) {
    if (!confirm('Удалить пользователя?')) return;
    setList((s) => s.filter((u) => u.id !== id));
  }

  const filtered = list.filter((u) =>
    (u.name + (u.directions?.join(' ') ?? '')).toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Поиск по имени или направлению"
          className="flex-1 px-3 py-2 border rounded"
        />
        <button className="ml-2 px-4 py-2 bg-primary text-white rounded">Добавить</button>
      </div>

      <div className="space-y-3">
        {filtered.length === 0 && <div className="text-gray-500">Пользователи не найдены</div>}
        {filtered.map((u) => (
          <div key={u.id} className="flex items-center justify-between p-3 border rounded">
            <div className="flex items-center gap-3">
              <UserAvatar src={u.avatar} name={u.name} />
              <div>
                <div className="font-medium">{u.name}</div>
                <div className="text-xs text-gray-500">{u.role} • {u.directions?.join(', ')}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 text-sm border rounded">Ред.</button>
              <button onClick={() => onDelete(u.id)} className="px-3 py-1 text-sm text-red-600 border rounded">Удалить</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
