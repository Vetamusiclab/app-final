import { Card, CardContent } from '@/components/ui/Card'
export default function Reports(){
  return (
    <Card><CardContent>
      <div className="font-semibold mb-2">Отчёты</div>
      <ul className="list-disc pl-5 text-sm space-y-1">
        <li>Посещаемость за месяц</li>
        <li>Финансовый отчёт</li>
      </ul>
    </CardContent></Card>
  )
}
