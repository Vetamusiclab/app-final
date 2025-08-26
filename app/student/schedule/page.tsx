'use client';

import React from 'react';

const schedule = [
  { day: 'Понедельник', time: '10:00 - 11:00', subject: 'Гитара', teacher: 'Анна' },
  { day: 'Среда', time: '12:00 - 13:00', subject: 'Вокал', teacher: 'Ирина' },
];

export default function SchedulePage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Расписание</h1>
      <table className="mt-4 border-collapse border border-gray-300 w-full">
        <thead>
          <tr>
            <th className="border p-2">День</th>
            <th className="border p-2">Время</th>
            <th className="border p-2">Предмет</th>
            <th className="border p-2">Преподаватель</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map((item, idx) => (
            <tr key={idx}>
              <td className="border p-2">{item.day}</td>
              <td className="border p-2">{item.time}</td>
              <td className="border p-2">{item.subject}</td>
              <td className="border p-2">{item.teacher}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

  );
};

export default SchedulePage;
