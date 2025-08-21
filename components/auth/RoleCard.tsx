import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/Card'
export default function RoleCard({ role, desc }:{ role:'student'|'teacher'|'admin'; desc:string }){
  return (
    <Card className="hover:shadow-md transition">
      <CardContent>
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-lg font-semibold capitalize">{role}</div>
            <div className="text-sm text-neutral-500">{desc}</div>
          </div>
          <Link href={`/login/${role}`} className="btn btn-primary">Войти</Link>
        </div>
      </CardContent>
    </Card>
  )
}
