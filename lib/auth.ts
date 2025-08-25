'use client';
import type { Role, Session } from "@/types/auth";

function persist<T>(key: string, value: T){ localStorage.setItem(key, JSON.stringify(value)); }
function read<T>(key: string, fallback: T): T {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
}

export function login(role: Role, login: string, password: string): Session {
  const token = (typeof crypto !== 'undefined' && 'randomUUID' in crypto) ? crypto.randomUUID() : String(Date.now());
  const session: Session = { role, userId: login || 'demo', token };
  persist('session', session);
  return session;
}

export function getSession(): Session | null {
  if (typeof window === 'undefined') return null;
  return read<Session | null>('session', null);
}

export function logout(){ localStorage.removeItem('session'); }
