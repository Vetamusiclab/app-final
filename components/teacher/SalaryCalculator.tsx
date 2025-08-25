'use client';
import { useState } from "react";
import { calculateLessonPrice } from "@/utils/calculateSalary";

export default function SalaryCalculator(){
  const [level, setLevel] = useState<'Basic'|'Progressive'|'Prive'>('Basic');
  const [minutes, setMinutes] = useState<'45'|'60'>('45');
  const [intensive, setIntensive] = useState(false);

  const price = calculateLessonPrice(level, intensive, { minutes: minutes==='45'?45:60 });

  return (
    <div className="card">
      <div className="font-semibold mb-3">Калькулятор урока</div>
      <div className="grid grid-cols-2 gap-3">
        <label className="text-sm">Уровень
          <select className="input mt-1" value={level} onChange={(e)=>setLevel(e.target.value as any)}>
            <option>Basic</option><option>Progressive</option><option>Prive</option>
          </select>
        </label>
        <label className="text-sm">Длительность
          <select className="input mt-1" value={minutes} onChange={(e)=>setMinutes(e.target.value as any)}>
            <option value="45">45 мин</option><option value="60">60 мин</option>
          </select>
        </label>
        <label className="flex items-center gap-2 col-span-2">
          <input type="checkbox" checked={intensive} onChange={e=>setIntensive(e.target.checked)} />
          Интенсив (2+ занятий/нед)
        </label>
      </div>
      <div className="mt-4 text-lg">Цена: <b>{price}₽</b></div>
    </div>
  );
}
