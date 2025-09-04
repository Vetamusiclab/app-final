// app/teacher/schedule/page.tsx
import React from 'react';
import ScheduleGrid from '@/components/schedule/ScheduleGrid';
import { getAllUsers } from '@/lib/users';
import { getAllLessons } from '@/lib/schedule'; // если у тебя есть lib/schedule.ts
import type { User } from '@/types/user';

export const AUDIENCES: string[] = ['216', '222', '223', '244', '260', '11A'];

export default async function TeacherSchedulePage() {
  // серверный компонент: получаем демо-данные
  const users: User[] = (await getAllUsers()) ?? [];
  const lessons = (await getAllLessons?.()) ?? []; // подстраховка, если функция есть

  // текущий пользователь — временно берем первого преподавателя (замена на реальный auth)
  const currentUser = users.find(u => u.role === 'teacher') ?? (users[0] ?? { id: 'anon', role: 'student', name: 'Гость' } as User);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Расписание</h1>

      <div className="bg-white p-6 rounded shadow">
        <ScheduleGrid
          initialLessons={lessons}
          teachers={users}
          audiences={AUDIENCES} // теперь AUDIENCES имеет тип string[] — OK
          currentUser={currentUser}
          startHour={9}
          endHour={22}
        />
      </div>
    </div>
  );
}
