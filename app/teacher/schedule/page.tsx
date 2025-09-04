// app/teacher/schedule/page.tsx
import ScheduleGrid from '@/components/schedule/ScheduleGrid';
import { getAllUsers } from '@/lib/users';
import { getAllLessons } from '@/lib/lessons';
import type { Lesson } from '@/types/lesson';
import type { User } from '@/types/user';

const AUDIENCES = ['216', '222', '223', '244', '260', '11А'];

export default async function TeacherSchedulePage() {
  const users: User[] = await getAllUsers();
  const lessons: Lesson[] = await getAllLessons();

  // пока текущий пользователь — первый педагог, если есть
  const currentUser = users.find((u) => u.role === 'teacher') ?? users[0];

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Расписание</h1>

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
