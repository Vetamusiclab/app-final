// app/teacher/schedule/page.tsx
import { getSessionsByTeacher } from '@/lib/sessions';
import ScheduleList from '@/components/teacher/ScheduleList';

// если у вас есть механизм аутентификации — получите реального teacherId из сессии.
// Пока хардкодим demo teacher id = 't1'
const DEMO_TEACHER_ID = 't1';

export default async function TeacherSchedulePage() {
  const teacherId = DEMO_TEACHER_ID;
  const sessions = await getSessionsByTeacher(teacherId);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Расписание преподавателя</h1>
      <div className="bg-white p-6 rounded shadow">
        {/* Передаём данные (не передаём обработчики) */}
        <ScheduleList initialSessions={sessions} teacherId={teacherId} />
      </div>
    </div>
  );
}
