import RoleCard from '@/components/auth/RoleCard'
export default function RolePage(){
  return (
    <div className="grid gap-4">
      <h1 className="text-2xl font-bold mb-2 text-brand-orange">Выберите роль</h1>
      <RoleCard role="student" desc="Доступ к расписанию, материалам и абонементам" />
      <RoleCard role="teacher" desc="Расписание, ученики и зарплата" />
      <RoleCard role="admin" desc="Панель управления школой" />
    </div>
  )
}
