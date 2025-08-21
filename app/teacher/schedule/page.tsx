'use client'
import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
export default function TeacherSchedule(){
  const [cells,setCells]=useState<Record<string,string>>({})
  const days=['Пн','Вт','Ср','Чт','Пт','Сб']; const times=['16:00','17:00','18:00']
  return (
    <Card><CardContent>
      <div className="font-semibold mb-3">Редактирование расписания</div>
      <table className="w-full text-sm border">
        <thead><tr><th className="border p-2">Время</th>{days.map(d=><th key={d} className="border p-2">{d}</th>)}</tr></thead>
        <tbody>
          {times.map(t=>(
            <tr key={t}>
              <td className="border p-2 font-medium">{t}</td>
              {days.map(d=>{
                const k=d+'_'+t; const v=cells[k];
                return <td key={k} className="border p-2 cursor-pointer hover:bg-brand-light" onClick={()=>{
                  const x=prompt('Введите предмет/кабинет');
                  if(x!==null) setCells({...cells,[k]:x||''})
                }}>{v||'—'}</td>
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </CardContent></Card>
  )
}
