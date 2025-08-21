export default function Layout({children}:{children:React.ReactNode}){
  return <div className="grid gap-4">
    <nav className="flex gap-3 text-sm">
      <a className="link" href="/student">Главная</a>
      <a className="link" href="/student/schedule">Расписание</a>
      <a className="link" href="/student/materials">Материалы</a>
      <a className="link" href="/student/subscription">Абонемент</a>
      <a className="link" href="/student/achievements">Достижения</a>
    </nav>
    {children}
  </div>
}
