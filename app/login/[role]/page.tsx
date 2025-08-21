'use client'
import { useParams, useRouter } from 'next/navigation'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'

export default function LoginByRole(){
  const params = useParams(); const router = useRouter();
  const role = String(params.role||'')
  function submit(e:React.FormEvent){ e.preventDefault(); router.push('/'+role) }
  return (
    <Card className="max-w-md">
      <CardContent>
        <h1 className="text-xl font-semibold mb-3">Вход: {role}</h1>
        <form onSubmit={submit} className="space-y-3">
          <Input placeholder="E-mail" type="email" required/>
          <Input placeholder="Пароль" type="password" required/>
          <Button type="submit">Войти</Button>
        </form>
      </CardContent>
    </Card>
  )
}
