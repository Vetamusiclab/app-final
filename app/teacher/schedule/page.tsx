'use client';
import React from 'react';

const TeacherSchedulePage = () => {
  const schedule = [
    { day: 'Понедельник', time: '17:00-18:00', subject: 'Гитара', student: 'Анна' },
    { day: 'Среда', time: '16:00-17:00', subject: 'Вокал', student: 'Маша' },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Расписание преподавателя</h1>
      <table className="mt-4 border-collapse border border-gray-300 w-full">
        <thead>
          <tr>
            <th className="border border-gray-300 px-2 py-1">День</th>
            <th className="border border-gray-300 px-2 py-1">Время</th>
            <th className="border border-gray-300 px-2 py-1">Предмет</th>
            <th className="border border-gray-300 px-2 py-1">Ученик</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map((s, i) => (
            <tr key={i}>
              <td className="border border-gray-300 px-2 py-1">{s.day}</td>
              <td className="border border-gray-300 px-2 py-1">{s.time}</td>
              <td className="border border-gray-300 px-2 py-1">{s.subject}</td>
              <td className="border border-gray-300 px-2 py-1">{s.student}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherSchedulePage;
