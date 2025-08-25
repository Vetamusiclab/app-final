export function formatDateRange(startISO: string, endISO: string){
  const s = new Date(startISO); const e = new Date(endISO);
  const pad = (n:number)=> String(n).padStart(2, '0');
  const date = `${pad(s.getDate())}.${pad(s.getMonth()+1)}.${s.getFullYear()}`;
  const time = `${pad(s.getHours())}:${pad(s.getMinutes())}-${pad(e.getHours())}:${pad(e.getMinutes())}`;
  return `${date} • ${time}`;
}
