'use client';

import { useState } from 'react';
import { calculateLessonPrice } from '@/utils/calculateSalary';

type Level = 'Basic' | 'Progressive' | 'Prive';

export default function SalaryCalculator() {
  const [level, setLevel] = useState<Level>('Basic');
  const [intensive, setIntensive] = useState(false);
  const [minutes, setMinutes] = useState<45 | 60>(45);

  const price = calculateLessonPrice(level, intensive, { minutes });

  return (
    <div className="card p-4 shadow rounded">
      <h2 className="text-xl font-bold mb-4">Калькулятор зарплаты</h2>

      <div className="mb-3 flex items-center gap-2">
        <label className="w-32">Уровень:</label>
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value as Level)}
          className="border rounded px-2 py-1"
        >
          <option value="Basic">Basic</option>
          <option value="Progressive">Progressive</option>
          <option value="Prive">Prive</option>
        </select>
      </div>

      <div className="mb-3 flex items-center gap-2">
        <label className="w-32">Интенсив:</label>
        <input
          type="checkbox"
          checked={intensive}
          onChange={(e) => setIntensive(e.target.checked)}
        />
      </div>

      <div className="mb-3 flex items-center gap-2">
        <label className="w-32">Длительность:</label>
        <select
          value={minutes}
          onChange={(e) => setMinutes(Number(e.target.value) as 45 | 60)}
          className="border rounded px-2 py-1"
        >
          <option value={45}>45 мин</option>
          <option value={60}>60 мин</option>
        </select>
      </div>

      <div className="mt-4 text-lg">
        Цена: <b>{price}₽</b>
      </div>
    </d

};

export default SalaryCalculator;
