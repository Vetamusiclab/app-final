// app/teacher/schedule/page.tsx
import ScheduleGrid from '@/components/schedule/ScheduleGrid';
import { getAllLessons, AUDIENCES } from '@/lib/schedule';
import { getAllUsers } from '@/lib/users';

export default async function TeacherSchedulePage() {
  const lessons = await getAllLessons();
  const users = await getAllUsers();

  // выбираем текущего пользователя-учителя (демо) — при интеграции поставить реального
  const currentUser = users.find((u) => u.role === 'teacher') ?? users[0] ?? null;
  const teachers = users.filter((u) => u.role === 'teacher' || u.role === 'admin');

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Расписание</h1>

      <div className="bg-white p-6 rounded shadow">
        <ScheduleGrid
          initialLessons={lessons}
          teachers={teachers}
          audiences={AUDIENCES}
          currentUser={currentUser}
          startHour={9}
          endHour={22}
        />
      </div>
    </div>
  );
}
