import { Card, CardContent } from '@/components/ui/Card'
export default function Achievements(){
  return (
    <Card><CardContent>
      <div className="font-semibold mb-2">Достижения</div>
      <ul className="list-disc pl-5 text-sm space-y-1">
        <li>Выступление на концерте (апрель)</li>
        <li>Сдана пьеса №2</li>
      </ul>
    </CardContent></Card>
  )
}
