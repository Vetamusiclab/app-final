import { Card, CardContent } from '@/components/ui/Card'
export default function Materials(){
  const list = [{title:'Бой №1 (видео)'},{title:'Аккорды Am-Dm-E (PDF)'}]
  return (
    <Card><CardContent>
      <div className="font-semibold mb-2">Материалы</div>
      <ul className="list-disc pl-5 text-sm space-y-1">{list.map((m,i)=><li key={i}>{m.title}</li>)}</ul>
    </CardContent></Card>
  )
}
