// components/teacher/SalaryCalculator.tsx
'use client';

import { useState } from 'react';
import { calculateLessonPrice } from '@/utils/calculateSalary';

type Level = 'Basic' | 'Progressive' | 'Prive';

export default function SalaryCalculator() {
  const [level, setLevel] = useState<Level>('Basic');
  const [intensive, setIntensive] = useState<boolean>(false);
  const [minutes, setMinutes] = useState<30 | 45 | 60>(45);
  const [pair, setPair] = useState<boolean>(false);
  const [kids, setKids] = useState<boolean>(false);
  const [group, setGroup] = useState<boolean>(false);

  const price = calculateLessonPrice(level, intensive, {
    minutes,
    pair,
    kids,
    group,
  });

  return (
    <div className="card p-4 shadow rounded">
      <h2 className="text-xl font-bold mb-4">Калькулятор зарплаты</h2>

      <div className="mb-3">
        <label className="block text-sm mb-1">Уровень наставника</label>
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value as Level)}
          className="input"
        >
          <option value="Basic">Basic</option>
          <option value="Progressive">Progressive</option>
          <option value="Prive">Prive</option>
        </select>
      </div>

      <div className="mb-3 flex items-center gap-4">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={intensive} onChange={(e) => setIntensive(e.target.checked)} />
          Интенсив (2+ в неделю)
        </label>

        <label className="flex items-center gap-2">
          <input type="checkbox" checked={pair} onChange={(e) => setPair(e.target.checked)} />
          Парное
        </label>

        <label className="flex items-center gap-2">
          <input type="checkbox" checked={kids} onChange={(e) => setKids(e.target.checked)} />
          Малыши
        </label>

        <label className="flex items-center gap-2">
          <input type="checkbox" checked={group} onChange={(e) => setGroup(e.target.checked)} />
          Групповое
        </label>
      </div>

      <div className="mb-4">
        <label className="block text-sm mb-1">Длительность</label>
        <select
          value={String(minutes)}
          onChange={(e) => setMinutes(Number(e.target.value) as 30 | 45 | 60)}
          className="input"
        >
          <option value={30}>30 мин</option>
          <option value={45}>45 мин</option>
          <option value={60}>60 мин</option>
        </select>
      </div>

      <div className="mt-4 text-lg">
        Цена: <b>{price}₽</b>
      </div>
    </div>
  );
}
