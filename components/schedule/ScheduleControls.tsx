'use client';

import React from 'react';

type Props = {
  scale: number;
  setScale: (v: number) => void;
  fitToScreen: boolean;
  setFitToScreen: (b: boolean) => void;
  resetColumns?: () => void;
};

export default function ScheduleControls({ scale, setScale, fitToScreen, setFitToScreen, resetColumns }: Props) {
  const dec = () => setScale(Math.max(0.3, +(Math.round((scale - 0.1) * 100) / 100).toFixed(2)));
  const inc = () => setScale(Math.min(2.5, +(Math.round((scale + 0.1) * 100) / 100).toFixed(2)));

  return (
    <div className="flex items-center gap-3 mb-3">
      <div className="flex items-center gap-2">
        <button
          onClick={dec}
          aria-label="Уменьшить масштаб"
          className="px-3 py-1 border rounded hover:bg-gray-50"
        >
          −
        </button>
        <div className="px-3 py-1 border rounded text-sm">{Math.round(scale * 100)}%</div>
        <button
          onClick={inc}
          aria-label="Увеличить масштаб"
          className="px-3 py-1 border rounded hover:bg-gray-50"
        >
          +
        </button>
      </div>

      <label className="flex items-center gap-2 select-none">
        <input
          type="checkbox"
          checked={fitToScreen}
          onChange={(e) => setFitToScreen(e.target.checked)}
        />
        <span className="text-sm">Подогнать по экрану</span>
      </label>

      {resetColumns && (
        <button onClick={resetColumns} className="ml-2 px-3 py-1 border rounded text-sm">
          Сброс размеров
        </button>
      )}
    </div>
  );
}
