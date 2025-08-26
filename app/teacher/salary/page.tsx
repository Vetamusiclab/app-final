'use client';

import React from 'react';

const salaryData = [
  { week: '1 неделя', amount: 5000 },
  { week: '2 неделя', amount: 5200 },
];

export default function SalaryPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Зарплата</h1>
      <ul className="mt-4">
        {salaryData.map((item, idx) => (
          <li key={idx}>
            {item.week}: {item.amount}₽
          </li>
        ))}
      </ul>
    </div>
  );
}
