'use client'; // Обязательно для компонента с useState

import { useState } from 'react';
import { calculateLessonPrice } from '@/utils/calculateSalary';

type Props = {
  level: 'Basic' | 'Progressive' | 'Prive';
};

const SalaryCalculator = ({ level }: Props) => {
  const [intensive, setIntensive] = useState(false);
  const [minutes, setMinutes] = useState<'45' | '60'>('45');

  const price = calculateLessonPrice(level, intensive, {
    minutes: minutes === '45' ? 45 : 60,
  });

  return (
    <div className="card p-4 shadow rounded">
      <h2 className="text-xl font-bold mb-4">Калькулятор зарплаты</h2>

      <div className="mb-3">
        <label className="mr-2">Интенсив:</label>
        <input
          type="checkbox"
          checked={intensive}
          onChange={(e) => setIntensive(e.target.checked)}
        />
      </div>

      <div className="mb-3">
        <label className="mr-2">Длительность:</label>
        <select value={minutes} onChange={(e) => setMinutes(e.target.value as '45' | '60')}>
          <option value="45">45 мин</option>
          <option value="60">60 мин</option>
        </select>
      </div>

      <div className="mt-4 text-lg">
        Цена: <b>{price}₽</b>
      </div>
    </div>
  );
};

export default SalaryCalculator;
