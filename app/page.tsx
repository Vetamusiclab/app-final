import Link from "next/link";

export default function HomePage(){
  return (
    <div className="grid lg:grid-cols-2 gap-6 items-center">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Творческая Лаборатория Веты Гулливер</h1>
        <p className="text-black/70">
          Современная музыкальная школа: вокал, гитара, фортепиано, барабаны.
        </p>
        <div className="flex gap-3">
          <Link href="/login/role" className="btn btn-primary">Войти</Link>
          <a href="#" className="btn btn-ghost">Узнать больше</a>
        </div>
      </div>
      <div className="card">
        <div className="text-sm">Фирменные цвета</div>
        <div className="flex gap-2 mt-2">
          <div className="w-10 h-10 rounded-2xl bg-[var(--brand-orange)]" title="#FF6F00"/>
          <div className="w-10 h-10 rounded-2xl bg-[var(--brand-lime)]" title="#6BCB77"/>
          <div className="w-10 h-10 rounded-2xl bg-[var(--brand-black)]" title="#000000"/>
          <div className="w-10 h-10 rounded-2xl bg-[var(--brand-sand)]" title="#FFE0B2"/>
          <div className="w-10 h-10 rounded-2xl bg-[var(--brand-white)] border" title="#FFFFFF"/>
        </div>
      </div>
    </div>
  );
}
