export default function AdminHome(){
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      <div className="card">
        <div className="text-sm text-black/60">Ученики</div>
        <div className="text-3xl font-bold">124</div>
      </div>
      <div className="card">
        <div className="text-sm text-black/60">Занятий в этом месяце</div>
        <div className="text-3xl font-bold">312</div>
      </div>
      <div className="card">
        <div className="text-sm text-black/60">Доход</div>
        <div className="text-3xl font-bold">1.2M ₽</div>
      </div>
      <div className="card">
        <div className="text-sm text-black/60">Загрузка залов</div>
        <div className="text-3xl font-bold">76%</div>
      </div>
    </div>
  );
}
