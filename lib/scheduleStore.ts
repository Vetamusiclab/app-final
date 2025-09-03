// lib/scheduleStore.ts
import { randomUUID } from 'crypto';
import type { Slot } from '@/types/schedule';

type Store = Map<string, Slot[]>;

// Простейшее in-memory хранилище (живёт в холодном старте лямбды; для демо ок)
const store: Store = new Map();

// Сидим демо-данные для "demo-teacher"
function ensureSeed(teacherId: string) {
  if (!store.has(teacherId)) {
    store.set(teacherId, [
      { id: randomUUID(), timeISO: '2025-09-03T10:00', booked: false },
      { id: randomUUID(), timeISO: '2025-09-03T11:00', booked: true },
      { id: randomUUID(), timeISO: '2025-09-03T13:00', booked: false },
      { id: randomUUID(), timeISO: '2025-09-04T09:00',  booked: false },
    ]);
  }
}

export function getSlots(teacherId: string): Slot[] {
  ensureSeed(teacherId);
  return store.get(teacherId) ?? [];
}

export function addSlot(teacherId: string, timeISO: string): Slot {
  ensureSeed(teacherId);
  const slot: Slot = { id: randomUUID(), timeISO, booked: false };
  const arr = store.get(teacherId)!;
  arr.push(slot);
  return slot;
}

export function setBooked(teacherId: string, id: string, booked: boolean): Slot | null {
  ensureSeed(teacherId);
  const arr = store.get(teacherId)!;
  const i = arr.findIndex(s => s.id === id);
  if (i === -1) return null;
  arr[i] = { ...arr[i], booked };
  return arr[i];
}

export function removeSlot(teacherId: string, id: string): boolean {
  ensureSeed(teacherId);
  const arr = store.get(teacherId)!;
  const lenBefore = arr.length;
  const next = arr.filter(s => s.id !== id);
  store.set(teacherId, next);
  return next.length !== lenBefore;
}
