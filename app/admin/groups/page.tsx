import { Card, CardContent } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
export default function Groups(){
  return (
    <Card><CardContent>
      <div className="font-semibold mb-3">Группы</div>
      <div className="flex gap-2 mb-3">
        <Input placeholder="Название группы"/>
        <Button>Создать</Button>
      </div>
      <ul className="text-sm space-y-1">
        <li className="flex justify-between border-b pb-2">Гитара. Начинающие <span>12 учеников</span></li>
        <li className="flex justify-between border-b pb-2">Вокал. Продолжающие <span>8 учеников</span></li>
      </ul>
    </CardContent></Card>
  )
}
