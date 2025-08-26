'use client';
import React from 'react';

const TeacherSalaryPage = () => {
  const salaryData = [
    { week: '1 неделя', lessons: 5, total: 12500 },
    { week: '2 неделя', lessons: 4, total: 10000 },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Зарплата преподавателя</h1>
      <table className="mt-4 border-collapse border border-gray-300 w-full">
        <thead>
          <tr>
            <th className="border border-gray-300 px-2 py-1">Неделя</th>
            <th className="border border-gray-300 px-2 py-1">Количество уроков</th>
            <th className="border border-gray-300 px-2 py-1">Сумма, ₽</th>
          </tr>
        </thead>
        <tbody>
          {salaryData.map((s, i) => (
            <tr key={i}>
              <td className="border border-gray-300 px-2 py-1">{s.week}</td>
              <td className="border border-gray-300 px-2 py-1">{s.lessons}</td>
              <td className="border border-gray-300 px-2 py-1">{s.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherSalaryPage;
