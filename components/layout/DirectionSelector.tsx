'use client';
import { useState } from "react";

export default function DirectionSelector({ directions, onSelect }:{ directions: string[]; onSelect: (d:string)=>void }){
  const [active, setActive] = useState(directions[0]);
  return (
    <div className="flex gap-2">
      {directions.map(d => (
        <button key={d} onClick={()=>{ setActive(d); onSelect(d);}} className={`badge ${active===d?'ring-2 ring-[var(--brand-lime)]':''}`}>{d}</button>
      ))}
    </div>
  );
}
