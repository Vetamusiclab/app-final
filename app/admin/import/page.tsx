'use client';
import { useState } from "react";
import { parseExcel } from "@/utils/excelParser";

export default function AdminImport(){
  const [rows, setRows] = useState<{ name: string; email?: string }[]>([]);
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Импорт учеников (Excel/CSV)</h2>
      <input type="file" className="input" onChange={async (e)=>{
        const f = e.target.files?.[0]; if(!f) return;
        const data = await parseExcel(f); setRows(data);
      }} />
      <div className="card">
        <div className="font-semibold mb-2">Предпросмотр ({rows.length})</div>
        <ul className="list-disc pl-6">
          {rows.map((r,i)=><li key={i}>{r.name}</li>)}
        </ul>
      </div>
    </div>
  );
}
