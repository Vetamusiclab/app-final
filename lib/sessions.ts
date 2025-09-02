// lib/sessions.ts
import { Session } from '@/types/session';
import { v4 as uuidv4 } from 'uuid';

// demo initial data
const demoSessions: Session[] = [
  {
    id: 's1',
    teacherId: 't1',
    title: 'Индивидуальный урок — Вокал',
    start: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), // завтра
    end: new Date(Date.now() + 1000 * 60 * 60 * 25).toISOString(),
    status: 'free',
    createdAt: new Date().toISOString(),
  },
  {
    id: 's2',
    teacherId: 't1',
    title: 'Групповая репетиция',
    start: new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString(),
    end: new Date(Date.now() + 1000 * 60 * 60 * 50).toISOString(),
    status: 'booked',
    studentId: 'stu1',
    createdAt: new Date().toISOString(),
  },
];

// We mutate this array in memory — note: serverless instances won't persist across cold starts.
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
    id: uuidv4(),
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
