import Link from "next/link";

export default function RoleCard({ icon, title, href }:{ icon: string; title: string; href: string }){
  return (
    <Link href={href} className="card hover:shadow-lg transition">
      <div className="text-4xl">{icon}</div>
      <div className="mt-2 text-xl font-semibold">{title}</div>
      <div className="text-sm text-black/60 mt-1">Войти как {title.toLowerCase()}</div>
    </Link>
  );
}
