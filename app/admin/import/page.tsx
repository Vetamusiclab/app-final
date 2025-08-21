import { Card, CardContent } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
export default function ImportPage(){
  return (
    <Card><CardContent>
      <div className="font-semibold mb-2">Импорт учеников (Excel)</div>
      <p className="text-sm mb-3">Загрузите .xlsx согласно шаблону.</p>
      <Button>Загрузить файл</Button>
    </CardContent></Card>
  )
}
