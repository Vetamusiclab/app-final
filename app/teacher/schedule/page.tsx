// app/teacher/schedule/page.tsx
import { getAllUsers } from '@/lib/users';
import { getInitialLessons, AUDIENCES } from '@/lib/schedule';
import ScheduleGrid from '@/components/schedule/ScheduleGrid';
import type { User } from '@/types/user';

export default async function TeacherSchedulePage() {
  // Возьмём демо-пользователей и демо-уроки
  const users = (await getAllUsers()) as User[];
  const lessons = await getInitialLessons();

  // Для демо: currentUser — первая teacher в списке (в реальном приложении ставится через auth)
  const currentUser = users.find((u) => u.role === 'teacher') ?? users[0];

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Расписание — преподаватель</h1>
      <div className="bg-white p-6 rounded shadow">
        <ScheduleGrid
          initialLessons={lessons}
          teachers={users.filter((u) => u.role === 'teacher' || u.role === 'admin')}
          audiences={AUDIENCES}
          currentUser={currentUser}
        />
      </div>
    </div>
  );
}
