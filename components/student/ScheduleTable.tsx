import { lessons } from "@/lib/schedule";
import { formatDateRange } from "@/utils/formatDate";
export default function ScheduleTable({ studentId }:{ studentId: string }){
  const rows = lessons.filter(l => l.studentId === studentId);
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead><tr className="text-left border-b">
          <th className="py-2 pr-4">Дата/время</th>
          <th className="py-2 pr-4">Предмет</th>
          <th className="py-2 pr-4">Педагог</th>
          <th className="py-2 pr-4">Комментарий</th>
        </tr></thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.id} className="border-b">
              <td className="py-2 pr-4">{formatDateRange(r.start, r.end)}</td>
              <td className="py-2 pr-4">{r.direction}</td>
              <td className="py-2 pr-4">{r.teacherId}</td>
              <td className="py-2 pr-4">{r.comment || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
