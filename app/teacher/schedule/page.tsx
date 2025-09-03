// app/teacher/schedule/page.tsx
import { getSessionsByTeacher } from '@/lib/sessions';
import Schedule from '@/components/teacher/Schedule';

export default async function TeacherSchedulePage() {
  // В демо: фиксированный teacherId 't1'. В реальном проекте возьми из сессии / auth.
  const sessions = await getSessionsByTeacher('t1');

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Моё расписание</h1>
      <div className="bg-white p-6 rounded shadow">
        <Schedule sessions={sessions} />
      </div>
    </div>
  );
}
