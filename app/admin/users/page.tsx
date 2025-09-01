// app/admin/users/page.tsx
import { getAllUsers } from '@/lib/users';
import UserList from '@/components/admin/UserList';

export default async function AdminUsersPage() {
  const users = await getAllUsers();

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Пользователи</h1>
      <div className="bg-white p-6 rounded shadow">
        {/* передаем только данные в клиентский компонент */}
        {/* Event handlers не передаются из server -> client */}
        <UserList users={users} />
      </div>
    </div>
  );
}
