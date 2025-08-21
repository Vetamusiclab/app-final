export function formatDateISO(iso:string){
  const d = new Date(iso);
  return d.toLocaleDateString('ru-RU', { day:'2-digit', month:'long', weekday:'long' });
}
