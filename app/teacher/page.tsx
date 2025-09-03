// app/teacher/page.tsx
import TeacherHeader from '@/components/teacher/TeacherHeader';

export default function TeacherHome() {
  // пока демонстрационные статические данные (в будущем — реальная авторизация)
  const teacherName = 'Вета Гулливер';
  const avatar = '/avatars/default.png';

  return (
    <div>
      <TeacherHeader name={teacherName} avatar={avatar} />

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-6 bg-white rounded shadow">
          <h3 className="text-lg font-medium mb-2">Расписание</h3>
          <p className="text-sm text-gray-500">Управление вашими занятиями.</p>
          <div className="mt-4">
            <a href="/teacher/schedule" className="px-4 py-2 bg-primary text-white rounded">Перейти</a>
          </div>
        </div>

        <div className="p-6 bg-white rounded shadow">
          <h3 className="text-lg font-medium mb-2">Калькулятор заработка</h3>
          <p className="text-sm text-gray-500">Быстро рассчитать оплату.</p>
          <div className="mt-4">
            <a href="/teacher/salary" className="px-4 py-2 border rounded">Открыть</a>
          </div>
        </div>
      </section>
    </div>
  );
}
