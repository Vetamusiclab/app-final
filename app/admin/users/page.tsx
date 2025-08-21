import { Card, CardContent } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
export default function Users(){
  const users=[{name:'Иван Петров',role:'student'},{name:'Анна Смирнова',role:'teacher'}]
  return (
    <Card><CardContent>
      <div className="flex items-center justify-between mb-3">
        <div className="font-semibold">Пользователи</div>
        <Button>Добавить</Button>
      </div>
      <ul className="text-sm space-y-1">{users.map((u,i)=><li key={i} className="flex justify-between border-b pb-2">{u.name}<span className="uppercase">{u.role}</span></li>)}</ul>
    </CardContent></Card>
  )
}
