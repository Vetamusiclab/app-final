interface Props { params: { id: string } }
export default function TeacherStudentPage({ params }: Props){
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Ученик: {params.id}</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="card">
          <div className="font-semibold mb-2">Материалы</div>
          <ul className="list-disc pl-6">
            <li><a href="#">Список гамм (PDF)</a></li>
          </ul>
        </div>
        <div className="card">
          <div className="font-semibold mb-2">Абонемент</div>
          <div>Light • 4 занятия в месяц</div>
        </div>
        <div className="card">
          <div className="font-semibold mb-2">Достижения</div>
          <div>Пока пусто</div>
        </div>
        <div className="card">
          <div className="font-semibold mb-2">Заметки преподавателя</div>
          <textarea className="input min-h-[120px]" placeholder="Добавьте комментарий..." />
        </div>
      </div>
    </div>
  );
}
