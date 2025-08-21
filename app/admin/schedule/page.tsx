import { Card, CardContent } from '@/components/ui/Card'
export default function AdminSchedule(){
  return (
    <Card><CardContent>
      <div className="font-semibold mb-2">Расписание по кабинетам</div>
      <div className="text-sm">Каб.1 — Пн/Ср/Пт 16:00–20:00 • Каб.2 — Вт/Чт 16:00–20:00</div>
    </CardContent></Card>
  )
}
