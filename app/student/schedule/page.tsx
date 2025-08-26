'use client';
import React, { useState } from 'react';
import Select from '@/components/ui/Select';

const SchedulePage = () => {
  const directions = ['Гитара', 'Вокал', 'Фортепиано', 'Барабаны'];
  const [selected, setSelected] = useState(directions[0]);

  const schedule = [
    { day: 'Понедельник', time: '17:00-18:00', subject: 'Гитара', teacher: 'Иванова' },
    { day: 'Среда', time: '16:00-17:00', subject: 'Вокал', teacher: 'Петрова' },
  ];

  const filtered = schedule.filter((s) => s.subject === selected);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Расписание</h1>
      {directions.length > 1 && (
        <Select options={directions} value={selected} onChange={setSelected} />
      )}
      <table className="mt-4 border-collapse border border-gray-300 w-full">
        <thead>
          <tr>
            <th className="border border-gray-300 px-2 py-1">День</th>
            <th className="border border-gray-300 px-2 py-1">Время</th>
            <th className="border border-gray-300 px-2 py-1">Предмет</th>
            <th className="border border-gray-300 px-2 py-1">Преподаватель</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((s, i) => (
            <tr key={i}>
              <td className="border border-gray-300 px-2 py-1">{s.day}</td>
              <td className="border border-gray-300 px-2 py-1">{s.time}</td>
              <td className="border border-gray-300 px-2 py-1">{s.subject}</td>
              <td className="border border-gray-300 px-2 py-1">{s.teacher}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SchedulePage;
