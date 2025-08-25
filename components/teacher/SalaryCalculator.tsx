import { useState } from 'react';
import { calculateLessonPrice } from '@/utils/calculateSalary';

type Props = {
  level: keyof typeof import('@/lib/tariffs').Tariffs;
};

export default function SalaryCalculator({ level }: Props) {
  const [minutes, setMinutes] = useState<'45' | '60'>('45');
  const [pair, setPair] = useState(false);
  const [kids, setKids] = useState(false);
  const [group, setGroup] = useState(false);

  const price = calculateLessonPrice(level, {
    minutes: minutes === '45' ? 45 : 60,
    pair,
    kids,
    group,
  });

  return (
    <div className="card p-4 shadow rounded">
      <h2 className="text-xl font-bold mb-4">Калькулятор зарплаты</h2>

      <div className="mb-3">
        <label>
          <input
            type="radio"
            value="45"
            checked={minutes === '45'}
            onChange={() => setMinutes('45')}
          />{' '}
          45 мин
        </label>
        <label className="ml-4">
          <input
            type="radio"
            value="60"
            checked={minutes === '60'}
            onChange={() => setMinutes('60')}
          />{' '}
          60 мин
        </label>
      </div>

      <div className="mb-3">
        <label>
          <input type="checkbox" checked={pair} onChange={() => setPair(!pair)} /> Парное
        </label>
        <label className="ml-4">
          <input type="checkbox" checked={kids} onChange={() => setKids(!kids)} /> Малыши
        </label>
        <label className="ml-4">
          <input type="checkbox" checked={group} onChange={() => setGroup(!group)} /> Групповое
        </label>
      </div>

      <p className="font-semibold">Цена: {price} ₽</p>
    </div>
  );
}

      <div className="mt-4 text-lg">Цена: <b>{price}₽</b></div>
    </div>
  );
}
