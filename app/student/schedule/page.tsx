import { Card, CardContent } from '@/components/ui/Card'
export default function StudentSchedule(){
  const items = [
    { id:1, day:'Пн', time:'18:00–19:00', room:'2', subject:'Гитара' },
    { id:2, day:'Ср', time:'18:00–19:00', room:'3', subject:'Гитара' }
  ]
  return (
    <Card><CardContent>
      <div className="font-semibold mb-2">Моё расписание</div>
      <ul className="space-y-2 text-sm">
        {items.map(i=> <li key={i.id} className="flex justify-between border-b pb-2">
          <span>{i.day} • {i.time}</span><span>{i.subject} • каб. {i.room}</span>
        </li>)}
      </ul>
    </CardContent></Card>
  )
}
