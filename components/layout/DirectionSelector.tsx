'use client'
import React from 'react'
const directions = ['Гитара','Фортепиано','Вокал','Барабаны','Сольфеджио']
export default function DirectionSelector({ value, onChange }:{ value?:string; onChange:(v:string)=>void; }){
  return (
    <div className="flex flex-wrap gap-2">
      {directions.map(d => (
        <button key={d} onClick={()=>onChange(d)} className={'px-3 py-1 rounded-full border '+(value===d?'bg-brand-orange text-white border-brand-orange':'hover:bg-neutral-100')}>
          {d}
        </button>
      ))}
    </div>
  )
}
