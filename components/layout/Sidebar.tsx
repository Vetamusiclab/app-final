import Link from "next/link";
import { clsx } from "clsx";

export default function Sidebar({ items, title }: { title: string; items: { href: string; label: string; }[] }){
  return (
    <aside className="w-64 shrink-0 p-4 border-r border-black/10">
      <div className="mb-4 font-semibold">{title}</div>
      <div className="flex flex-col gap-1">
        {items.map(it => (
          <Link key={it.href} href={it.href} className={clsx("sidebar-link")}>
            <span>{it.label}</span>
          </Link>
        ))}
      </div>
    </aside>
  );
}
