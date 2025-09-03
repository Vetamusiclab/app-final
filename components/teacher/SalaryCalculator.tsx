// components/teacher/SalaryCalculator.tsx
'use client';

import React, { useMemo, useState } from 'react';

export default function SalaryCalculator() {
  const [level, setLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [minutes, setMinutes] = useState(60);
  const [intensive, setIntensive] = useState(false);

  const basePerHour = useMemo(() => {
    switch (level) {
      case 'beginner':
        return 20;
      case 'intermediate':
        return 30;
      case 'advanced':
        return 45;
      default:
        return 20;
    }
  }, [level]);

  const price = useMemo(() => {
    const hours = minutes / 60;
    let p = basePerHour * hours;
    if (intensive) p *= 1.5;
    return Math.round(p * 100) / 100;
  }, [basePerHour, minutes, intensive]);

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Калькулятор зарплаты</h2>

      <div className="space-y-3">
        <div>
          <label className="block text-sm mb-1">Уровень</label>
          <div className="flex gap-2">
            <button onClick={() => setLevel('beginner')} className={`px-3 py-1 rounded ${level === 'beginner' ? 'bg-primary text-white' : 'border'}`}>Начальный</button>
            <button onClick={() => setLevel('intermediate')} className={`px-3 py-1 rounded ${level === 'intermediate' ? 'bg-primary text-white' : 'border'}`}>Средний</button>
            <button onClick={() => setLevel('advanced')} className={`px-3 py-1 rounded ${level === 'advanced' ? 'bg-primary text-white' : 'border'}`}>Продвинутый</button>
          </div>
        </div>

        <div>
          <label className="block text-sm mb-1">Длительность (минуты)</label>
          <input type="number" value={minutes} min={15} step={15} onChange={(e) => setMinutes(Number(e.target.value) || 0)} className="w-full px-3 py-2 border rounded" />
        </div>

        <div className="flex items-center gap-3">
          <input id="intensive" type="checkbox" checked={intensive} onChange={(e) => setIntensive(e.target.checked)} />
          <label htmlFor="intensive" className="text-sm">Интенсив (коэффициент 1.5)</label>
        </div>

        <div className="pt-3 border-t">
          <div className="text-sm text-gray-500">Итог</div>
          <div className="text-2xl font-bold">{price} у.е.</div>
        </div>
      </div>
    </div>
  );
}
