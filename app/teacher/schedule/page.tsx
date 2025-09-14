// app/teacher/schedule/page.tsx
import ScheduleGrid from '@/components/schedule/ScheduleGrid';
import { getAllLessons, AUDIENCES } from '@/lib/schedule';
import { getAllUsers } from '@/lib/users';
import type { User } from '@/types/user';

export default async function TeacherSchedulePage() {
  // демонстрационные данные — server components могут вызывать асинхронные функции
  const lessons = await getAllLessons();
  const users = await getAllUsers();

  // простая эмуляция текущего пользователя (в реальном приложении берём из сессии)
  const currentUser: User = users.find((u) => u.role === 'teacher') ?? users[0];

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Расписание — преподаватель</h1>
      <div className="bg-white p-6 rounded shadow">
        <ScheduleGrid
          initialLessons={lessons}
          teachers={users.filter((u) => u.role === 'teacher' || u.role === 'admin')}
          audiences={AUDIENCES}
          currentUser={currentUser}
          startHour={9}
          endHour={22}
        />
      </div>
    </div>
  );
}
