export default function UserAvatar({ name }:{ name: string }){
  const initials = name.split(' ').map(n=>n[0]).slice(0,2).join('');
  return <div className="w-12 h-12 rounded-full bg-[var(--brand-lime)] flex items-center justify-center text-white font-semibold">{initials}</div>;
}
