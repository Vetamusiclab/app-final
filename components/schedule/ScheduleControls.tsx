// components/schedule/ScheduleControls.tsx
'use client';

import React from 'react';

type Props = {
  scale: number;
  setScale: (n: number) => void;
  fitToScreen: () => void;
};

export default function ScheduleControls({ scale, setScale, fitToScreen }: Props) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setScale((s) => Math.max(0.4, +(s - 0.1).toFixed(2)))}
          className="px-3 py-1 border rounded"
          aria-label="Уменьшить масштаб"
        >
          −
        </button>
        <div className="text-sm px-2">Масштаб: {(scale * 100).toFixed(0)}%</div>
        <button
          onClick={() => setScale((s) => Math.min(2, +(s + 0.1).toFixed(2)))}
          className="px-3 py-1 border rounded"
          aria-label="Увеличить масштаб"
        >
          +
        </button>
      </div>

      <button onClick={fitToScreen} className="px-3 py-1 border rounded">
        Подогнать под экран
      </button>

      <div className="text-xs text-gray-500 ml-4">Перетяните границу заголовка аудитории для изменения ширины столбца.</div>
    </div>
  );
}
