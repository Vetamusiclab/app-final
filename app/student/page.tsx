import UserAvatar from '@/components/shared/UserAvatar'
import { Card, CardContent } from '@/components/ui/Card'
export default function StudentHome(){
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card><CardContent><div className="flex items-center gap-3"><UserAvatar/><div><div className="font-semibold">Иван Петров</div><div className="text-sm text-neutral-500">Ученик • Вокал</div></div></div></CardContent></Card>
      <Card><CardContent><div className="font-semibold mb-2">Ближайшее занятие</div><div>Пт, 18:00–19:00 • Кабинет 3</div></CardContent></Card>
    </div>
  )
}
