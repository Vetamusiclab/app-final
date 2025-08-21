export default function Layout({children}:{children:React.ReactNode}){
  return <div className="grid gap-4">
    <nav className="flex gap-3 text-sm">
      <a className="link" href="/teacher">Главная</a>
      <a className="link" href="/teacher/schedule">Расписание</a>
      <a className="link" href="/teacher/salary">Зарплата</a>
    </nav>
    {children}
  </div>
}
