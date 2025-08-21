export default function Layout({children}:{children:React.ReactNode}){
  return <div className="grid gap-4">
    <nav className="flex gap-3 text-sm">
      <a className="link" href="/admin">Главная</a>
      <a className="link" href="/admin/users">Пользователи</a>
      <a className="link" href="/admin/groups">Группы</a>
      <a className="link" href="/admin/schedule">Расписание</a>
      <a className="link" href="/admin/reports">Отчёты</a>
      <a className="link" href="/admin/import">Импорт</a>
    </nav>
    {children}
  </div>
}
