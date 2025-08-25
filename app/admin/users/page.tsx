'use client';
import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function AdminUsers(){
  const [users, setUsers] = useState([{ id:'u1', name:'Иван Петров', role:'student' }, { id:'u2', name:'Вета Гулливер', role:'teacher' }]);
  const [name, setName] = useState('');
  const [role, setRole] = useState<'student'|'teacher'|'admin'>('student');
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Пользователи</h2>
      <div className="card grid sm:grid-cols-3 gap-2">
        <Input placeholder="Имя" value={name} onChange={e=>setName(e.target.value)} />
        <select className="input" value={role} onChange={e=>setRole(e.target.value as any)}>
          <option value="student">Ученик</option>
          <option value="teacher">Преподаватель</option>
          <option value="admin">Админ</option>
        </select>
        <Button onClick={()=>{ if(!name) return; setUsers(v=>[...v,{ id:String(Date.now()), name, role }]); setName(''); }}>Добавить</Button>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {users.map(u => (
          <div key={u.id} className="card">
            <div className="font-semibold">{u.name}</div>
            <div className="text-sm text-black/60">{u.role}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
