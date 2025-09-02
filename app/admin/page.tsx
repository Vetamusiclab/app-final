// app/admin/page.tsx
import { getAllUsers } from '@/lib/users';

export default async function AdminHome() {
  const users = await getAllUsers();

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Панель администратора</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card">
          <div className="text-sm text-gray-500">Всего пользователей</div>
          <div className="text-2xl font-bold">{users.length}</div>
        </div>

        <div className="card">
          <div className="text-sm text-gray-500">Ученики</div>
          <div className="text-2xl font-bold">{users.filter(u => u.role === 'student').length}</div>
        </div>

        <div className="card">
          <div className="text-sm text-gray-500">Преподаватели</div>
          <div className="text-2xl font-bold">{users.filter(u => u.role === 'teacher').length}</div>
        </div>
      </div>

      <section className="mt-6">
        <h2 className="text-lg font-medium mb-2">Быстрые действия</h2>
        <div className="flex gap-2">
          <button className="btn-primary">Добавить преподавателя</button>
          <button className="btn-ghost">Импорт Excel</button>
        </div>
      </section>
    </div>
  );
}
