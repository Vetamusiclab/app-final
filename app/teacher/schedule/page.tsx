// app/teacher/schedule/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { useRouter } from 'next/navigation';
import Schedule from '@/components/teacher/Schedule';

export default function TeacherSchedulePageClient() {
  const { user } = useAuth();
  const router = useRouter();
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    if (user.role !== 'teacher') {
      setLoading(false);
      return;
    }
    (async () => {
      try {
        const res = await fetch(`/api/sessions/teacher/${user.id}`);
        if (res.ok) {
          const data = await res.json();
          setSessions(data || []);
        } else {
          setSessions([]);
        }
      } catch (e) {
        setSessions([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [user, router]);

  if (loading) return <div>Загрузка...</div>;
  if (!user) return null;
  if (user.role !== 'teacher') return <div className="p-4 bg-white rounded shadow">Доступ ограничен — вы не преподаватель.</div>;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Моё расписание</h1>
      <div className="bg-white p-6 rounded shadow">
        <Schedule sessions={sessions} />
      </div>
    </div>
  );
}
