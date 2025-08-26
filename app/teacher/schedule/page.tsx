'use client';

import React from 'react';

const teacherSchedule = [
  { day: 'Понедельник', time: '10:00 - 11:00', student: 'Иван', subject: 'Гитара' },
  { day: 'Среда', time: '12:00 - 13:00', student: 'Мария', subject: 'Вокал' },
];

export default function TeacherSchedulePage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Расписание преподавателя</h1>
      <table className="mt-4 border-collapse border border-gray-300 w-full">
        <thead>
          <tr>
            <th className="border p-2">День</th>
            <th className="border p-2">Время</th>
            <th className="border p-2">Ученик</th>
            <th className="border p-2">Предмет</th>
          </tr>
        </thead>
        <tbody>
          {teacherSchedule.map((item, idx) => (
            <tr key={idx}>
              <td className="border p-2">{item.day}</td>
              <td className="border p-2">{item.time}</td>
              <td className="border p-2">{item.student}</td>
              <td className="border p-2">{item.subject}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
