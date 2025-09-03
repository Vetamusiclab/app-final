// app/teacher/schedule/page.tsx
import { getAllUsers } from '@/lib/users';
import TeacherSchedule from '@/components/teacher/TeacherSchedule';

export const metadata = { title: 'Расписание — Teacher — MusicLab' };

export default async function TeacherSchedulePage() {
  const users = await getAllUsers();
  const teacher = users.find((u: any) => u.role === 'teacher') ?? users[0];
  const teacherId = (teacher as any)?.id ?? 'demo-teacher';
  const teacherName = (teacher as any)?.name ?? 'Преподаватель';

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Моё расписание</h1>
      <div className="bg-white p-6 rounded shadow">
        <TeacherSchedule teacherId={teacherId} teacherName={teacherName} />
      </div>
    </div>
  );
}
