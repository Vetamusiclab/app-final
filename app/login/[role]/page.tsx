'use client';
import { useParams, useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { login } from "@/lib/auth";

export default function LoginByRolePage(){
  const { role } = useParams<{ role: "student"|"teacher"|"admin" }>();
  const router = useRouter();
  function onSubmit(formData: FormData){
    const loginStr = String(formData.get('login')||'');
    const pass = String(formData.get('password')||'');
    const session = login(role, loginStr, pass);
    if(session.role === 'student') router.push('/student');
    if(session.role === 'teacher') router.push('/teacher');
    if(session.role === 'admin') router.push('/admin');
  }
  return (
    <form action={onSubmit} className="max-w-md space-y-3">
      <div className="text-sm text-black/60">Вход как: <b>{role}</b></div>
      <Input name="login" placeholder="Логин" required />
      <Input name="password" placeholder="Пароль" type="password" required />
      <div className="flex gap-2">
        <Button type="submit">Войти</Button>
        <Button type="button" variant="ghost" onClick={()=>history.back()}>Назад</Button>
      </div>
      <div className="text-sm text-black/60">Любые данные подойдут в демо.</div>
    </form>
  );
}
