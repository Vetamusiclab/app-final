import { Card, CardContent } from '@/components/ui/Card'
export default function Subscription(){
  return (
    <Card><CardContent>
      <div className="font-semibold mb-2">Абонемент</div>
      <div className="text-sm">Тариф: <b>Light</b> • Осталось занятий: <b>3</b> • Оплачен до: <b>30.09.2025</b></div>
    </CardContent></Card>
  )
}
