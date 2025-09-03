// lib/sessions.ts
import type { Session } from '@/types/session';

// Простой генератор id, чтобы не вводить зависимость uuid
const generateId = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;

const demoSessions: Session[] = [
  {
    id: 's1',
    teacherId: 't1',
    title: 'Индивидуальный урок — Вокал',
    start: new Date(Date.now() + 24 * 3600 * 1000).toISOString(),
    end: new Date(Date.now() + 25 * 3600 * 1000).toISOString(),
    status: 'free',
    createdAt: new Date().toISOString(),
  },
  {
    id: 's2',
    teacherId: 't1',
    title: 'Групповая репетиция',
    start: new Date(Date.now() + 48 * 3600 * 1000).toISOString(),
    end: new Date(Date.now() + 50 * 3600 * 1000).toISOString(),
    status: 'booked',
    studentId: 'stu1',
    createdAt: new Date().toISOString(),
  },
];

export const sessionsStore: Session[] = [...demoSessions];

export async function getAllSessions(): Promise<Session[]> {
  return Promise.resolve([...sessionsStore]);
}

export async function getSessionsByTeacher(teacherId: string): Promise<Session[]> {
  return Promise.resolve(sessionsStore.filter((s) => s.teacherId === teacherId));
}

export async function getSessionById(id: string): Promise<Session | undefined> {
  return Promise.resolve(sessionsStore.find((s) => s.id === id));
}

export async function createSession(partial: Omit<Session, 'id' | 'createdAt'>): Promise<Session> {
  const session: Session = {
    ...partial,
    id: generateId(),
    createdAt: new Date().toISOString(),
  };
  sessionsStore.push(session);
  return Promise.resolve(session);
}

export async function updateSession(id: string, patch: Partial<Session>): Promise<Session | null> {
  const idx = sessionsStore.findIndex((s) => s.id === id);
  if (idx === -1) return Promise.resolve(null);
  sessionsStore[idx] = { ...sessionsStore[idx], ...patch };
  return Promise.resolve(sessionsStore[idx]);
}

export async function deleteSession(id: string): Promise<boolean> {
  const idx = sessionsStore.findIndex((s) => s.id === id);
  if (idx === -1) return Promise.resolve(false);
  sessionsStore.splice(idx, 1);
  return Promise.resolve(true);
}
