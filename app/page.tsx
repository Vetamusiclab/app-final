import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'

export default function HomePage(){
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardContent>
          <div className="flex items-center gap-3">
            <Image src="/logo.svg" alt="logo" width={56} height={56}/>
            <div>
              <h1 className="text-2xl font-bold">MUSIC.LAB</h1>
              <p className="text-neutral-600">Цифровая платформа музыкальной школы</p>
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            <Link href="/login/role"><Button>Войти</Button></Link>
            <Link href="/student"><Button variant="ghost">Кабинет ученика</Button></Link>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <h2 className="font-semibold mb-2">Возможности</h2>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>Расписание и кабинеты</li>
            <li>Абонементы и оплаты</li>
            <li>Материалы и достижения</li>
            <li>Зарплата преподавателя</li>
            <li>Импорт учеников (Excel)</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
