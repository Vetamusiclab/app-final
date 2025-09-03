// app/teacher/schedule/page.tsx
import { getAllUsers } from '@/lib/users';
import TeacherSchedule from '@/components/teacher/TeacherSchedule';
import type { User } from '@/types/user';

export const metadata = {
  title: 'Расписание — Teacher — MusicLab',
};

export default async function TeacherSchedulePage() {
  const users = await getAllUsers();
  const teacher: User | undefined = users.find((u) => u.role === 'teacher') ?? users[0];

  const teacherId = (teacher as any)?.id ?? 'demo-teacher';
  const teacherName = teacher?.name ?? 'Преподаватель';

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Моё расписание</h1>
      <div className="bg-white p-6 rounded shadow">
        <TeacherSchedule teacherId={teacherId} teacherName={teacherName} />
      </div>
    </div>
  );
}
