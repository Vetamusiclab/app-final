import { Card, CardContent } from '@/components/ui/Card'
export default function TeacherHome(){
  const students = ['Иван Петров','Мария Иванова','Артём Смирнов']
  return (
    <Card><CardContent>
      <div className="font-semibold mb-2">Мои ученики</div>
      <ul className="list-disc pl-5 text-sm space-y-1">{students.map(s=><li key={s}>{s}</li>)}</ul>
    </CardContent></Card>
  )
}
