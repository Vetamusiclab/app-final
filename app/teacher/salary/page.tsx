import { Card, CardContent } from '@/components/ui/Card'
import { calculateSalary, Lesson } from '@/utils/calculateSalary'

const lessons:Lesson[]=[
  {id:'1',date:'2025-07-22',time:'10:00–11:00',subject:'Гитара',status:'прошёл'},
  {id:'2',date:'2025-07-23',time:'12:00–13:00',subject:'Вокал',status:'прошёл'},
  {id:'3',date:'2025-07-24',time:'14:00–15:00',subject:'Барабаны',status:'отменён'},
]

export default function Salary(){
  const s = calculateSalary(lessons)
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card><CardContent>
        <div className="font-semibold mb-2">Зарплата за неделю</div>
        <div className="text-sm space-y-1">
          <div>Проведённых уроков: <b>{s.passed}</b></div>
          <div>Ставка: <b>{s.rate} ₽</b></div>
          <div>Итого: <b className="text-green-600">{s.total} ₽</b></div>
        </div>
      </CardContent></Card>
      <Card><CardContent>
        <div className="font-semibold mb-2">Уроки</div>
        <ul className="text-sm space-y-1">{lessons.map(l=><li key={l.id}>{l.date} • {l.time} • {l.subject} — {l.status}</li>)}</ul>
      </CardContent></Card>
    </div>
  )
}
