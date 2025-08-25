import UserAvatar from "@/components/shared/UserAvatar";
import DirectionSelector from "@/components/layout/DirectionSelector";
import Link from "next/link";

export default function StudentHome(){
  const directions = ["Вокал","Гитара","Фортепиано"];
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <UserAvatar name="Иван Петров" />
        <div>
          <div className="text-sm text-black/60">Добро пожаловать</div>
          <div className="text-xl font-semibold">Иван Петров</div>
        </div>
      </div>
      <div className="card">
        <div className="text-sm mb-2">Ваши направления</div>
        <DirectionSelector directions={directions} onSelect={()=>{}} />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link href="/student/schedule" className="card hover:shadow-lg transition">Расписание</Link>
        <Link href="/student/materials" className="card hover:shadow-lg transition">Материалы</Link>
        <Link href="/student/subscription" className="card hover:shadow-lg transition">Абонемент</Link>
        <Link href="/student/achievements" className="card hover:shadow-lg transition">Достижения</Link>
      </div>
    </div>
  );
}
