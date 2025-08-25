import React, { useState } from 'react';
import { calculateLessonPrice } from '@/utils/calculateSalary';
import { Tariffs } from '@/lib/tariffs';

type SalaryCalculatorProps = {
  level: keyof typeof Tariffs;
};

const SalaryCalculator: React.FC<SalaryCalculatorProps> = ({ level }) => {
  const [minutes, setMinutes] = useState<'45' | '60'>('45');
  const [pairOption, setPairOption] = useState(false);
  const [kidsOption, setKidsOption] = useState(false);
  const [groupOption, setGroupOption] = useState(false);

  // Рассчитываем цену
  const price = calculateLessonPrice(level, {
    minutes: minutes === '45' ? 45 : 60,
    pair: pairOption,
    kids: kidsOption,
    group: groupOption,
  });

  return (
    <div className="card p-4 shadow rounded">
      <h2 className="text-xl font-bold mb-4">Калькулятор зарплаты</h2>

      <div className="mb-3">
        <label className="mr-2">Длительность:</label>
        <select
          value={minutes}
          onChange={(e) => setMinutes(e.target.value as '45' | '60')}
          className="border p-1 rounded"
        >
          <option value="45">45 мин</option>
          <option value="60">60 мин</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="mr-2">
          <input
            type="checkbox"
            checked={pairOption}
            onChange={(e) => setPairOption(e.target.checked)}
          />
          Парное занятие
        </label>
      </div>

      <div className="mb-3">
        <label className="mr-2">
          <input
            type="checkbox"
            checked={kidsOption}
            onChange={(e) => setKidsOption(e.target.checked)}
          />
          Малыши до 6 лет
        </label>
      </div>

      <div className="mb-3">
        <label className="mr-2">
          <input
            type="checkbox"
            checked={groupOption}
            onChange={(e) => setGroupOption(e.target.checked)}
          />
          Групповое занятие
        </label>
      </div>

      <div className="mt-4 font-bold">
        Цена занятия: <span>{price}₽</span>
      </div>
    </div>
  );
};

export default SalaryCalculator;
