import Link from "next/link";

export default function Header(){
  return (
    <header className="border-b border-black/10">
      <div className="container flex items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[var(--brand-orange)] rounded-full" />
          <span className="font-semibold">MUSIC.LAB</span>
        </Link>
        <nav className="flex items-center gap-3 text-sm">
          <Link href="/login/role" className="btn btn-ghost">Войти</Link>
        </nav>
      </div>
    </header>
  );
}
