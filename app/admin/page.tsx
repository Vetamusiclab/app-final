import { Card, CardContent } from '@/components/ui/Card'
export default function AdminHome(){
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card><CardContent><div className="font-semibold mb-1">Пользователи</div><div className="text-sm">Ученики/преподаватели/админы</div></CardContent></Card>
      <Card><CardContent><div className="font-semibold mb-1">Группы</div><div className="text-sm">Создание и редактирование</div></CardContent></Card>
      <Card><CardContent><div className="font-semibold mb-1">Отчёты</div><div className="text-sm">Посещаемость и финансы</div></CardContent></Card>
    </div>
  )
}
